'use client'

const features = [
  {
    title: '15+ Anos de Experiência',
    description: 'Décadas de expertise em diagnóstico e reparo de câmbios automáticos de todas as marcas e modelos.',
    stats: '15+ Anos',
    color: 'accent'
  },
  {
    title: '1000+ Câmbios Reparados',
    description: 'Milhares de transmissões reparadas com sucesso, devolvendo a confiança aos nossos clientes.',
    stats: '1000+ Reparos',
    color: 'steel'
  },
  {
    title: 'Peças Originais',
    description: 'Trabalhamos exclusivamente com peças originais e de alta qualidade para garantir durabilidade.',
    stats: 'Peças OEM',
    color: 'accent'
  },
  {
    title: 'Diagnóstico Gratuito',
    description: 'Avaliação gratuita do seu câmbio com equipamentos de última geração, sem compromisso.',
    stats: 'Grátis',
    color: 'steel'
  },
  {
    title: '6 Meses de Garantia',
    description: 'Todos os nossos serviços incluem garantia de 6 meses para sua total tranquilidade.',
    stats: '6 Meses',
    color: 'accent'
  },
  {
    title: 'Atendimento Especializado',
    description: 'Equipe técnica qualificada para orientar você desde o diagnóstico até a entrega do veículo.',
    stats: 'Suporte Total',
    color: 'steel'
  }
]

export default function WhyChooseUs() {

  return (
    <section className="py-20 relative bg-gradient-to-br from-steel-900 via-steel-800 to-steel-700">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-accent-400 font-semibold text-sm uppercase tracking-wider bg-accent-400/10 px-4 py-2 rounded-full">
              Nossa Diferença
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Por Que Escolher a
            <span className="block text-gradient-accent mt-2">JR Câmbio Automático?</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Combinamos experiência técnica com equipamentos modernos para entregar
            serviços de qualidade que prolongam a vida útil do seu câmbio.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center transition-all duration-300 hover:shadow-lg"
            >
              <div className="glass-enhanced p-8 rounded-2xl h-full">
                {/* Stats badge */}
                <div className="mb-6">
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                    feature.color === 'accent'
                      ? 'bg-gradient-accent text-white'
                      : 'bg-gradient-steel text-white'
                  }`}>
                    {feature.stats}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                  {feature.description}
                </p>

                {/* Decorative line */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className={`w-12 h-1 mx-auto rounded-full ${
                    feature.color === 'accent' ? 'bg-gradient-accent' : 'bg-gradient-steel'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="glass-enhanced p-12 rounded-3xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-6">
              Problemas com seu Câmbio Automático?
            </h3>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de clientes satisfeitos que confiaram na JR Câmbio Automático
              para resolver seus problemas de transmissão.
            </p>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-400">1000+</div>
                <div className="text-white/70">Câmbios Reparados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-400">98%</div>
                <div className="text-white/70">Satisfação do Cliente</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-400">15+</div>
                <div className="text-white/70">Anos de Experiência</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-accent text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity duration-300 shadow-elegant">
                Agendar Diagnóstico Grátis
              </button>
              <button className="glass-enhanced text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors duration-300 border-2 border-white/20">
                Falar com Especialista
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}