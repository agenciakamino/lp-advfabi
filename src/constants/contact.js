export const WHATSAPP_CONFIG = {
  phoneNumber: "554789205601",
  defaultMessage: "Olá! Vim pelo site e gostaria de uma análise do meu caso sobre cirurgia reparadora.",
  link: function(message = this.defaultMessage) {
    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
  }
};
