# Fabi Adv - Landing Page Profissional

Landing Page desenvolvida para a Dra. Fabiana Golembiewski, especialista em Direito da Saúde. O projeto utiliza uma stack moderna focada em performance, SEO e facilidade de manutenção.

## 🚀 Tecnologias

- **React 18** - UI reativa e modularizada.
- **Vite** - Bundler de próxima geração para build ultra-rápido.
- **Tailwind CSS** - Estilização baseada em utilitários para design consistente.
- **PostCSS** - Processamento de CSS moderno (Autoprefixer, etc).

## 📂 Estrutura de Pastas

```text
├── src/
│   ├── components/     # Componentes React reutilizáveis
│   ├── styles/         # Estilos globais e Tailwind
│   ├── App.jsx         # Componente principal (página única)
│   └── main.jsx        # Ponto de entrada
├── public/             # Ativos estáticos (fotos, ícones)
├── index.html          # Template HTML com meta tags SEO
└── tailwind.config.js  # Configuração de tokens de design (cores, fontes)
```

## 🛠️ Comandos

### Desenvolvimento
```bash
npm install     # Instala dependências
npm run dev     # Inicia servidor local (HMR)
```

### Produção
```bash
npm run build   # Gera arquivos minificados em /dist
npm run preview # Visualiza o build de produção localmente
```

## ⚖️ Design System

As cores e fontes foram padronizadas no arquivo `tailwind.config.js`:
- **Fontes:** `Playfair Display` (Serif) para títulos e `Inter` (Sans) para corpo.
- **Paleta:** Foco em tons sóbrios (`#2C2826`) e o tom de destaque (`#B98B73`) para CTAs.

## 📈 SEO & Acessibilidade

- Meta tags OpenGraph configuradas para redes sociais.
- Estrutura semântica HTML5 (`header`, `main`, `section`, `footer`).
- Imagens com textos alternativos (`alt`).
- Design responsivo para todos os dispositivos.

---
Desenvolvido com foco em alta conversão e profissionalismo jurídico.