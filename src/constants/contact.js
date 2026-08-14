export const WHATSAPP_CONFIG = {
  phoneNumber: "554789205601",
  defaultMessage: "Olá Dra. Fabiana! Gostaria de uma análise do meu caso sobre cirurgia reparadora.",
  link: function(message = this.defaultMessage) {
    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
  }
};

// Perguntas do filtro exibido antes de liberar o contato pelo WhatsApp
export const LEAD_FORM_STEPS = [
  {
    key: 'plano',
    question: 'Você possui plano de saúde?',
    type: 'choice',
    options: ['Sim', 'Não, seria pelo SUS'],
  },
  {
    key: 'emagrecimento',
    question: 'Como foi seu emagrecimento?',
    type: 'choice',
    options: ['Bariátrica', 'Canetas emagrecedoras', 'Natural, fiz dieta'],
  },
  {
    key: 'pesoAnterior',
    question: 'Qual seu peso anterior?',
    type: 'text',
    placeholder: 'Ex: 120kg',
  },
  {
    key: 'pesoAtual',
    question: 'Qual seu peso atual?',
    type: 'text',
    placeholder: 'Ex: 75kg',
  },
  {
    key: 'tempoMesmoPeso',
    question: 'Quanto tempo está com o mesmo peso?',
    type: 'text',
    placeholder: 'Ex: 8 meses',
  },
  {
    key: 'telefone',
    question: 'Qual seu WhatsApp?',
    type: 'tel',
    placeholder: '(47) 99999-9999',
    hint: 'Para a Dra. conseguir retomar o contato caso a conversa se perca.',
  },
];

// ── Telefone: máscara e validação (DDD + 8 ou 9 dígitos) ────────────────────

// Só os dígitos, no máximo 11 (DDD + celular de 9 dígitos)
export function phoneDigits(value) {
  return String(value ?? '').replace(/\D/g, '').slice(0, 11);
}

// Formata progressivamente enquanto a pessoa digita: (47) 99999-9999
export function maskPhone(value) {
  const d = phoneDigits(value);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

// Aceita fixo (10 dígitos) e celular (11) — não trava quem digita um fixo.
export function isValidPhone(value) {
  return phoneDigits(value).length >= 10;
}

export function buildLeadMessage(answers) {
  const lines = [
    WHATSAPP_CONFIG.defaultMessage,
    '',
    `Possui plano de saúde? ${answers.plano}`,
    `Como foi o emagrecimento? ${answers.emagrecimento}`,
    `Peso anterior: ${answers.pesoAnterior}`,
    `Peso atual: ${answers.pesoAtual}`,
    `Tempo com o mesmo peso: ${answers.tempoMesmoPeso}`,
    `Meu WhatsApp: ${answers.telefone}`,
  ];
  return lines.join('\n');
}
