import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre a JR Câmbio Automático - 15+ Anos de Experiência',
  description: 'Conheça a JR Câmbio Automático com mais de 15 anos de experiência em reparo de transmissões automáticas. Equipe especializada, peças originais e garantia de 6 meses.',
  keywords: 'sobre jr cambio automatico, especialistas cambio, reparos cambio automatico, equipe especializada, experiencia transmissao',
  openGraph: {
    title: 'Sobre a JR Câmbio Automático - Especialistas em Transmissão',
    description: 'Descubra nossa história, equipe e compromisso com a excelência em reparos de câmbio automático.',
    type: 'website',
  },
}

const team = [
  {
    name: 'José Roberto',
    role: 'Fundador & Técnico Master',
    experience: '15+ anos',
    specialties: ['Diagnóstico', 'Retífica'],
    description: 'Fundou a JR Câmbio Automático com a visão de fornecer serviços de qualidade em transmissões.',
    gradient: 'from-steel-400 to-steel-600'
  },
  {
    name: 'Carlos Silva',
    role: 'Técnico Especialista',
    experience: '12+ anos',
    specialties: ['Consertos', 'Manutenção'],
    description: 'Especialista em diagnóstico e reparo de câmbios de todas as marcas.',
    gradient: 'from-accent-400 to-accent-600'
  },
  {
    name: 'Ricardo Santos',
    role: 'Técnico em Eletrônica',
    experience: '10+ anos',
    specialties: ['Diagnóstico Computadorizado', 'Solenoides'],
    description: 'Especialista em sistemas eletrônicos e diagnóstico computadorizado.',
    gradient: 'from-steel-500 to-steel-700'
  },
  {
    name: 'Fernanda Oliveira',
    role: 'Atendimento ao Cliente',
    experience: '8+ anos',
    specialties: ['Atendimento', 'Orçamentos'],
    description: 'Seu primeiro ponto de contato para um atendimento excepcional.',
    gradient: 'from-blue-400 to-blue-600'
  }
]

