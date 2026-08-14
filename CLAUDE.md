# Dra. Fabiana Golembiewski — Landing Page

Landing page de **Dra. Fabiana Golembiewski**, advogada especialista em **Direito da Saúde**, com foco em reverter negativas de planos de saúde para **cirurgias reparadoras pós-bariátrica**. Sede em Joinville/SC, atendimento para todo o Brasil. Domínio: `fabianagolk.com.br`.

## O que é este projeto

Página única (one-page) de conversão, com 8 seções. Todo CTA abre um **formulário de qualificação** (modal de 6 passos) e, ao terminar, leva a pessoa para o **WhatsApp** com as respostas já preenchidas na mensagem. Estrutura:

1. **Hero** — negativa de cirurgia / direito garantido
2. **Transformação** — 3 quadros clicáveis (abrem modal): Ecossistema de Saúde, Início da Mudança, Cirurgias Reparadoras
3. **Solução detalhada** (`#direitos`) — cirurgias reparadoras comuns
4. **Negativas** — desculpas dos planos e por que não se sustentam
5. **Método** (`#como-funciona`) — 4 passos
6. **Autoridade** — bio da Dra. (abre modal)
7. **Histórias Reais** (`#casos`) — carrossel de frases reais de pacientes
8. **FAQ** — dúvidas frequentes

## Stack

- **React 18** (aliasado para **Preact/compat** no build — bundle menor; ver `vite.config.js`)
- **Vite 4** como bundler
- **Tailwind CSS 3** — toda a estilização via utilitários (tokens em `tailwind.config.js`)
- **GSAP + ScrollTrigger** — animações de scroll (carregado dinamicamente em `App.jsx`)
- **@studio-freight/lenis** — smooth scroll
- **Deploy:** GitHub Pages via `gh-pages -d dist` (`npm run deploy`). Em produção o site roda na **hospedagem (FTP)**, porque o endpoint PHP de captura precisa de servidor — o Pages só serve estático.
- **Backend mínimo:** `public/api/lead.php` (mesma origem, sem CORS) grava o lead no MySQL da hospedagem e repassa pra automação da Kamino.

## Captura de lead (formulário → WhatsApp → planilha)

Fluxo, na ordem:

1. `src/constants/contact.js` → `LEAD_FORM_STEPS` define as perguntas (fonte da verdade). Hoje: plano de saúde, tipo de emagrecimento, peso anterior, peso atual, tempo no mesmo peso e **WhatsApp** (`telefone`, com máscara `(47) 99999-9999` — helpers `maskPhone`/`isValidPhone`/`phoneDigits` no mesmo arquivo).
2. `src/components/LeadFormModal.jsx` conduz os passos. Steps `choice` avançam no clique; `text` e `tel` avançam no botão/Enter (`tel` só libera com 10+ dígitos).
3. No último passo: `sendLeadToSheets()` (`src/constants/leadCapture.js`) dispara um POST fire-and-forget para `/api/lead.php` e o WhatsApp abre na sequência — **falha de rede nunca pode bloquear a abertura do wa.me**.
4. `public/api/lead.php` grava na tabela `leads` (MySQL da hospedagem) e repassa pro webhook `lead-capture-sheets` da Kamino, que escreve a linha na planilha Google. Repasse é best-effort: se a automação cair, o lead já está no banco (`synced_to_sheets = 0`).

- Schema: `database/schema.sql` (base) + `database/migrations/*.sql` (alterações em tabela que já tem dados em produção — rodar no phpMyAdmin).
- Credenciais reais ficam em `public/api/config.php`, **só no servidor** (fora do git; template em `config.example.php`). Nunca apagar esse arquivo ao subir um build novo por FTP.
- **Ao adicionar/renomear um campo do formulário**, três lugares precisam acompanhar: a coluna no MySQL (migration), o `INSERT` do `lead.php`, e o `field_labels` da flow instance no dashboard da Kamino (`automacoes-dash.agenciakamino.com.br`) — sem o rótulo, a automação cria uma coluna nova com o nome cru da key em vez de preencher a coluna existente.

