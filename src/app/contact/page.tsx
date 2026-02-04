import QuoteForm from '@/components/QuoteForm'
import MapSection from '@/components/MapSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato JR Câmbio Automático - Agende seu Diagnóstico Gratuito',
  description: 'Entre em contato com a JR Câmbio Automático para agendar um diagnóstico gratuito. Ligue (11) 94014-7157 ou preencha nosso formulário. Resposta rápida e atendimento especializado.',
  keywords: 'contato jr cambio, diagnostico gratuito, orcamento cambio automatico, agendar reparo cambio, whatsapp cambio',
  openGraph: {
    title: 'Contato JR Câmbio Automático - Diagnóstico Gratuito',
    description: 'Agende seu diagnóstico gratuito hoje mesmo. Atendimento especializado e peças originais.',
    type: 'website',
  },
}

const contactInfo = [
  {
    type: 'WhatsApp',
    value: '(11) 94014-7157',
    description: 'Atendimento rápido via WhatsApp',
    icon: '📱',
    href: 'https://wa.me/5511940147157?text=Olá! Gostaria de agendar um diagnóstico para meu câmbio automático.'
  },
  {
    type: 'E-mail',
    value: 'contato@jrcambioautomatico.com.br',
    description: 'Envie suas dúvidas a qualquer momento',
    icon: '✉️',
    href: 'mailto:contato@jrcambioautomatico.com.br'
  },
  {
    type: 'Endereço',
    value: 'Av. Eliseu de Almeida, 325\nInstituto de Previdência\nSão Paulo - SP, 05533-000',
    description: 'Atendemos toda RMSP',
    icon: '📍',
    href: 'https://www.google.com/maps/search/?api=1&query=Av.+Eliseu+de+Almeida,+325+-+Instituto+de+Previdencia,+Sao+Paulo+-+SP,+05533-000'
  },
  {
    type: 'Horário',
    value: 'Seg-Sex: 8h às 18h\nSáb: 9h às 14h\nDom: Fechado',
    description: 'Horário de funcionamento',
    icon: '🕒',
    href: null
  }
]

const serviceAreas = [
  'Centro', 'Zona Norte', 'Zona Leste', 'Zona Oeste',
  'Zona Sul', 'ABC Paulista', 'Guarulhos', 'Osasco',
  'Taboão da Serra', 'Barueri', 'Cotia', 'Santana de Parnaíba'
]

export default function ContactPage() {
  return (
    <div className="py-12 bg-steel-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Agende seu Diagnóstico Gratuito
          </h1>
          <p className="text-xl text-steel-300 max-w-3xl mx-auto">
            Problemas com seu câmbio automático? Entre em contato hoje mesmo para um diagnóstico
            gratuito e sem compromisso. Nossa equipe especializada está pronta para ajudar.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Quote Form */}
          <div className="lg:col-span-2">
            <div className="bg-steel-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Solicitar Atendimento</h2>
              <QuoteForm />
            </div>
          </div>

          {/* Contact Information & Sidebar */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <div className="bg-steel-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-white mb-6">Informações de Contato</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-2xl">{info.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{info.type}</h4>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.type === 'WhatsApp' ? '_blank' : undefined}
                          rel={info.type === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                          className="text-accent-400 hover:text-steel-200 transition-colors whitespace-pre-line"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-steel-300 whitespace-pre-line">{info.value}</p>
                      )}
                      <p className="text-sm text-steel-400 mt-1">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Service */}
            <div className="bg-accent-900/30 border border-accent-700 rounded-lg p-6">
              <h3 className="text-lg font-bold text-accent-300 mb-3">🔧 Diagnóstico Gratuito</h3>
              <p className="text-accent-400 mb-4">
                Traga seu veículo para uma avaliação completa sem custo. Identificamos o problema
                com precisão usando equipamentos de última geração.
              </p>
              <a
                href="https://wa.me/5511940147157?text=Olá! Gostaria de agendar um diagnóstico gratuito."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent-700 transition-colors inline-block"
              >
                Agendar Diagnóstico
              </a>
            </div>

            {/* Service Areas */}
            <div className="bg-steel-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Áreas de Atendimento</h3>
              <p className="text-steel-300 mb-4">Atendemos toda a grande São Paulo:</p>
              <div className="grid grid-cols-2 gap-2">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="text-sm text-steel-300 flex items-center">
                    <span className="text-accent-500 mr-2">✓</span>
                    {area}
                  </div>
                ))}
              </div>
              <p className="text-sm text-steel-400 mt-4">
                Não encontrou sua região? Entre em contato - podemos ajudar!
              </p>
            </div>

            {/* Guarantee */}
            <div className="bg-steel-700/50 border border-steel-600 rounded-lg p-6">
              <h3 className="text-lg font-bold text-steel-200 mb-3">🛡️ Garantia de 6 Meses</h3>
              <p className="text-steel-300 mb-4">
                Todos os nossos serviços incluem garantia de 6 meses em peças e mão de obra.
              </p>
              <ul className="text-sm text-accent-400 space-y-1">
                <li>• Peças originais e de qualidade</li>
                <li>• Mão de obra especializada</li>
                <li>• Suporte pós-serviço</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us for Contact */}
        <div className="mt-16 bg-steel-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Por Que Escolher a JR Câmbio Automático
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-3">Resposta Rápida</h3>
              <p className="text-steel-300">
                Respondemos a todas as consultas em até 24 horas e agendamos seu diagnóstico com agilidade.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold text-white mb-3">Diagnóstico Preciso</h3>
              <p className="text-steel-300">
                Equipamentos de última geração para identificar o problema com precisão antes de qualquer reparo.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-white mb-3">Garantia Total</h3>
              <p className="text-steel-300">
                6 meses de garantia em todos os serviços, peças originais e satisfação garantida.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <MapSection />
    </div>
  )
}
