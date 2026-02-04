'use client'

import Link from 'next/link'

const transmissionProducts = [
  {
    id: 'fluidos',
    title: 'Fluidos de Transmissão',
    subtitle: 'ATF Dexron, Multi-Vehicle, CVT',
    description: 'Trabalhamos com óleos ATF de alta qualidade das melhores marcas para todos os tipos de câmbio automático. Fluidos originais e compatíveis para garantir a performance do seu veículo.',
    features: [
      'ATF Dexron VI sintético',
      'Multi-Vehicle para várias marcas',
      'Fluido CVT específico',
      'Óleos originais de cada montadora',
      'Garantia de procedência'
    ],
    gradient: 'from-blue-400 to-blue-600',
    popular: true
  },
  {
    id: 'pecas',
    title: 'Peças e Componentes',
    subtitle: 'Originais e Remanufaturadas',
    description: 'Peças originais e de qualidade para câmbios automáticos de todas as marcas e modelos. Trabalhamos com os principais fornecedores do mercado automotivo.',
    features: [
      'Kit de embreagens completo',
      'Válvulas solenoides',
      'Conversores de torque',
      'Filtros de transmissão',
      'Bombas de óleo'
    ],
    gradient: 'from-steel-400 to-steel-600',
    popular: true
  },
  {
    id: 'kits',
    title: 'Kits de Reparo',
    subtitle: 'Master, Vedação, Embreagens',
    description: 'Kits completos para revisão e reparo de câmbios automáticos. Inclui todas as peças necessárias para uma retífica completa com qualidade de fábrica.',
    features: [
      'Kit Master completo',
      'Kit de vedação (juntas e retentores)',
      'Kit de fricção',
      'Kit corpo de válvulas',
      'Garantia estendida'
    ],
    gradient: 'from-accent-400 to-accent-600',
    popular: false
  },
  {
    id: 'eletronicos',
    title: 'Componentes Eletrônicos',
    subtitle: 'Módulos, Sensores, Conectores',
    description: 'Componentes eletrônicos para diagnóstico e reparo de sistemas de transmissão automática. Tecnologia de última geração para todos os veículos.',
    features: [
      'Módulos TCM',
      'Sensores de velocidade',
      'Sensores de temperatura',
      'Chicotes elétricos',
      'Conectores originais'
    ],
    gradient: 'from-green-400 to-green-600',
    popular: false
  }
]

export default function ProductsShowcase() {
  return (
    <section className="py-20 bg-gradient-to-br from-steel-900 via-charcoal-900 to-steel-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gradient-accent">Peças e Fluidos para Câmbio</span>
          </h2>
          <p className="font-montserrat text-xl text-steel-300 max-w-3xl mx-auto">
            Trabalhamos com peças originais e fluidos de alta qualidade das melhores marcas do mercado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {transmissionProducts.map((product) => (
            <div
              key={product.id}
              className="bg-steel-800 rounded-2xl shadow-xl overflow-hidden relative group hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              {product.popular && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                  Mais Procurado
                </div>
              )}

              <div className={`h-32 bg-gradient-to-r ${product.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="p-8 -mt-8">
                <div className="bg-steel-800 rounded-2xl p-6 shadow-lg mb-6">
                  <h3 className="font-cinzel text-2xl font-bold text-white mb-1">
                    {product.title}
                  </h3>
                  <p className="text-accent-400 font-semibold text-lg">{product.subtitle}</p>
                </div>

                <p className="font-montserrat text-steel-300 mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="mb-8">
                  <h4 className="font-cinzel text-lg font-bold text-white mb-4">Produtos disponíveis:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-steel-300 font-montserrat">
                        <div className="w-2 h-2 bg-accent-500 rounded-full mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="block text-center bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-accent-600 hover:to-accent-700 transition-all duration-300 font-montserrat shadow-lg group-hover:shadow-xl"
                >
                  Solicitar Orçamento
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
