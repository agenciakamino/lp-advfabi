<?php
/**
 * Recebe o envio final do formulário de qualificação do site (o clique que
 * abre o WhatsApp), grava o lead no MySQL da hospedagem e repassa a mesma
 * informação para a automação da Kamino, que grava numa planilha Google.
 *
 * Mesma origem do site (endpoint relativo /api/lead.php) — sem CORS, sem
 * segredo nenhum exposto no JS do navegador.
 *
 * Se a automação da Kamino estiver fora do ar, o lead já está salvo aqui —
 * nada se perde. O repasse é best-effort (timeout curto, erro nunca derruba
 * a resposta pro navegador).
 */

declare(strict_types=1);

define('LEAD_API_ENTRY', true);

header('Content-Type: application/json; charset=utf-8');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    error_log('[lead.php] config.php ausente — copie config.example.php e preencha os dados reais');
    respond(500, ['ok' => false, 'error' => 'server_not_configured']);
}
require $configFile;

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);

if (!is_array($payload) || !isset($payload['fields']) || !is_array($payload['fields']) || count($payload['fields']) === 0) {
    respond(400, ['ok' => false, 'error' => 'invalid_payload']);
}

$fields = $payload['fields'];
$token = isset($payload['token']) && is_string($payload['token']) && $payload['token'] !== ''
    ? $payload['token']
    : bin2hex(random_bytes(16));

$str = static function ($value): ?string {
    if ($value === null) return null;
    if (is_array($value)) return null;
    $s = (string) $value;
    return $s === '' ? null : mb_substr($s, 0, 500);
};

$plano = $str($fields['plano'] ?? null);
$emagrecimento = $str($fields['emagrecimento'] ?? null);
$pesoAnterior = $str($fields['pesoAnterior'] ?? null);
$pesoAtual = $str($fields['pesoAtual'] ?? null);
$tempoMesmoPeso = $str($fields['tempoMesmoPeso'] ?? null);

$utmSource = $str($payload['utm_source'] ?? null);
$utmMedium = $str($payload['utm_medium'] ?? null);
$utmCampaign = $str($payload['utm_campaign'] ?? null);
$pageUrl = isset($payload['page_url']) && is_string($payload['page_url']) ? mb_substr($payload['page_url'], 0, 2000) : null;

$ipAddress = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? null;
if (is_string($ipAddress)) {
    $ipAddress = trim(explode(',', $ipAddress)[0]);
}

try {
    $pdo = new PDO(
        'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
} catch (PDOException $e) {
    error_log('[lead.php] falha ao conectar no banco: ' . $e->getMessage());
    respond(500, ['ok' => false, 'error' => 'db_connection_failed']);
}

try {
    $stmt = $pdo->prepare(
        'INSERT INTO leads
            (token, plano, emagrecimento, peso_anterior, peso_atual, tempo_mesmo_peso,
             utm_source, utm_medium, utm_campaign, page_url, raw_payload, ip_address)
         VALUES
            (:token, :plano, :emagrecimento, :peso_anterior, :peso_atual, :tempo_mesmo_peso,
             :utm_source, :utm_medium, :utm_campaign, :page_url, :raw_payload, :ip_address)'
    );
    $stmt->execute([
        ':token' => $token,
        ':plano' => $plano,
        ':emagrecimento' => $emagrecimento,
        ':peso_anterior' => $pesoAnterior,
        ':peso_atual' => $pesoAtual,
        ':tempo_mesmo_peso' => $tempoMesmoPeso,
        ':utm_source' => $utmSource,
        ':utm_medium' => $utmMedium,
        ':utm_campaign' => $utmCampaign,
        ':page_url' => $pageUrl,
        ':raw_payload' => json_encode($fields, JSON_UNESCAPED_UNICODE),
        ':ip_address' => $ipAddress,
    ]);
} catch (PDOException $e) {
    // Token duplicado (retry de rede / duplo clique) — já está salvo, não é erro.
    if ($e->getCode() === '23000') {
        respond(200, ['ok' => true, 'duplicate' => true]);
    }
    error_log('[lead.php] falha ao gravar lead: ' . $e->getMessage());
    respond(500, ['ok' => false, 'error' => 'db_insert_failed']);
}

// ── Repasse best-effort pra automação da Kamino (planilha) ──────────────────
$forwardPayload = [
    'auth' => AUTOMACOES_WEBHOOK_SECRET,
    'token' => $token,
    'fields' => $fields,
    'page_url' => $pageUrl,
    'created_at' => gmdate('c'),
];
if ($utmSource !== null) $forwardPayload['utm_source'] = $utmSource;
if ($utmMedium !== null) $forwardPayload['utm_medium'] = $utmMedium;
if ($utmCampaign !== null) $forwardPayload['utm_campaign'] = $utmCampaign;

$ch = curl_init(AUTOMACOES_WEBHOOK_URL);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($forwardPayload, JSON_UNESCAPED_UNICODE),
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_CONNECTTIMEOUT => 3,
    CURLOPT_TIMEOUT => 5,
    CURLOPT_RETURNTRANSFER => true,
]);
$forwardResult = curl_exec($ch);
$forwardStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$forwardError = curl_error($ch);
curl_close($ch);

if ($forwardResult !== false && $forwardStatus >= 200 && $forwardStatus < 300) {
    $update = $pdo->prepare('UPDATE leads SET synced_to_sheets = 1 WHERE token = :token');
    $update->execute([':token' => $token]);
} else {
    error_log("[lead.php] repasse pra automação falhou (token=$token, status=$forwardStatus): $forwardError");
}

respond(200, ['ok' => true]);
