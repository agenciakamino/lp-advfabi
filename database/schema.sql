-- Schema do banco de leads do site da Dra. Fabiana Golembiewski
-- Rodar UMA VEZ no MySQL/MariaDB da hospedagem (HostGator → cPanel → phpMyAdmin,
-- aba "SQL", cola e executa. Ou via linha de comando: mysql -u USUARIO -p NOME_DO_BANCO < schema.sql)
--
-- Guarda uma linha por envio do formulário de qualificação (o mesmo clique que
-- abre o WhatsApp). `raw_payload` guarda as respostas inteiras em JSON — assim,
-- se as perguntas do formulário mudarem no futuro, nada se perde mesmo sem
-- alterar esta tabela.

CREATE TABLE IF NOT EXISTS leads (
  id                BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  token             CHAR(36)     NOT NULL,
  created_at        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  -- Respostas do formulário (ver src/constants/contact.js → LEAD_FORM_STEPS).
  -- Ficam NULL de propósito se o formulário mudar de perguntas no futuro.
  plano             VARCHAR(255) NULL,
  emagrecimento     VARCHAR(255) NULL,
  peso_anterior     VARCHAR(50)  NULL,
  peso_atual        VARCHAR(50)  NULL,
  tempo_mesmo_peso  VARCHAR(100) NULL,

  -- Atribuição / origem do envio
  utm_source        VARCHAR(255) NULL,
  utm_medium        VARCHAR(255) NULL,
  utm_campaign      VARCHAR(255) NULL,
  page_url          TEXT         NULL,

  -- Payload completo enviado pelo formulário (JSON como texto — LONGTEXT em vez
  -- do tipo JSON nativo para funcionar em qualquer versão de MySQL/MariaDB da
  -- hospedagem, mesmo planos mais antigos).
  raw_payload       LONGTEXT     NULL,

  -- Confirma se essa linha já foi repassada com sucesso pra automação da Kamino
  -- (planilha). Fica 0 se o repasse falhar (ex: automação fora do ar) — o lead
  -- já está salvo aqui de qualquer forma, nada se perde.
  synced_to_sheets  TINYINT(1)   NOT NULL DEFAULT 0,
  ip_address        VARCHAR(45)  NULL,

  UNIQUE KEY uq_leads_token (token),
  INDEX idx_leads_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