### Quando "a planilha parou de receber lead"

O sintoma engana: **o site continua funcionando perfeitamente**. O formulário abre, o
lead é gravado no MySQL e o WhatsApp abre normal — o repasse pra automação é
best-effort e falha em silêncio. Em 07/08/2026 o engine das automações ficou 7 dias
fora do ar e ninguém percebeu por isso.

Diagnóstico, nessa ordem:

```bash
# 1. A automação está de pé?
curl -s https://automacoes.agenciakamino.com.br/health | head -c 200   # espera {"ok":true,...}
ssh vps-kamino "sudo docker service ls | grep automacoes"              # engine em 0/1 = é isso

# 2. Quantos leads ficaram presos? (phpMyAdmin, banco fabi9985_leads)
#    SELECT id, created_at, telefone, synced_to_sheets FROM leads WHERE synced_to_sheets = 0;
```

**Recuperar lead preso** (não gera linha duplicada — o flow deduplica por `token`):

```bash
curl -X POST https://automacoes.agenciakamino.com.br/webhook/fabi-lead-capture \
  -H 'Content-Type: application/json' \
  -d '{"auth":"<webhook_secret>","token":"<token do banco>","fields":{...},"page_url":"...","created_at":"<ISO UTC>"}'
```

Depois marcar `UPDATE leads SET synced_to_sheets = 1 WHERE id = <id>;`.

Desde 14/08/2026 existe um watchdog (systemd timer na vps-kamino, a cada 5 min) que
religa sozinho qualquer serviço caído — o cenário de 7 dias não deve mais se repetir.
Detalhes e postmortem: `docs/postmortem-engine-7-dias-2026-08-14.md` no repo
`kamino-automacoes`.

> Atenção ao fuso: o MySQL da hospedagem grava `created_at` em **horário de Brasília**;
> o Postgres da automação grava em **UTC**. Uma diferença de 3h entre os dois não é bug.

## Estrutura de arquivos

```
fabi-adv/
├── index.html                  # Template HTML + meta tags SEO/OG + preloads (hero, fontes)
├── src/
│   ├── main.jsx                # Entry point (monta o App, importa o CSS global)
│   ├── App.jsx                 # Página inteira (header, 8 seções, modais, footer)
│   ├── components/             # Componentes reutilizáveis
│   │   ├── Button.jsx          # Botão base
│   │   ├── WhatsAppButton.jsx  # CTA padrão (usa contact.js)
│   │   ├── FloatingWhatsApp.jsx# Botão flutuante fixo
│   │   ├── Icon.jsx            # Wrapper de ícones (lucide-style, inline SVG)
│   │   ├── MethodStep.jsx      # Passo do método (seção 5)
│   │   ├── ReviewCard.jsx      # Card de depoimento
│   │   ├── FAQItem.jsx         # Item de acordeão do FAQ
│   │   ├── Modal.jsx           # Modal genérico (bio + etapas da jornada)
│   │   └── LeadFormModal.jsx   # Formulário de qualificação (6 passos) antes do WhatsApp
│   ├── context/
│   │   └── LeadFormContext.jsx # Abre/fecha o formulário a partir de qualquer CTA
│   ├── constants/
│   │   ├── contact.js          # WHATSAPP_CONFIG, LEAD_FORM_STEPS, máscara de telefone
│   │   └── leadCapture.js      # POST fire-and-forget para /api/lead.php
│   ├── styles/
│   │   └── index.css           # CSS global + diretivas Tailwind
│   └── assets/                 # Imagens IMPORTADAS (hasheadas pelo Vite no build)
│       └── sobre-mim.{jpg,webp}# Foto da Dra. (importada em App.jsx)
├── public/                     # Estáticos servidos por URL fixa (NÃO passam pelo bundler)
│   ├── hero.{avif,webp,jpg}            # Hero desktop (referenciado por /hero.* no App)
│   ├── hero-mobile.{avif,webp,jpg}     # Hero mobile
│   ├── og-image.jpg                    # Open Graph
│   ├── favicon.ico / favicon-16/32.png / apple-touch-icon.png
│   ├── fonts/                          # Fontes self-hosted (Playfair Display, Inter) + preload no index.html
│   ├── api/
│   │   ├── lead.php                    # Endpoint de captura (MySQL + repasse pra automação)
│   │   └── config.example.php          # Template das credenciais (config.php real só no servidor)
│   ├── robots.txt / sitemap.xml / .htaccess / .nojekyll
├── database/
│   ├── schema.sql              # CREATE TABLE leads (rodar uma vez num banco novo)
│   └── migrations/             # ALTERs para o banco que já está em produção
├── tailwind.config.js          # Tokens de design (cores brand, fontes)
├── vite.config.js              # Vite + plugin-react + alias preact/compat
└── docs/                       # Briefings de conteúdo (.docx) — fora do git (.gitignore)
```

