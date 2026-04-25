export const WHATSAPP_CONFIG = {
  phoneNumber: "5547999999999",
  defaultMessage: "Olá Dra. Fabiana! Gostaria de uma análise gratuita do meu caso sobre cirurgia reparadora.",
  link: function() {
    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.defaultMessage)}`;
  }
};
