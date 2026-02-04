import { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'

export const metadata: Metadata = {
  title: 'Portfólio - Trabalhos Realizados | JR Câmbio Automático',
  description: 'Veja nosso portfólio de câmbios automáticos reparados. Trabalhos realizados em diversas marcas e modelos com garantia de qualidade.',
  keywords: 'portfolio cambio automatico, trabalhos realizados, reparos cambio, consertos transmissao, antes e depois cambio',
  openGraph: {
    title: 'Portfólio | JR Câmbio Automático',
    description: 'Explore nosso portfólio de trabalhos realizados em câmbios automáticos de todas as marcas.',
    type: 'website',
  },
}

export default function PortfolioPage() {
  return <PortfolioClient />
}