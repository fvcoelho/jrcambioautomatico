import { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'

export const metadata: Metadata = {
  title: 'Portfólio - Trabalhos Realizados | JR Câmbio Automático',
  description: 'Veja nosso portfólio de manutenção e reparo de câmbio automático. Trabalhos realizados em diversas marcas com padrão técnico.',
  keywords: 'portfolio cambio automatico, oficina cambio automatico, manutencao cambio automatico, reparos cambio, consertos transmissao',
  openGraph: {
    title: 'Portfólio | JR Câmbio Automático',
    description: 'Explore nosso portfólio de trabalhos realizados em câmbios automáticos de diversas marcas.',
    type: 'website',
  },
}

export default function PortfolioPage() {
  return <PortfolioClient />
}
