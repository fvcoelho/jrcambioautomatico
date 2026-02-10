'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import Hero from '@/components/Hero'
import ServicesOverview from '@/components/ServicesOverview'
import ProductsShowcase from '@/components/ProductsShowcase'
import MapSection from '@/components/MapSection'
import Link from 'next/link'
import Image from 'next/image'

// Services data from services page
const services = [
  {
    id: 'diagnostico',
    title: 'Diagnóstico Computadorizado',
    description: 'Identificamos o problema com precisão usando equipamentos de última geração para análise completa do câmbio.',
    features: ['Scanner Automotivo', 'Teste de Pressão', 'Análise de Fluido', 'Relatório Detalhado'],
    price: 'Sob consulta',
    gradient: 'from-blue-400 to-blue-600',
    popular: true
  },
  {
    id: 'conserto',
    title: 'Conserto de Câmbio',
    description: 'Reparos especializados com peças originais e garantia. Solucionamos todos os tipos de problemas.',
    features: ['Peças Originais', 'Garantia de 2 Meses', 'Todas as Marcas', 'Mão de Obra Especializada'],
    price: 'Sob consulta',
    gradient: 'from-steel-400 to-steel-600',
    popular: true
  },
  {
    id: 'retifica',
    title: 'Retífica Completa',
    description: 'Reconstrução total do câmbio automático com qualidade de fábrica e garantia estendida.',
    features: ['Desmontagem Completa', 'Troca de Componentes', 'Teste de Bancada', 'Garantia Estendida'],
    price: 'Sob consulta',
    gradient: 'from-accent-400 to-accent-600',
    popular: true
  },
  {
    id: 'troca-oleo',
    title: 'Troca de Óleo ATF',
    description: 'Substituição de fluido de transmissão para melhor performance e maior vida útil do câmbio.',
    features: ['Óleo Original', 'Filtro Novo', 'Limpeza do Sistema', 'Performance Otimizada'],
    price: 'Sob consulta',
    gradient: 'from-steel-500 to-steel-700',
    popular: false
  },
  {
    id: 'revisao',
    title: 'Revisão de Câmbio',
    description: 'Manutenção preventiva completa para estender a vida útil da transmissão automática.',
    features: ['Inspeção Completa', 'Ajustes Necessários', 'Verificação de Vazamentos', 'Teste de Funcionamento'],
    price: 'Sob consulta',
    gradient: 'from-steel-300 to-steel-500',
    popular: false
  }
]

// Product categories data from products page
const productCategories = [
  {
    id: 'fluidos',
    name: 'Fluidos de Transmissão',
    description: 'Óleos ATF de alta qualidade para todos os tipos de câmbio automático',
    gradient: 'from-blue-400 to-blue-600',
    products: [
      { name: 'ATF Dexron VI', price: 'Sob consulta', description: 'Fluido sintético de alta performance' },
      { name: 'ATF Multi-Vehicle', price: 'Sob consulta', description: 'Compatível com múltiplas marcas' },
      { name: 'CVT Fluid', price: 'Sob consulta', description: 'Específico para transmissões CVT' },
      { name: 'ATF Original', price: 'Sob consulta', description: 'Fluidos originais de cada montadora' }
    ]
  },
  {
    id: 'pecas',
    name: 'Peças e Componentes',
    description: 'Peças originais e de reposição para câmbios automáticos',
    gradient: 'from-steel-400 to-steel-600',
    products: [
      { name: 'Kit de Embreagens', price: 'Sob consulta', description: 'Discos e bandas de fricção' },
      { name: 'Válvulas Solenoides', price: 'Sob consulta', description: 'Solenoides originais e remanufaturados' },
      { name: 'Conversor de Torque', price: 'Sob consulta', description: 'Conversores novos e recondicionados' },
      { name: 'Filtros de Transmissão', price: 'Sob consulta', description: 'Filtros para todas as marcas' }
    ]
  },
  {
    id: 'kits',
    name: 'Kits de Reparo',
    description: 'Kits completos para revisão e reparo de câmbios automáticos',
    gradient: 'from-accent-400 to-accent-600',
    products: [
      { name: 'Kit Master', price: 'Sob consulta', description: 'Kit completo para revisão total' },
      { name: 'Kit de Vedação', price: 'Sob consulta', description: 'Juntas e retentores' },
      { name: 'Kit de Embreagens', price: 'Sob consulta', description: 'Pacote completo de fricção' },
      { name: 'Kit Corpo de Válvulas', price: 'Sob consulta', description: 'Componentes do corpo de válvulas' }
    ]
  }
]

