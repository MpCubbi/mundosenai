/** @type {import('next').NextConfig} */
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isUserOrOrgSite = repository?.endsWith('.github.io') ?? false
const basePath = isGitHubActions && repository && !isUserOrOrgSite ? `/${repository}` : ''

const nextConfig = {
  // Gera HTML, CSS e JS estáticos para hospedagem no GitHub Pages.
  output: 'export',
  trailingSlash: true,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    // O GitHub Pages não executa o otimizador de imagens do Next.js.
    unoptimized: true,
  },
}

export default nextConfig
