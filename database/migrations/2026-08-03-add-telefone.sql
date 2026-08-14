-- Migration: adiciona o WhatsApp do lead (03/08/2026)
--
-- Contexto: o formulário passou a pedir o número no último passo. Até aqui o
-- número só chegava para a Dra. Fabiana (pelo próprio WhatsApp), e a planilha /
-- o banco ficavam sem ele — sem rastreio possível do lado da agência.
--
-- Rodar UMA VEZ no banco de produção (cPanel → phpMyAdmin).
-- A tabela `leads` já existe com dados; este script só acrescenta colunas,
-- não apaga nem altera linha nenhuma. As linhas antigas ficam com NULL.
--
-- ATENÇÃO ao banco: no cPanel dessa conta, `fabi9985` é só o GRUPO/prefixo, não
-- um banco. Os bancos reais são `fabi9985_leads` (é este) e `fabi9985_wp377`
-- (WordPress antigo). Selecione `fabi9985_leads` no painel esquerdo ANTES de
-- abrir a aba SQL — se rodar na aba SQL do servidor, sem banco selecionado, o
-- ALTER não sabe em qual `leads` mexer.
--
-- Se precisar do USE, a sintaxe é `USE fabi9985_leads;` — `USE DATABASE ...`
-- não existe no MySQL e devolve erro #1064.

ALTER TABLE leads
  ADD COLUMN telefone      VARCHAR(30) NULL AFTER tempo_mesmo_peso,
  ADD COLUMN telefone_e164 VARCHAR(20) NULL AFTER telefone,
  ADD INDEX idx_leads_telefone_e164 (telefone_e164);
