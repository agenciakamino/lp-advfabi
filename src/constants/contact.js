export const WHATSAPP_CONFIG = {
  phoneNumber: "5547989205601",
  defaultMessage: "Olá! Vim pelo site e gostaria de atendimento com a equipe do FG Advocacia sobre Direito da Saúde.",
  link: function(message = this.defaultMessage) {
    return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
  }
};
