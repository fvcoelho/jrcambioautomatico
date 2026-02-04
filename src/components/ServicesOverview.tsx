'use client'

import Link from 'next/link'

const services = [
  {
    title: 'Diagnóstico Computadorizado',
    description: 'Identificamos o problema com precisão usando equipamentos de última geração para análise completa do câmbio.',
    href: '/services/diagnostico',
    gradient: 'from-zinc-300 to-zinc-500',
    featured: true
  },
  {
    title: 'Conserto de Câmbio',
    description: 'Reparos especializados com peças originais e garantia. Solucionamos todos os tipos de problemas.',
    href: '/services/conserto',
    gradient: 'from-steel-400 to-steel-600',
    featured: true
  },
  {
    title: 'Retífica Completa',
    description: 'Reconstrução total do câmbio automático com qualidade de fábrica e garantia estendida.',
    href: '/services/retifica',
    gradient: 'from-accent-400 to-accent-600',
    featured: false
  },
  {
    title: 'Troca de Óleo ATF',
    description: 'Substituição de fluido de transmissão para melhor performance e maior vida útil do câmbio.',
    href: '/services/troca-oleo',
    gradient: 'from-slate-400 to-slate-600',
    featured: false
  },
  {
    title: 'Revisão de Câmbio',
    description: 'Manutenção preventiva completa para estender a vida útil da transmissão automática.',
    href: '/services/revisao',
    gradient: 'from-steel-300 to-steel-500',
    featured: false
  },
  {
    title: 'Manutenção Preventiva',
    description: 'Inspeções periódicas para identificar e prevenir problemas antes que se tornem graves.',
    href: '/services/manutencao',
    gradient: 'from-neutral-400 to-neutral-600',
    featured: false
  }
]

export default function ServicesOverview() {

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with metal texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-steel-950 to-charcoal-900 metal-grain"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-accent-400 font-semibold text-sm uppercase tracking-wider bg-accent-400/10 px-4 py-2 rounded-full">
              Nossos Serviços
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Soluções Completas em
            <span className="block text-gradient-accent mt-2">Câmbio Automático</span>
          </h2>
          <p className="text-xl text-steel-300 max-w-3xl mx-auto leading-relaxed">
            Do diagnóstico à retífica completa, oferecemos expertise especializada
            para manter seu câmbio automático funcionando perfeitamente.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg ${
                service.featured ? 'md:col-span-1 lg:col-span-1' : ''
              }`}
            >
              {/* Glass morphism background */}
              <div className="glass-enhanced h-full p-8 relative">
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient}`}></div>
                
                {/* Featured badge */}
                {service.featured && (
                  <div className="mb-6">
                    <span className="bg-gradient-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                      DESTAQUE
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-steel-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <Link 
                  href={service.href}
                  className="inline-flex items-center text-accent-400 font-semibold hover:text-accent-300 transition-colors duration-300"
                >
                  Saiba Mais
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        {/* <div className="text-center mt-16">
          <div className="glass-enhanced inline-block p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-wood-900 mb-4">
              Precisa de uma Solução Personalizada?
            </h3>
            <p className="text-wood-700 mb-6 max-w-md">
              Nossa equipe especializada está pronta para criar a solução perfeita para seu projeto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/services"
                className="bg-gradient-wood text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-elegant"
              >
                Ver Todos os Serviços
              </Link>
              <Link 
                href="/contact"
                className="glass-enhanced text-wood-900 px-8 py-3 rounded-xl font-semibold hover:bg-white/50 transition-all duration-300 border-2 border-wood-200"
              >
                Solicitar Orçamento
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
}