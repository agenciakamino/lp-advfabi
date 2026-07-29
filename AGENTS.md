# Dra. Fabiana Golembiewski — Landing Page

Landing page de **Dra. Fabiana Golembiewski**, advogada especialista em **Direito da Saúde**, com foco em reverter negativas de planos de saúde para **cirurgias reparadoras pós-bariátrica**. Sede em Joinville/SC, atendimento para todo o Brasil. Domínio: `fabianagolk.com.br`.

## O que é este projeto

Página única (one-page) de conversão, com 8 seções, todas levando para contato via **WhatsApp** (não há formulário/backend). Estrutura:

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
- **Deploy:** GitHub Pages via `gh-pages -d dist` (`npm run deploy`)
- Sem backend — toda conversão é via link `wa.me` (`src/constants/contact.js`)

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
│   │   └── Modal.jsx           # Modal genérico (bio + etapas da jornada)
│   ├── constants/
│   │   └── contact.js          # WHATSAPP_CONFIG (telefone, mensagem padrão, link)
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
│   ├── robots.txt / sitemap.xml / .htaccess / .nojekyll
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
