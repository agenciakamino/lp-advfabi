# FG Advocacia | Direito da Saúde

Site institucional de Dra. Fabiana Golembiewski. Sede em Joinville/SC e atendimento em todo o Brasil. Domínio: `fabianagolk.com.br`.

## Posicionamento e conteúdo

Página única geral: **proteção jurídica para quem precisa de saúde e para quem cuida dela**. Sem páginas ou entradas de campanha separadas por público. A cirurgia reparadora é um dos serviços, e não o objetivo exclusivo do site.

Fontes do conteúdo: `Institucional.docx`, `Nosso Serviços.pdf` e card de referência fornecidos pela cliente. Os arquivos originais ficam em Downloads; caminhos e validações constam em `STATUS.json`. As páginas 4 e 5 do PDF são imagens e precisam de inspeção visual: a extração de texto não revela esses serviços.

- Pacientes: pessoas autistas, pacientes com câncer, pessoas obesas e ex-obesas, atletas, pessoas com fibromialgia, pacientes amputados e outras necessidades de saúde. Atendimento relacionado a planos de saúde e SUS.
- Prestadores: treinamento de equipes, conciliação e análise de glosas, descredenciamento, contratos e reajuste de tabelas de preços para clínicas, empresas e profissionais da saúde.
- O método do PDF tem cinco etapas. A redação no site abrange o escopo geral, com medidas judiciais e liminar apenas quando cabíveis, sem prometer decisões favoráveis.
- Não acrescentar serviços com base apenas na ata da reunião; o conteúdo enviado pela cliente é a referência.
- O aulão discutido na reunião não integra a implementação. Não há conteúdo ou fluxo de inscrição fornecido.

Estrutura da página em `src/App.jsx`:

1. Hero institucional com retrato existente e CTA.
2. Duas frentes de atuação (`#importancia`).
3. Serviços para pacientes (`#direitos`), com seis grupos expansíveis.
4. Assessoria para quem cuida da saúde, com cinco serviços.
5. Ecossistema da saúde (`#parceiros`), com apresentação da rede e CTA de indicação.
6. Método de cinco etapas (`#como-funciona`).
7. Apresentação da Dra. Fabiana (`#sobre`).
8. Compromisso institucional.
9. FAQ e contato, seguidos do rodapé.

`src/constants/content.js` concentra os serviços e as perguntas frequentes. Os depoimentos e modais da versão exclusivamente bariátrica não são renderizados. Componentes antigos podem existir no repositório sem uso.

## Stack e comandos

- React 18 com alias para Preact/compat no build (`vite.config.js`).
- Vite 4, Tailwind CSS 3 e GSAP/ScrollTrigger para a barra de progresso.
- `npm install`: dependências.
- `npm run dev -- --host 127.0.0.1`: prévia local.
- `npm run build`: gera `dist/`.
- `npm run preview`: serve o build.
- `npm run deploy`: publica via gh-pages. **Esse comando não atualiza a hospedagem de produção por FTP.**

## Identidade visual

Tokens em `tailwind.config.js`. Paleta fornecida pela cliente:

| Token | Cor | Uso |
| --- | --- | --- |
| `brand-light` | `#F5F2EC` | Off-white e fundos claros |
| `brand-wine` | `#6B1D2A` | CTAs e destaques em vinho |
| `brand-accent` | `#C8A46E` | Dourado, bordas e detalhes |
| `brand-dark` | `#1A355B` | Azul-marinho, títulos e fundos escuros |

`brand-medium`, `brand-muted` e `brand-hover` são tons auxiliares. `brand-amber` é um alias legado para vinho.

Fontes aprovadas: Playfair Display para títulos e Inter para corpo, self-hosted em `public/fonts/` com preload no `index.html`. Manter identidade existente, com a curva da foto inspirada no card da cliente. Não transformar o texto do anúncio de consentimento no título geral do site.

Layout responsivo, foco visível no teclado e respeito a `prefers-reduced-motion`. Nenhum texto voltado ao público deve usar travessão.

### Consistência de cores

- Off-white e azul-marinho são a base da página. Branco é apenas uma superfície neutra auxiliar.
- Vinho fica nos CTAs e pequenos destaques. Não usar grandes seções em vinho nem dar uma cor diferente a cada público.
- Dourado fica em detalhes, bordas e elementos sobre fundo escuro. Não usar dourado para texto pequeno em fundo claro.
- Reutilizar os tokens de `tailwind.config.js`, inclusive no CSS global. Não introduzir novos hexadecimais, gradientes multicoloridos ou tons diferentes por seção.
- Estados de hover preservam a cor do componente, variando discretamente a luminosidade ou o preenchimento. Os tons neutros auxiliares existentes ficam fixos.
- Antes de entregar alterações visuais, conferir consistência da paleta e contraste de texto, botões e seus estados.

### Navegador para validação

Usar o navegador embutido do Codex para navegar, inspecionar e validar visualmente o site. Reutilizar a aba existente quando disponível. Não abrir navegador separado nem acionar o MCP ou scripts externos do Playwright para essa validação. Não é necessário instalar Playwright para este projeto. Esta preferência não autoriza desinstalar ferramentas da máquina.

### Movimento e interação

