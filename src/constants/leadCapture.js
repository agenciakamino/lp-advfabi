// Captura de leads (best-effort): manda as respostas do formulário pro endpoint
// PHP hospedado junto com o site (public/api/lead.php → mesma origem, sem CORS
// e sem segredo exposto no bundle). Esse endpoint grava no MySQL da hospedagem
// e repassa pra automação da Kamino, que grava a linha numa planilha Google.
// NUNCA pode atrasar ou quebrar a abertura do WhatsApp — o disparo é
// fire-and-forget e qualquer erro (rede, endpoint fora do ar) é ignorado.

const LEAD_CAPTURE_ENDPOINT = "/api/lead.php";

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'];

function buildLeadCapturePayload(answers) {
  const params = new URLSearchParams(window.location.search);

  const payload = {
    token: crypto.randomUUID(),
    fields: { ...answers },
    page_url: window.location.href,
    created_at: new Date().toISOString(),
  };

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) payload[key] = value;
  });

  return payload;
}

export function sendLeadToSheets(answers) {
  try {
    fetch(LEAD_CAPTURE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildLeadCapturePayload(answers)),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignora qualquer falha síncrona (ex: fetch indisponível)
  }
}
