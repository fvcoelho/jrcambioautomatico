'use client'

import Link from 'next/link'

const businessInfo = {
  name: 'JR Câmbio Automático',
  address: 'Av. Eliseu de Almeida, 325',
  neighborhood: 'Instituto de Previdência',
  city: 'São Paulo - SP',
  zipCode: '05533-000',
  phone: '(11) 97182-9629',
  whatsapp: '5511971829629',
  hours: {
    weekdays: 'Seg-Sex: 8h às 18h',
    saturday: 'Sáb: 9h às 16h',
    sunday: 'Dom: Fechado'
  },
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Av.+Eliseu+de+Almeida,+325+-+Instituto+de+Previdencia,+Sao+Paulo+-+SP,+05533-000'
}

// Google Maps embed URL for the address
const mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.5!2d-46.7278!3d-23.5777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDM0JzM5LjciUyA0NsKwNDMnNDAuMSJX!5e0!3m2!1spt-BR!2sbr!4v1706000000000'

export default function MapSection() {
  return (
    <section id="nossa-oficina" className="py-20 bg-gradient-to-br from-steel-950 via-charcoal-900 to-steel-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gradient-accent">Nossa Oficina</span>
          </h2>
          <p className="font-montserrat text-xl text-steel-300 max-w-3xl mx-auto">
            Atendimento em São Paulo com estrutura completa para manutenção de câmbio automático
          </p>
        </div>

        {/* Map and Info Grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Map Container - Takes 3 columns on large screens */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden border border-steel-700 shadow-xl h-[400px] lg:h-[450px]">
              {/* Dark overlay for better theme integration */}
              <div className="absolute inset-0 bg-steel-900/20 pointer-events-none z-10 rounded-2xl" />

              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[30%] contrast-[1.1]"
                title="Localização JR Câmbio Automático"
              />
            </div>
          </div>

          {/* Info Card - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-steel-800 rounded-2xl p-8 h-full border border-steel-700 shadow-xl">
              {/* Business Name */}
              <h3 className="font-cinzel text-2xl font-bold text-white mb-6">
                {businessInfo.name}
              </h3>

              {/* Address */}
              <div className="mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-gradient-accent p-2 rounded-lg mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{businessInfo.address}</p>
                    <p className="text-steel-300">{businessInfo.neighborhood}</p>
                    <p className="text-steel-300">{businessInfo.city}</p>
                    <p className="text-steel-400 text-sm">{businessInfo.zipCode}</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-accent p-2 rounded-lg mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Horário de Funcionamento</p>
                    <p className="text-steel-300 text-sm">{businessInfo.hours.weekdays}</p>
                    <p className="text-steel-300 text-sm">{businessInfo.hours.saturday}</p>
                    <p className="text-steel-400 text-sm">{businessInfo.hours.sunday}</p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-accent p-2 rounded-lg mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{businessInfo.phone}</p>
                    <p className="text-steel-400 text-sm">Atendimento consultivo via WhatsApp</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de agendar uma avaliação para meu câmbio automático.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-accent text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-lg glow-blue"
                  title="Iniciar conversa no WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382z"/>
                  </svg>
                  Agendar avaliação pelo WhatsApp
                </a>

                <a
                  href={businessInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full border-2 border-steel-600 text-steel-200 px-6 py-3 rounded-xl font-semibold hover:bg-steel-700 hover:text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Abrir no Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Service Area Note */}
        <div className="mt-8 text-center">
          <p className="text-steel-400 font-montserrat">
            <span className="text-accent-400 font-semibold">Área de Atendimento:</span> Atendemos toda a Grande São Paulo (RMSP)
          </p>
        </div>
      </div>
    </section>
  )
}