- Foto do hero com acomodação de escala em 1,4 s, uma vez; CTA com entrada curta. O título permanece visível desde o início.
- Link secundário no hero leva à apresentação do escritório. Menu e botões respondem a hover e foco sem mudar a paleta.
- Cabeçalho e botões usam transições de 550 a 650 ms. O menu mobile abre e fecha em 600 ms e permanece montado durante a transição; fechado, usa `inert` e `aria-hidden`. As transições de cor e opacidade continuam suaves em movimento reduzido, por solicitação do gestor; deslocamentos decorativos permanecem desligados.
- Serviços usam `ServiceDetails.jsx`, com botão acessível, indicador de mais/menos e rótulo de recolhimento. O card aberto recebe destaque discreto. A expansão por grid permite animar abertura e fechamento.
- Método: conexão horizontal no desktop e vertical no mobile. Um IntersectionObserver aciona o destaque uma vez; nenhum texto depende da animação para aparecer.
- FAQ usa expansão por grid, sem altura máxima fixa, e seta rotativa. Manter a operação por teclado e `aria-expanded`.
- WhatsApp flutuante tem apenas dois pulsos iniciais e tooltip em hover/foco. Não voltar a mensagens aleatórias ou movimento infinito.
- Respeitar `prefers-reduced-motion` nos efeitos decorativos: zoom, pulsos e movimentos de entrada ficam desligados. Por solicitação do gestor, serviços e FAQ preservam transição de altura de 480 ms e opacidade de 400 ms também nesse modo. As exceções são locais aos painéis e às interações de cabeçalho e botões; não alterar a configuração da máquina nem liberar efeitos decorativos globalmente.

### Imagens

- `src/assets/`: imagens importadas no JSX e hasheadas pelo Vite, como a foto da bio e a marca FG.
- `public/`: imagens por URL estável, incluindo hero desktop/mobile, OG e favicons. O preload do hero no `index.html` deve acompanhar o `<picture>`.
- Preservar retratos reais existentes. O card enviado é uma referência de composição e cores.

## WhatsApp e rastreamento

Todo CTA abre o WhatsApp diretamente. **Não há formulário, captura de lead, POST ou integração de planilha no frontend.**

- Fonte da verdade: `src/constants/contact.js`, `WHATSAPP_CONFIG`.
- WhatsApp e telefone do PDF: `5547989205601`, (47) 98920-5601. O número anterior no código não tinha o nono dígito.
- Mensagem geral inclui "Vim pelo site" e atendimento em Direito da Saúde. Não restringir a mensagem a cirurgia reparadora.
- O CTA do ecossistema usa mensagem própria para pedir indicação de profissional parceiro.
- `WhatsAppButton` e `FloatingWhatsApp` usam `window.open` com `noopener,noreferrer`.
- GTM: `GTM-W2ZR8KLC`. O gatilho externo de conversão usa `type="button"` como indicador de lead. **Somente CTAs de WhatsApp devem ter esse atributo.** Menu, FAQ e botões de expansão dos serviços não devem receber `type="button"`.
- Não reintroduzir formulário ou qualificação sem pedido do gestor.

## Hospedagem e backend legado

Produção usa hospedagem com FTP/cPanel. Subir `index.html` e os assets do mesmo build juntos, pois um HTML apontando para hashes ausentes derruba o site. Verificar a página pública e as respostas dos bundles após publicar. Não afirmar que uma alteração local está em produção.

`public/api/lead.php`, `public/api/config.example.php`, `database/schema.sql` e `database/migrations/` pertencem ao fluxo antigo e continuam intactos. O frontend não os chama. Não excluir nem reativar essa infraestrutura como parte de alterações na página.

- `public/api/config.php` contém credenciais reais apenas no servidor, fora do git. Nunca apagar ou sobrescrever esse arquivo no deploy.
- O fluxo legado gravava MySQL e repassava para a automação da Kamino, que escrevia na planilha. Falha no repasse não bloqueava o WhatsApp.
- Os registros antigos não sincronizados usam `synced_to_sheets = 0`. A automação deduplicava por `token`.
- MySQL da hospedagem registra horário de Brasília; Postgres da automação usa UTC.
- Mudanças em banco exigem a validação, banco de teste e backup definidos nas regras globais. Não executar escrita ou migration durante ajustes de conteúdo do site.
- Diagnóstico histórico detalhado permanece na memória do Claude, nos tópicos de captura de lead e deploy FTP, e no postmortem do repositório `kamino-automacoes`.

## Dados do escritório

- Dra. Fabiana Golembiewski, OAB/SC 67.289.
- E-mail: `fabiana.golk@hotmail.com`.
- Instagram: `@fabianagolembiewski` e `@fgadvocaciaintegrada`.
- Edifício Empresarial Everest, R. Dona Francisca, 1.113, sala 707, Saguaçu, Joinville/SC, CEP 89221-006.

## Continuidade

Leia `STATUS.json` e o índice de memória do Claude antes de retomar uma mudança em andamento. Confirme o estado real do código e da hospedagem antes de agir. A memória externa pode ainda descrever o site anterior ou a espera pelos materiais.

`docs/` armazena briefings locais fora do git; `wordpress-backup/` é referência histórica ignorada pelo git. Não editar `AGENTS.md`: ele apenas aponta para este documento.
