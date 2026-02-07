import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Serviços de Câmbio Automático | Manutenção, Reparo e Retífica | JR Câmbio',
  description: 'Oficina de câmbio automático em São Paulo: manutenção de câmbio automático, diagnóstico técnico, conserto, retífica e troca de ATF. 15+ anos de experiência.',
  keywords: 'oficina de cambio automatico, manutencao de cambio automatico, conserto cambio, retifica cambio, troca oleo atf, diagnostico cambio, reparo transmissao',
  openGraph: {
    title: 'Serviços de Câmbio Automático | JR Câmbio Automático',
    description: 'Avaliação técnica, reparo especializado e manutenção de câmbios automáticos de todas as marcas.',
    type: 'website',
  },
}

const services = [
  {
    id: 'diagnostico',
    title: 'Diagnóstico Computadorizado',
    description: 'Avaliação técnica com leitura eletrônica e testes de funcionamento para identificar falhas com precisão.',
    features: ['Scanner Automotivo Profissional', 'Teste de Pressão Hidráulica', 'Análise de Fluido de Transmissão', 'Relatório Detalhado'],
    price: 'Sob avaliação',
    gradient: 'from-blue-400 to-blue-600',
    popular: true
  },
  {
    id: 'conserto',
    title: 'Conserto de Câmbio',
    description: 'Reparos especializados em câmbios automáticos de diversas marcas e modelos. Correções para patinação, trancos e falhas de engate.',
    features: ['Peças de Procedência', 'Garantia de 6 Meses', 'Diversas Marcas e Modelos', 'Mão de Obra Especializada'],
    price: 'Sob consulta',
    gradient: 'from-steel-400 to-steel-600',
    popular: true
  },
  {
    id: 'retifica',
    title: 'Retífica Completa',
    description: 'Reconstrução total do câmbio automático com padrão técnico. Indicada para transmissões com desgaste avançado.',
    features: ['Desmontagem e Inspeção Completa', 'Troca de Todos os Componentes Desgastados', 'Teste de Bancada', 'Garantia Estendida'],
    price: 'Sob consulta',
    gradient: 'from-accent-400 to-accent-600',
    popular: true
  },
  {
    id: 'troca-oleo',
    title: 'Troca de Óleo ATF',
    description: 'Substituição do fluido ATF com especificação correta para preservar desempenho e durabilidade.',
    features: ['Óleo ATF Original ou Equivalente', 'Filtro de Transmissão Novo', 'Limpeza do Sistema', 'Performance Otimizada'],
    price: 'A partir de R$ 350',
    gradient: 'from-steel-500 to-steel-700',
    popular: false
  },
  {
    id: 'revisao',
    title: 'Revisão de Câmbio',
    description: 'Manutenção preventiva para estender a vida útil da transmissão automática e evitar falhas.',
    features: ['Inspeção Visual Completa', 'Verificação de Vazamentos', 'Ajustes Necessários', 'Teste de Funcionamento'],
    price: 'A partir de R$ 200',
    gradient: 'from-steel-300 to-steel-500',
    popular: false
  },
  {
    id: 'manutencao',
    title: 'Manutenção Preventiva',
    description: 'Inspeções periódicas para identificar e prevenir problemas antes que se tornem críticos.',
    features: ['Checklist Completo', 'Identificação de Desgastes', 'Prevenção de Problemas', 'Orientação ao Cliente'],
    price: 'Sob consulta',
    gradient: 'from-neutral-400 to-neutral-600',
    popular: false
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-steel-950 via-charcoal-900 to-steel-950">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-charcoal-950 via-steel-900 to-charcoal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-cinzel text-5xl md:text-6xl lg:text-7xl mb-6 tracking-wider font-light">
            <span className="text-gradient-accent">
              Nossos Serviços
            </span>
          </h1>
          <p className="font-montserrat text-xl md:text-2xl mb-8 font-light tracking-wide text-white/90 max-w-4xl mx-auto">
            Serviços especializados em câmbio automático com mais de 15 anos de experiência.
            Avaliação técnica, peças de procedência e garantia de 6 meses.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <div key={service.id} className="bg-steel-800 rounded-2xl shadow-xl overflow-hidden relative group hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              {service.popular && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                  Destaque
                </div>
              )}

              {/* Gradient Header */}
              <div className={`h-24 bg-gradient-to-r ${service.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="p-8 -mt-6 relative">
                <div className="bg-steel-800 rounded-2xl p-6 shadow-lg mb-6">
                  <div className="mb-4">
                    <h3 className="font-cinzel text-3xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-accent-400 font-bold text-xl">{service.price}</p>
                  </div>
                </div>

                <p className="font-montserrat text-steel-300 mb-8 leading-relaxed">{service.description}</p>

                <div className="mb-8">
                  <h4 className="font-cinzel text-lg font-bold text-white mb-4">O que entregamos:</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-steel-300 font-montserrat">
                        <div className="w-2 h-2 bg-accent-500 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`https://wa.me/5511971829629?text=${encodeURIComponent(`Olá! Gostaria de agendar o serviço: ${service.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex-1 text-center font-montserrat shadow-lg group-hover:shadow-xl flex items-center justify-center gap-3"
                    title="Iniciar conversa no WhatsApp"
                  >
                    <svg
                      className="w-6 h-6 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Agendar Serviço
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
