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
                href="https://wa.me/5511940147157?text=Olá! Gostaria de saber mais sobre as peças e fluidos para câmbio automático."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-accent-400 to-accent-500 text-white px-8 py-4 rounded-xl font-montserrat font-semibold hover:from-accent-300 hover:to-accent-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382z" />
                </svg>
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
