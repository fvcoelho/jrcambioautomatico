import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Peças e Fluidos para Câmbio Automático | JR Câmbio Automático',
  description: 'Peças originais, fluidos ATF e kits de reparo para câmbio automático. Trabalhamos com as melhores marcas do mercado. Garantia de qualidade.',
  keywords: 'peças câmbio automático, óleo ATF, fluido transmissão, kit reparo câmbio, solenoides, conversor torque, filtro câmbio',
  openGraph: {
    title: 'Peças e Fluidos para Câmbio Automático | JR Câmbio Automático',
    description: 'Peças originais e fluidos de alta qualidade para câmbio automático de todas as marcas.',
    type: 'website',
  },
}

const productCategories = [
  {
    id: 'fluidos',
    name: 'Fluidos de Transmissão',
    description: 'Óleos ATF de alta qualidade para todos os tipos de câmbio automático',
    gradient: 'from-blue-400 to-blue-600',
    products: [
      { name: 'ATF Dexron VI', price: 'Sob consulta', description: 'Fluido sintético de alta performance para GM' },
      { name: 'ATF Multi-Vehicle', price: 'Sob consulta', description: 'Compatível com múltiplas marcas e modelos' },
      { name: 'CVT Fluid', price: 'Sob consulta', description: 'Específico para transmissões CVT Honda/Toyota/Nissan' },
      { name: 'ATF Original', price: 'Sob consulta', description: 'Fluidos originais de cada montadora' }
    ]
  },
  {
    id: 'pecas',
    name: 'Peças e Componentes',
    description: 'Peças originais e de reposição para câmbios automáticos de todas as marcas',
    gradient: 'from-steel-400 to-steel-600',
    products: [
      { name: 'Kit de Embreagens', price: 'Sob consulta', description: 'Discos e bandas de fricção originais' },
      { name: 'Válvulas Solenoides', price: 'Sob consulta', description: 'Solenoides originais e remanufaturados' },
      { name: 'Conversor de Torque', price: 'Sob consulta', description: 'Conversores novos e recondicionados' },
      { name: 'Filtros de Transmissão', price: 'Sob consulta', description: 'Filtros para todas as marcas de veículos' }
    ]
  },
  {
    id: 'kits',
    name: 'Kits de Reparo',
    description: 'Kits completos para revisão e reparo de câmbios automáticos',
    gradient: 'from-accent-400 to-accent-600',
    products: [
      { name: 'Kit Master', price: 'Sob consulta', description: 'Kit completo para revisão total do câmbio' },
      { name: 'Kit de Vedação', price: 'Sob consulta', description: 'Juntas e retentores de alta qualidade' },
      { name: 'Kit de Embreagens', price: 'Sob consulta', description: 'Pacote completo de discos de fricção' },
      { name: 'Kit Corpo de Válvulas', price: 'Sob consulta', description: 'Componentes para reparo do corpo de válvulas' }
    ]
  },
  {
    id: 'outros',
    name: 'Outros Componentes',
    description: 'Componentes eletrônicos e peças especiais para câmbios automáticos',
    gradient: 'from-green-400 to-green-600',
    products: [
      { name: 'Módulo TCM', price: 'Sob consulta', description: 'Módulos de controle de transmissão' },
      { name: 'Sensores', price: 'Sob consulta', description: 'Sensores de velocidade e temperatura' },
      { name: 'Bombas de Óleo', price: 'Sob consulta', description: 'Bombas hidráulicas para câmbio' },
      { name: 'Planetárias', price: 'Sob consulta', description: 'Conjuntos planetários e engrenagens' }
    ]
  }
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-steel-950 via-charcoal-900 to-steel-950">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-charcoal-950 via-steel-900 to-charcoal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-cinzel text-5xl md:text-6xl lg:text-7xl mb-6 tracking-wider font-light">
            <span className="text-gradient-accent">
              Peças e Fluidos
            </span>
          </h1>
          <p className="font-montserrat text-xl md:text-2xl mb-8 font-light tracking-wide text-white/90 max-w-4xl mx-auto">
            Trabalhamos com peças originais e fluidos de alta qualidade das melhores marcas
            do mercado, garantindo durabilidade e performance para seu câmbio automático
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Product Categories */}
        <div className="space-y-16">
          {productCategories.map((category) => (
            <div key={category.id} className="bg-steel-800 rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
              {/* Gradient Header */}
              <div className={`h-32 bg-gradient-to-r ${category.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="p-8 -mt-8 relative">
                <div className="bg-steel-800 rounded-2xl p-8 shadow-lg mb-8">
                  <h2 className="font-cinzel text-4xl font-bold text-white mb-4">{category.name}</h2>
                  <p className="font-montserrat text-steel-300 text-lg leading-relaxed">{category.description}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.products.map((product, index) => (
                    <div key={index} className="bg-gradient-to-br from-steel-800 to-steel-900 rounded-xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 border border-steel-700 group">
                      <h3 className="font-cinzel text-xl font-bold text-white mb-3 group-hover:text-accent-400 transition-colors">{product.name}</h3>
                      <p className="text-accent-400 font-bold text-lg mb-3">{product.price}</p>
                      <p className="font-montserrat text-steel-300 text-sm leading-relaxed">{product.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brands Section */}
        <div className="mt-20 bg-gradient-to-r from-steel-800 to-steel-900 rounded-2xl shadow-xl p-12">
          <h2 className="font-cinzel text-4xl font-bold text-center text-white mb-12">
            Marcas que Trabalhamos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'ZF', 'Aisin', 'Jatco', 'GM',
              'Ford', 'Toyota', 'Honda', 'Volkswagen',
              'BMW', 'Mercedes', 'Hyundai', 'Nissan'
            ].map((brand, index) => (
              <div key={index} className="text-center group">
                <div className="bg-steel-800 rounded-xl p-6 h-24 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-steel-700">
                  <span className="font-montserrat text-steel-200 font-semibold group-hover:text-accent-400 transition-colors">{brand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-charcoal-950 via-steel-900 to-charcoal-900 text-white rounded-2xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="relative p-12 text-center">
            <h2 className="font-cinzel text-4xl font-bold mb-6 text-white">
              Precisa de uma Peça Específica?
            </h2>
            <p className="font-montserrat text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Nossa equipe especializada pode ajudá-lo a encontrar a peça certa para seu câmbio automático.
              Trabalhamos com peças originais e alternativas de qualidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/contact"
                className="bg-gradient-to-r from-accent-400 to-accent-500 text-white px-8 py-4 rounded-xl font-montserrat font-semibold hover:from-accent-300 hover:to-accent-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Solicitar Orçamento
              </a>
              <a
                href="/services"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-montserrat font-semibold hover:bg-steel-700 hover:border-steel-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Ver Nossos Serviços
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