const stats = [
  { number: '15+', label: 'Anos de Experiência' },
  { number: '1000+', label: 'Câmbios Reparados' },
  { number: '98%', label: 'Satisfação do Cliente' },
  { number: '6', label: 'Meses de Garantia' }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-steel-950 via-charcoal-900 to-steel-950">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-charcoal-950 via-steel-900 to-charcoal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-cinzel text-5xl md:text-6xl lg:text-7xl mb-6 tracking-wider font-light">
            <span className="text-gradient-accent">
              Sobre a JR Câmbio Automático
            </span>
          </h1>
          <p className="font-montserrat text-xl md:text-2xl mb-8 font-light tracking-wide text-white/90 max-w-4xl mx-auto">
            Há mais de 15 anos cuidando do seu câmbio automático com qualidade,
            garantia e atendimento especializado.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Company Story */}
        <div className="bg-steel-800 rounded-2xl shadow-xl overflow-hidden mb-20">
          {/* Gradient Header */}
          <div className="h-32 bg-gradient-to-r from-steel-400 to-steel-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="p-12 -mt-8 relative">
            <div className="bg-steel-800 rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="font-cinzel text-4xl font-bold text-white mb-4">Nossa História</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6 text-steel-300">
                  <p className="font-montserrat text-lg leading-relaxed">
                    A JR Câmbio Automático nasceu da paixão por mecânica automotiva e do compromisso
                    em oferecer serviços de qualidade em transmissões automáticas na região de São Paulo.
                  </p>
                  <p className="font-montserrat text-lg leading-relaxed">
                    O que começou como uma pequena oficina especializada cresceu para se tornar referência
                    no mercado de câmbios automáticos, atendendo milhares de clientes satisfeitos com
                    diagnóstico preciso e reparos de alta qualidade.
                  </p>
                  <p className="font-montserrat text-lg leading-relaxed">
                    Hoje, somos reconhecidos pela excelência técnica, uso de peças originais e compromisso
                    em superar as expectativas dos clientes em cada serviço realizado.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl p-8 shadow-lg">
                  <h3 className="font-cinzel text-2xl font-bold text-white mb-4">Qualidade Garantida</h3>
                  <p className="font-montserrat text-white/90 leading-relaxed">
                    Todos os nossos serviços incluem garantia de 6 meses, peças originais e
                    diagnóstico computadorizado gratuito.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-steel-800 to-steel-900 rounded-xl shadow-lg p-8 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 border border-steel-700">
              <div className="font-cinzel text-4xl font-bold text-accent-400 mb-3">{stat.number}</div>
              <div className="font-montserrat text-steel-200 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Values */}
        <div className="bg-steel-800 rounded-2xl shadow-xl overflow-hidden mb-20">
          {/* Gradient Header */}
          <div className="h-32 bg-gradient-to-r from-steel-500 to-steel-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="p-12 -mt-8 relative">
            <div className="bg-steel-800 rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="font-cinzel text-4xl font-bold text-center text-white mb-4">
                Nossa Missão & Valores
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-br from-steel-400 to-steel-600 rounded-xl p-6 mb-6">
                  <h3 className="font-cinzel text-xl font-bold text-white mb-3">Nossa Missão</h3>
                </div>
                <p className="font-montserrat text-steel-300 leading-relaxed">
                  Oferecer serviços de excelência em câmbios automáticos, proporcionando
                  tranquilidade e confiança aos nossos clientes.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl p-6 mb-6">
                  <h3 className="font-cinzel text-xl font-bold text-white mb-3">Qualidade em Primeiro</h3>
                </div>
                <p className="font-montserrat text-steel-300 leading-relaxed">
                  Usamos apenas peças originais e empregamos técnicos qualificados que
                  se orgulham de entregar reparos perfeitos que duram.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-br from-steel-500 to-steel-700 rounded-xl p-6 mb-6">
                  <h3 className="font-cinzel text-xl font-bold text-white mb-3">Foco no Cliente</h3>
                </div>
                <p className="font-montserrat text-steel-300 leading-relaxed">
                  Cada serviço começa e termina com nosso compromisso com a satisfação do cliente.
                  Seu veículo é nossa prioridade.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="font-cinzel text-4xl font-bold text-center text-white mb-12">Conheça Nossa Equipe</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-steel-800 rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                {/* Gradient Header */}
                <div className={`h-24 bg-gradient-to-r ${member.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-6 -mt-6 relative">
                  <div className="bg-steel-800 rounded-xl p-4 shadow-lg mb-4 text-center">
                    <h3 className="font-cinzel text-lg font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-accent-400 font-montserrat font-semibold text-sm mb-1">{member.role}</p>
                    <p className="text-xs text-steel-400">{member.experience} de experiência</p>
                  </div>

                  <p className="font-montserrat text-steel-300 text-sm mb-4 leading-relaxed">{member.description}</p>

                  <div className="space-y-1">
                    {member.specialties.map((specialty, idx) => (
                      <span key={idx} className="inline-block bg-steel-700 text-accent-300 text-xs px-2 py-1 rounded-full mr-1 font-montserrat">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gradient-to-r from-charcoal-950 via-steel-900 to-charcoal-900 text-white rounded-2xl shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          <div className="relative p-12 text-center">
            <h2 className="font-cinzel text-4xl font-bold mb-8">Nossos Diferenciais</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              <div>
                <div className="bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                  <div className="w-8 h-8 bg-steel-800/20 rounded-full" />
                </div>
                <p className="font-montserrat font-semibold">Diagnóstico Gratuito</p>
              </div>
              <div>
                <div className="bg-gradient-to-br from-steel-400 to-steel-600 rounded-xl p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                  <div className="w-8 h-8 bg-steel-800/20 rounded-full" />
                </div>
                <p className="font-montserrat font-semibold">Peças Originais</p>
              </div>
              <div>
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                  <div className="w-8 h-8 bg-steel-800/20 rounded-full" />
                </div>
                <p className="font-montserrat font-semibold">6 Meses de Garantia</p>
              </div>
              <div>
                <div className="bg-gradient-to-br from-neutral-400 to-neutral-600 rounded-xl p-4 mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                  <div className="w-8 h-8 bg-steel-800/20 rounded-full" />
                </div>
                <p className="font-montserrat font-semibold">Atendimento Especializado</p>
              </div>
            </div>
            <p className="font-montserrat text-lg mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Mantemos os mais altos padrões de qualidade e somos especialistas em
              câmbios automáticos de todas as marcas e modelos.
            </p>
            <a
              href="https://wa.me/5511940147157?text=Olá! Gostaria de agendar um diagnóstico para meu câmbio automático."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-accent-400 to-accent-500 text-white px-8 py-4 rounded-xl font-montserrat font-semibold hover:from-accent-300 hover:to-accent-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382z" />
              </svg>
              Agende seu Diagnóstico Hoje
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
