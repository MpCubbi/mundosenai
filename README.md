# Front-end e UI/UX — Apresentação interativa

Site de apresentação com rolagem que demonstra, **ao vivo**, como um site ruim se transforma em uma ótima experiência a cada slide avançado.

Criado para apresentações sobre a importância do Front-end, UI/UX, responsividade e acessibilidade.

## ✨ Como funciona

O site é dividido em **estágios**. Conforme o usuário rola ou avança pelos slides, o design evolui progressivamente:

| Estágio | Nome | O que muda |
|---|---|---|
| 0 | Site original | Sem critérios de design |
| 1 | Cores | Paleta com contraste |
| 2 | Tipografia | Fontes, tamanhos e entrelinha |
| 3 | Layout | Espaçamento, grid e hierarquia |
| 4 | Responsividade | Adapta-se a qualquer tela |
| 5 | Acessibilidade | Foco, teclado e menos movimento |
| 6 | Polimento | Microinterações e acabamento |

## 🗂 Estrutura do projeto

```
├── app/
│   ├── page.tsx           # Página principal com todos os slides
│   ├── layout.tsx         # Layout raiz, fontes e metadados
│   ├── globals.css        # Reset e variáveis globais
│   ├── presentation.css   # Tokens de design por estágio
│   └── demos.css          # Estilos dos componentes de demo
├── components/
│   ├── presentation/      # Motor da apresentação (StageProvider, HUD, Slide…)
│   ├── slides/            # Cada grupo temático de slides
│   ├── demos/             # Componentes interativos usados nos slides
│   └── ui/                # Componentes de UI reutilizáveis (Button…)
├── lib/
│   ├── contrast.ts        # Cálculo de contraste WCAG
│   └── utils.ts           # Utilitários gerais
└── public/
    └── images/            # Imagens estáticas usadas nos slides
```

## 🚀 Como rodar localmente

**Pré-requisitos:** Node.js 18+ e pnpm.

```bash
# 1. Instalar dependências
pnpm install

# 2. Subir o servidor de desenvolvimento
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Outros comandos

```bash
pnpm build   # Gerar build de produção
pnpm start   # Subir o build de produção localmente
```

## 🛠 Tecnologias

- [Next.js 16](https://nextjs.org/) com App Router
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://base-ui.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vercel Analytics](https://vercel.com/analytics)

## 📄 Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