// Portfolio projects data (simplified)
const portfolioProjects = [
  {
    id: 1,
    title: 'Honda Civic',
    type: 'Automático',
    service: 'Retífica Completa',
    transmission: 'CVT',
    gradient: 'from-steel-400 to-steel-600'
  },
  {
    id: 2,
    title: 'Toyota Corolla',
    type: 'Automático',
    service: 'Conserto',
    transmission: 'CVT',
    gradient: 'from-blue-400 to-blue-600'
  },
  {
    id: 3,
    title: 'Volkswagen Jetta',
    type: 'DSG',
    service: 'Revisão',
    transmission: '6 Marchas',
    gradient: 'from-steel-300 to-steel-500'
  },
  {
    id: 4,
    title: 'BMW 320i',
    type: 'Automático',
    service: 'Troca de Óleo',
    transmission: 'ZF 8HP',
    gradient: 'from-accent-400 to-accent-600'
  }
]

// Stats data from about page
const stats = [
  { number: '15+', label: 'Anos de Experiência' },
  { number: '1000+', label: 'Câmbios Reparados' },
  { number: '98%', label: 'Satisfação do Cliente' },
  { number: '2', label: 'Meses de Garantia' }
]

export default function Home() {
  const router = useRouter()
  const [visibleSections, setVisibleSections] = useState<number[]>([0])
  const [isLoading, setIsLoading] = useState(false)
  const [checkingIntro, setCheckingIntro] = useState(true)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  // Check if user needs to see intro
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro')
    if (!hasSeenIntro) {
      router.replace('/intro')
    } else {
      setCheckingIntro(false)
    }
  }, [router])

  // Define all sections
  const sections = [
    { id: 'hero', component: Hero },
    { id: 'portfolio', component: PortfolioSection },
    { id: 'services', component: ServicesSection },
    { id: 'products-showcase', component: ProductsShowcase },
    { id: 'about', component: AboutSection },
    { id: 'map', component: MapSection },
    //{ id: 'contact', component: ContactSection }
  ]

  // Intersection observer for the last visible section
  const { ref: lastSectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  })

  // Load more sections when reaching the bottom
  useEffect(() => {
    if (inView && !isLoading && visibleSections.length < sections.length) {
      setIsLoading(true)
      setTimeout(() => {
        setVisibleSections(prev => [...prev, prev.length])
        setIsLoading(false)
      }, 300) // Small delay for smooth loading
    }
  }, [inView, isLoading, visibleSections.length, sections.length])

  // Smooth scroll to section when clicking navigation
  const scrollToSection = (sectionId: string) => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId)
    if (sectionIndex !== -1) {
      // Make sure section is visible
      if (!visibleSections.includes(sectionIndex)) {
        const newSections = []
        for (let i = 0; i <= sectionIndex; i++) {
          newSections.push(i)
        }
        setVisibleSections(newSections)
      }

      // Scroll to section after a brief delay
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  // Add scroll to section functionality to navbar
  useEffect(() => {
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      if (link && link.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const sectionId = link.getAttribute('href')?.slice(1)
        if (sectionId) {
          scrollToSection(sectionId)
        }
      }
    }

    document.addEventListener('click', handleNavClick)
    return () => document.removeEventListener('click', handleNavClick)
  }, [])

  // Show nothing while checking intro status
  if (checkingIntro) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-charcoal-950 via-steel-900 to-charcoal-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Render visible sections */}
      {visibleSections.map((sectionIndex, idx) => {
        const Section = sections[sectionIndex].component
        const isLast = idx === visibleSections.length - 1
        return (
          <section
            key={sections[sectionIndex].id}
            id={sections[sectionIndex].id}
            ref={isLast ? lastSectionRef : null}
            className="scroll-mt-20"
          >
            <Section />
          </section>
        )
      })}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
        </div>
      )}

      {/* End of content message */}
      {/* {visibleSections.length === sections.length && (
        <div className="text-center py-12 text-steel-400">
          <p className="font-montserrat">Você chegou ao fim do conteúdo</p>
        </div>
      )} */}
    </div>
  )
}

