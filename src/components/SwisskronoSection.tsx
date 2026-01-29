'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function SwisskronoSection() {
  const features = [
    {
      title: 'Tecnologia Hydro EVO',
      description: '100% à prova d\'água - perfeito para cozinhas e banheiros',
      gradient: 'from-blue-400 to-blue-600',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: 'Sistema 5G Click',
      description: '5x mais forte - instalação rápida e segura com encaixe de 4 lados',
      gradient: 'from-wood-400 to-wood-600',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Sustentabilidade',
      description: 'CO₂ neutro, 30% madeira reciclada, certificado FSC e totalmente reciclável',
      gradient: 'from-green-400 to-green-600',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Alta Durabilidade AC5/33',
      description: 'Resistente a riscos, arranhões, antibacteriano e antiestático',
      gradient: 'from-gold-400 to-gold-600',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ]

  const oakFinishes = [
    { name: 'Chur Oak', description: 'Textura sincronizada clássica' },
    { name: 'Disentis Oak', description: 'Tom natural elegante' },
    { name: 'Realp Oak', description: 'Aparência rústica autêntica' },
    { name: 'Sedrum Oak', description: 'Acabamento contemporâneo' }
  ]

  const products = [
    {
      name: 'Piso Alto Padrão Corepel',
      image: '/swisskrono/divisystem-piso-alto-padrao-corepel-bann.png',
      description: 'Design sofisticado com textura sincronizada de carvalho'
    },
    {
      name: 'Gran Selection Origin',
      image: '/swisskrono/divisystem-piso-gran-selection-origin-bann.png',
      description: 'Beleza natural com resistência superior'
    },
    {
      name: 'Revestimento Acústico Ripado',
      image: '/swisskrono/divisystem-revestimento-acustico-ripado.png',
      description: 'Bom isolamento acústico e visual moderno'
    }
  ]

  return (
    <div className="py-20 bg-gradient-to-br from-wood-50 via-white to-wood-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-gradient-gold">Pisos Laminados Swisskrono</span>
          </h2>
          <p className="font-montserrat text-xl text-gray-600 max-w-3xl mx-auto mb-2">
            Fusão perfeita entre beleza natural e tecnologia avançada
          </p>
          <p className="font-montserrat text-lg text-gray-500 max-w-2xl mx-auto">
            Artureon: combinação de dureza e eternidade através da tecnologia suíça
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Gradient Header with Icon */}
              <div className={`h-32 bg-gradient-to-br ${feature.gradient} relative overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="relative z-10 text-white transform group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                {/* Decorative circles */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-black/10 rounded-full blur-2xl" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-cinzel text-lg font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="font-montserrat text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className={`h-1 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </div>
          ))}
        </div>

        {/* Products Showcase */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="font-cinzel text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Linha de Produtos Artureon
            </h3>
            <p className="font-montserrat text-gray-600 text-lg leading-relaxed mb-2 max-w-3xl mx-auto">
              Madeira de florestas suíças com sistema de encaixe 5G e tecnologia à prova d'água
            </p>
            <p className="font-montserrat text-sm text-gray-500">
              Disponível em 4 acabamentos de carvalho com textura sincronizada
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-wood-50 to-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-56 bg-gradient-to-br from-wood-200 to-wood-300 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  <h4 className="font-cinzel text-xl font-bold text-gray-900 mb-3 group-hover:text-wood-700 transition-colors duration-300">
                    {product.name}
                  </h4>
                  <p className="font-montserrat text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-wood-400 to-wood-600 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-wood-600 to-wood-700 text-white px-12 py-5 rounded-xl font-semibold hover:from-wood-700 hover:to-wood-800 transition-all duration-300 font-montserrat shadow-2xl hover:shadow-3xl transform hover:scale-105 text-lg overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <span className="relative z-10">Solicitar Orçamento Swisskrono</span>
            <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
