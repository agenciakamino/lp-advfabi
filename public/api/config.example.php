<?php
// Copie este arquivo para "config.php" (mesma pasta) e preencha com os dados
// reais depois de subir pro HostGator. "config.php" NUNCA deve ir para o git
// (já está no .gitignore) — só existe direto no servidor.

if (!defined('LEAD_API_ENTRY')) {
    http_response_code(403);
    exit;
}

// --- Banco de dados (MySQL da hospedagem — crie o banco e o usuário no cPanel,
// depois rode database/schema.sql nele via phpMyAdmin) ---
define('DB_HOST', 'localhost');
define('DB_NAME', 'trocar_pelo_nome_do_banco');
define('DB_USER', 'trocar_pelo_usuario_do_banco');
define('DB_PASS', 'trocar_pela_senha_do_banco');

// --- Automação Kamino (repassa a mesma linha pra planilha) ---
// Valores já combinados com a automação — não precisa trocar, só manter.
define('AUTOMACOES_WEBHOOK_URL', 'https://automacoes.agenciakamino.com.br/webhook/fabi-lead-capture');
define('AUTOMACOES_WEBHOOK_SECRET', 'a2ae07b8b40847a09d27fdb85722e02e');