// Services Section Component
function ServicesSection() {
  return (
    <div className="py-20 bg-gradient-to-br from-steel-950 via-charcoal-900 to-steel-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gradient-accent">Serviços de Câmbio Automático</span>
          </h2>
          <p className="font-montserrat text-xl text-steel-300 max-w-3xl mx-auto">
            Manutenção de câmbio automático e reparos com padrão técnico, processos claros e garantia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-steel-800 rounded-2xl shadow-xl overflow-hidden relative group hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              {service.popular && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10">
                  Mais Procurado
                </div>
              )}

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
                        <div className="w-2 h-2 bg-steel-8000 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="https://wa.me/5511971829629?text=Olá! Gostaria de agendar uma avaliação para meu câmbio automático."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 text-center font-montserrat shadow-lg group-hover:shadow-xl block flex items-center justify-center gap-2"
                  title="Iniciar conversa no WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382z" />
                  </svg>
                  Agendar Avaliação
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Portfolio Section Component
function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        // Fetch categories
        const catResponse = await fetch('/api/categories')
        const catData = await catResponse.json()
        setCategories(catData.categories || [])

        // Fetch 9 random projects
        const projResponse = await fetch('/api/projects?status=active&random=true&limit=9')
        const projData = await projResponse.json()
        setProjects(projData.projects || [])
      } catch (error) {
        console.error('Error loading portfolio data:', error)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  // Filter projects
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => {
      const selectedCat = categories.find(cat => cat.slug === selectedCategory)
      return project.category === selectedCategory ||
        project.category === selectedCat?.name ||
        project.category === selectedCat?.slug
    })

  const categoryGradients = [
    'from-steel-400 to-steel-600',
    'from-accent-400 to-accent-600',
    'from-blue-400 to-blue-600',
    'from-steel-300 to-steel-500',
    'from-neutral-300 to-neutral-500'
  ]

  const getCategoryGradient = (category: string | null) => {
    switch (category) {
      case 'diagnostico': return 'from-steel-400 to-steel-600'
      case 'reparo': return 'from-zinc-400 to-zinc-600'
      case 'retifica': return 'from-steel-300 to-steel-500'
      case 'manutencao': return 'from-accent-400 to-accent-600'
      case 'outros': return 'from-neutral-300 to-neutral-500'
      default: return 'from-steel-500 to-steel-700'
    }
  }

  if (loading) {
    return (
      <div className="py-20 bg-gradient-to-br from-steel-950 via-charcoal-900 to-steel-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-gradient-accent">Nosso Portfólio</span>
            </h2>
            <p className="font-montserrat text-xl text-steel-300 max-w-3xl mx-auto">
              Carregando nossos projetos...
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-20 bg-gradient-to-br from-steel-950 via-charcoal-900 to-steel-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gradient-accent">Nosso Portfólio</span>
          </h2>
          <p className="font-montserrat text-xl text-steel-300 max-w-3xl mx-auto">
            Veja trabalhos recentes e o padrão técnico da nossa oficina de câmbio automático
            em manutenção, reparo e retífica.
          </p>
        </div>

        {/* Category Filter */}
        {/* 
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`relative overflow-hidden px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === 'all'
                ? `bg-gradient-to-r from-steel-500 to-steel-700 text-white shadow-lg`
                : 'bg-steel-800 text-steel-200 hover:bg-steel-800 hover:text-accent-400 shadow-md hover:shadow-lg'
            }`}
          >
            <span className="relative z-10">Todos os Projetos</span>
          </button>
          
          {categories.map((category, index) => {
            const gradient = categoryGradients[index % categoryGradients.length]
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`relative overflow-hidden px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.slug
                    ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                    : 'bg-steel-800 text-steel-200 hover:bg-steel-800 hover:text-accent-400 shadow-md hover:shadow-lg'
                }`}
              >
                <span className="relative z-10">{category.name}</span>
              </button>
            )
          })}
        </div> 
        */}

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.slice(0, 9).map((project) => {
            const images = project.galleryImages?.filter((img: any) => img.isActive) || []
            const gradient = getCategoryGradient(project.category)
            const category = categories.find(cat =>
              cat.slug === project.category || cat.name === project.category
            )

            return (
              <div
                key={project.id}
                className="bg-steel-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                <div className={`h-56 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
                  {images.length > 0 ? (
                    <div className="relative w-full h-full">
                      {images[0]?.fileType === 'video' ? (
                        <video
                          src={images[0]?.imageUrl}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={images[0]?.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = '/logo.svg'
                            target.classList.add('bg-steel-800', 'p-6')
                          }}
                        />
                      )}
                      {images.length > 1 && (
                        <div className="absolute top-3 right-3 bg-black/60 text-white text-sm px-2 py-1 rounded">
                          +{images.length - 1} fotos
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-white/70">
                      <div className="text-center">
                        <p className="text-lg">Imagens em atualização</p>
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-steel-8000 text-white px-2 py-1 rounded text-xs font-semibold">
                      Ativo
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-cinzel text-xl font-bold text-white mb-3">{project.title}</h3>
                  {project.description && (
                    <p className="font-montserrat text-steel-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                  )}

                  {/* Metadata */}
                  <div className="space-y-2 text-sm text-steel-400">
                    {project.location && (
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{project.location}</span>
                      </div>
                    )}

                    {category && (
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span>{category?.name || project.category}</span>
                      </div>
                    )}

                    {project.completedAt && (
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Concluído em {new Date(project.completedAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        {/* <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-xl p-12 mb-12">
          <h3 className="font-cinzel text-3xl font-bold text-center text-white mb-8">
            Nossa Experiência em Números
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                5,000+
              </div>
              <div className="font-montserrat text-steel-200 font-medium">Projetos Concluídos</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-wood-500 to-wood-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                200k+
              </div>
              <div className="font-montserrat text-steel-200 font-medium">Metros Quadrados</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="font-montserrat text-steel-200 font-medium">Satisfação do Cliente</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <div className="font-montserrat text-steel-200 font-medium">Anos de Experiência</div>
            </div>
          </div>
        </div> */}

        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-block bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 font-montserrat shadow-lg"
          >
            Ver Portfólio Completo
          </Link>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </div>
  )
}

// Project Modal Component
function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  const images = project.galleryImages?.filter((img: any) => img.isActive) || []
  const [currentIndex, setCurrentIndex] = useState(0)
  const modalVideoRef = useRef<HTMLVideoElement>(null)

  const getCategoryGradient = (category: string | null) => {
    switch (category) {
      case 'diagnostico': return 'from-steel-400 to-steel-600'
      case 'reparo': return 'from-zinc-400 to-zinc-600'
      case 'retifica': return 'from-steel-300 to-steel-500'
      case 'manutencao': return 'from-accent-400 to-accent-600'
      case 'outros': return 'from-neutral-300 to-neutral-500'
      default: return 'from-steel-500 to-steel-700'
    }
  }

  const gradient = getCategoryGradient(project.category)

  // Handle video autoplay when modal opens or index changes
  useEffect(() => {
    if (modalVideoRef.current && images[currentIndex]?.fileType === 'video') {
      const video = modalVideoRef.current
      video.muted = true
      video.currentTime = 0

      const playVideo = async () => {
        try {
          await video.play()
        } catch (error) {
          console.log('Video autoplay failed, will try on user interaction:', error)
        }
      }

      if (video.readyState >= 3) {
        playVideo()
      } else {
        video.addEventListener('loadeddata', playVideo, { once: true })
      }
    }
  }, [currentIndex, images])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [onClose, images.length])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-steel-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="font-cinzel text-3xl font-bold text-white">{project.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-steel-300 text-3xl transition-colors p-2"
            >
              ✕
            </button>
          </div>

          {/* Image Carousel */}
          <div className={`h-96 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-8 relative overflow-hidden`}>
            {images.length > 0 ? (
              <div className="relative w-full h-full">
                {images[currentIndex]?.fileType === 'video' ? (
                  <video
                    ref={modalVideoRef}
                    src={images[currentIndex]?.imageUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover rounded-2xl"
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={images[currentIndex]?.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-2xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/logo.svg'
                      target.classList.add('bg-steel-800', 'p-6')
                    }}
                  />
                )}

                {images.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300"
                      onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                    >
                      ←
                    </button>

                    <button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300"
                      onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                    >
                      →
                    </button>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_: any, index: number) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-steel-800 w-8' : 'bg-steel-800/50'
                            }`}
                          onClick={() => setCurrentIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center text-white/70">
                <div className="text-center">
                  <p className="text-xl">Imagens em atualização</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-6">
            {project.description && (
              <p className="font-montserrat text-steel-300 leading-relaxed">{project.description}</p>
            )}
            <div className="grid grid-cols-2 gap-4 text-sm">
              {project.location && (
                <div>
                  <span className="font-semibold text-steel-200">Local:</span>
                  <span className="ml-2 text-steel-300">{project.location}</span>
                </div>
              )}
              {/* {project.category && (
                <div>
                  <span className="font-semibold text-steel-200">Categoria:</span>
                  <span className="ml-2 text-steel-300">{project.category}</span>
                </div>
              )} */}
              {project.completedAt && (
                <div>
                  <span className="font-semibold text-steel-200">Concluído em:</span>
                  <span className="ml-2 text-steel-300">
                    {new Date(project.completedAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href={`https://wa.me/5511971829629?text=${encodeURIComponent(`Olá! Vi um trabalho no portfólio e gostaria de saber mais sobre o serviço: ${project.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex-1 text-center font-montserrat shadow-lg flex items-center justify-center gap-3"
              title="Iniciar conversa no WhatsApp"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Agendar Avaliação
            </a>
            <button
              onClick={onClose}
              className="border-2 border-steel-600 text-steel-200 px-8 py-4 rounded-xl font-semibold hover:bg-steel-700 transition-colors font-montserrat"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// About Section Component
function AboutSection() {
  return (
    <div className="py-20 bg-steel-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gradient-accent">Sobre a JR Câmbio Automático</span>
          </h2>
          <p className="font-montserrat text-xl text-steel-300 max-w-3xl mx-auto">
            Há mais de 15 anos realizando manutenção de câmbio automático com qualidade e garantia
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-steel-800 to-steel-900 rounded-xl shadow-lg p-8 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 border border-steel-700">
              <div className="font-cinzel text-4xl font-bold text-accent-400 mb-3">{stat.number}</div>
              <div className="font-montserrat text-steel-200 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Company Story */}
        <div className="bg-gradient-to-br from-steel-800 to-steel-900 rounded-2xl shadow-xl p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-cinzel text-3xl font-bold text-white mb-6">Nossa História</h3>
              <div className="space-y-4 text-steel-300">
                <p className="font-montserrat text-lg leading-relaxed">
                  A JR Câmbio Automático nasceu da paixão por mecânica automotiva e do compromisso
                  em oferecer serviços de alto padrão em transmissões automáticas na região de São Paulo.
                </p>
                <p className="font-montserrat text-lg leading-relaxed">
                  Hoje, somos referência como oficina de câmbio automático, reconhecidos pela
                  excelência técnica, processos transparentes e compromisso em superar expectativas
                  em cada serviço realizado.
                </p>
              </div>
            </div>
            <div>
              <div className="bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl p-8 shadow-lg text-white">
                <h4 className="font-cinzel text-2xl font-bold mb-4">Por que nos escolher?</h4>
                <ul className="space-y-3 font-montserrat">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-steel-800 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Mais de 15 anos de experiência comprovada</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-steel-800 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Avaliação técnica com equipamentos modernos</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-steel-800 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Garantia de 2 meses em todos os serviços</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-steel-800 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span>Peças de procedência e atendimento especializado</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/about"
            className="inline-block bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 font-montserrat shadow-lg"
          >
            Conheça Nossa Empresa
          </Link>
        </div>
      </div>
    </div>
  )
}

// Contact Section Component
function ContactSection() {
  return (
    <div className="py-20 bg-gradient-to-br from-charcoal-950 via-steel-900 to-charcoal-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-accent">Agende sua Avaliação</span>
          </h2>
          <p className="font-montserrat text-xl text-white/90 max-w-3xl mx-auto">
            Atendimento consultivo para manutenção e reparo de câmbio automático, com retorno rápido
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-steel-800/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-steel-800/20 transition-all duration-300">
              <div className="bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl p-4 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <div className="w-8 h-8 bg-steel-800/20 rounded-full" />
              </div>
              <h3 className="font-cinzel text-xl font-bold mb-2">Telefone</h3>
              <p className="font-montserrat text-white/90">(11) 3113-7934</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-steel-800/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-steel-800/20 transition-all duration-300">
              <div className="bg-gradient-to-br from-steel-500 to-steel-700 rounded-xl p-4 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <div className="w-8 h-8 bg-steel-800/20 rounded-full" />
              </div>
              <h3 className="font-cinzel text-xl font-bold mb-2">WhatsApp</h3>
              <p className="font-montserrat text-white/90">(11) 97182-9629</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-steel-800/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-steel-800/20 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                <div className="w-8 h-8 bg-steel-800/20 rounded-full" />
              </div>
              <h3 className="font-cinzel text-xl font-bold mb-2">Horário</h3>
              <p className="font-montserrat text-white/90">Seg-Sex: 8h-18h</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="https://wa.me/5511971829629?text=Olá! Gostaria de agendar uma avaliação para meu câmbio automático."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-accent-400 to-accent-500 text-white px-12 py-4 rounded-xl font-montserrat font-semibold hover:from-accent-300 hover:to-accent-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center text-lg flex items-center justify-center gap-2"
              title="Iniciar conversa no WhatsApp"
            >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382z" />
            </svg>
            Agendar Avaliação
          </Link>
          <Link
            href="https://wa.me/5511971829629"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white px-12 py-4 rounded-xl font-montserrat font-semibold hover:bg-steel-800 hover:text-green-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center text-lg flex items-center justify-center gap-2"
            title="Iniciar conversa no WhatsApp"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382z" />
            </svg>
            WhatsApp
          </Link>
          <a
            href="tel:+551131137934"
            className="bg-gradient-to-r from-steel-400 to-steel-600 text-white px-12 py-4 rounded-xl font-montserrat font-semibold hover:from-wood-500 hover:to-wood-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center text-lg"
          >
            Ligar Agora
          </a>
        </div>
      </div>
    </div>
  )
}
