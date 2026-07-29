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
];

export function buildLeadMessage(answers) {
  const lines = [
    WHATSAPP_CONFIG.defaultMessage,
    '',
    `Possui plano de saúde? ${answers.plano}`,
    `Como foi o emagrecimento? ${answers.emagrecimento}`,
    `Peso anterior: ${answers.pesoAnterior}`,
    `Peso atual: ${answers.pesoAtual}`,
    `Tempo com o mesmo peso: ${answers.tempoMesmoPeso}`,
  ];
  return lines.join('\n');
}