### Convenção de imagens (importante)

- **`src/assets/`** → imagens **importadas** no JSX (`import x from './assets/...'`). O Vite faz hash e otimiza. Usar para imagens cujo cache-busting importa (ex: `sobre-mim`).
- **`public/`** → imagens referenciadas por **URL absoluta** (`/hero.jpg`). Não passam pelo bundler, mantêm o nome. Usar para o que precisa de URL estável — caso do **hero**, que é pré-carregado (`<link rel="preload">`) no `index.html`.

Os dois padrões coexistem de propósito; não consolidar tudo num lugar só.

## Design / Tokens

Definidos em `tailwind.config.js` (`theme.extend`):

| Token | Hex | Uso |
|-------|-----|-----|
| `brand-light` | `#F7F4EF` | fundo claro |
| `brand-medium` | `#DDD0BB` | bordas suaves |
| `brand-muted` | `#6B6057` | texto secundário |
| `brand-dark` | `#1A2B3C` | navy — fundos escuros, texto forte |
| `brand-accent` | `#C9A052` | dourado — CTAs, destaques |
| `brand-amber` | `#A57626` | dourado mais escuro — itálicos de destaque |
| `brand-hover` | `#D8B262` | hover do accent |

- **Fontes:** `Playfair Display` (serif, títulos) + `Inter` (sans, corpo) — self-hosted em `public/fonts/`, com `<link rel="preload">` no `index.html`.
- Mobile-first, animações de entrada via GSAP ScrollTrigger.

> ⚠️ Nota: as regras globais de frontend desaconselham `Inter` como fonte padrão. Trocar por algo como Plus Jakarta Sans/DM Sans é um ajuste de design pendente (não estrutural) — só fazer com aval do cliente, pois muda a identidade já aprovada.

## Comandos

```bash
npm install      # instala dependências
npm run dev      # servidor de desenvolvimento (Vite + HMR)
npm run build    # build de produção em dist/
npm run preview  # serve o build localmente
npm run deploy   # build + publica em gh-pages (GitHub Pages)
```

## Contato / dados do cliente

- **WhatsApp:** `554789205601` (config em `src/constants/contact.js`)
- **Telefone:** (47) 8920-5601 · **E-mail:** fabiana.golk@hotmail.com
- **Instagram:** [@fabianagolembiewski](https://instagram.com/fabianagolembiewski) · [@fgadvocaciaintegrada](https://instagram.com/fgadvocaciaintegrada)
- **Endereço:** R. Dona Francisca, 1.113 - Sala 707, Saguaçu, Joinville - SC, 89221-006

## Notas

- `wordpress-backup/` é um snapshot do site WordPress antigo em produção — ignorado pelo git, mantido só para referência de migração.
- `docs/` guarda os briefings de conteúdo (`.docx`) — fora do git.
