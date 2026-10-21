# Apresentação interativa — Front-end e UI/UX

Projeto feito com Next.js 16, React 19, TypeScript e pnpm. A versão para GitHub Pages é exportada como arquivos estáticos e mantém as interações executadas no navegador (React/JavaScript). Não são suportadas funcionalidades que exijam um servidor Next.js em tempo de execução, como rotas de API ou recursos dinâmicos exclusivos do servidor.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie todos os arquivos deste projeto para a branch `main` (ou `master`). Inclua a pasta oculta `.github`.
2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment → Source**, selecione **GitHub Actions**.
4. Abra a aba **Actions** e aguarde o workflow **Publicar no GitHub Pages** terminar com sucesso.
5. O GitHub exibirá o endereço público em **Settings → Pages**. Para um repositório comum, o endereço geralmente será `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

O workflow calcula automaticamente o caminho-base a partir do nome do repositório e publica a pasta `out/`. Para sites de usuário/organização com nome `usuario.github.io`, usa a raiz do domínio.

## Rodar localmente

Requer Node.js 22 e pnpm 12.3.4.

```bash
pnpm install
pnpm dev
```

Abra o endereço local informado pelo Next.js.

Para verificar a exportação estática localmente:

```bash
pnpm build
```

O resultado será criado em `out/`. Em execução local, o caminho-base fica vazio; no GitHub Actions, ele é definido automaticamente.

## Observações

- As interações que funcionam no cliente continuam usando React e JavaScript no site publicado.
- Imagens do `public/` são servidas como arquivos estáticos, sem o otimizador de imagens do Next.js.
- O GitHub Pages não executa código de servidor. Se o projeto futuramente depender de APIs, autenticação ou dados gerados no servidor, será necessário usar um serviço com suporte a runtime, como Vercel.
