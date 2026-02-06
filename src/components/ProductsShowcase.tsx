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
                  href="https://wa.me/5511971829629?text=Olá! Gostaria de saber mais sobre as peças e fluidos para câmbio automático."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-accent-600 hover:to-accent-700 transition-all duration-300 font-montserrat shadow-lg group-hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382z" />
                  </svg>
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
