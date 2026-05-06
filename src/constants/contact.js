export const WHATSAPP_CONFIG = {
  phoneNumber: "554789205601",
  defaultMessage: "Olá Dra. Fabiana! Gostaria de uma análise do meu caso sobre cirurgia reparadora.",
  link: function() {
    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.defaultMessage)}`;
  }
};
