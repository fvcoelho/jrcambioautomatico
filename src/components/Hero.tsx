'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [showIntro, setShowIntro] = useState(true)
  const [introFading, setIntroFading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Start fading out intro after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setIntroFading(true)
    }, 2500)

    // Hide intro completely after fade animation
    const hideTimer = setTimeout(() => {
      setShowIntro(false)
      setIsLoaded(true)
    }, 3000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Intro Animation Overlay */}
      {showIntro && (
        <div
          className={`absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-charcoal-950 via-steel-900 to-charcoal-900 transition-opacity duration-500 ${introFading ? 'opacity-0' : 'opacity-100'
            }`}
        >
          <div className="text-center">
            {/* Animated Logo */}
            <div className="relative animate-intro-logo">
              <Image
                src="/jrcambio.svg"
                alt="JR Câmbio Automático"
                width={400}
                height={330}
                className="w-64 md:w-80 lg:w-96 h-auto mx-auto drop-shadow-2xl"
                priority
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-accent-500/20 blur-3xl rounded-full animate-pulse" />
            </div>

            {/* Animated tagline */}
            <div className="mt-8 overflow-hidden">
              <p className="font-montserrat text-white/80 text-lg md:text-xl tracking-widest uppercase animate-slide-up">
                Oficina de Câmbio Automático
              </p>
            </div>

            {/* Loading dots */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </div>
      )}

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-steel-950 via-steel-900 to-charcoal-900" />

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-steel-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>



      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
            {/* Main Title */}
            <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl mb-6 tracking-wider font-bold text-white drop-shadow-lg">
              <span className="block text-gradient-accent">
                Manutenção de Câmbio Automático
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-montserrat text-xl md:text-2xl mb-12 font-light tracking-wide text-white/90 drop-shadow">
              Oficina de câmbio automático em São Paulo com diagnóstico preciso, manutenção preventiva e reparos com garantia
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="https://wa.me/5511971829629?text=Olá! Gostaria de agendar uma avaliação para meu câmbio automático."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-12 py-4 overflow-hidden bg-accent-500 hover:bg-accent-600 transition-all duration-300 rounded glow-blue flex items-center justify-center gap-2"
                title="Iniciar conversa no WhatsApp"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382z" />
                </svg>
                <span className="relative z-10 font-montserrat text-sm tracking-widest uppercase text-white font-semibold">
                  Agendar Avaliação
                </span>
              </Link>

              <Link
                href="/#services"
                className="font-montserrat text-sm tracking-widest uppercase text-white/90 hover:text-white transition-colors duration-300 border border-white/50 hover:border-white px-12 py-4 rounded"
              >
                Ver Serviços
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
        <div className="flex flex-col items-center text-white/60 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
          <span className="font-montserrat text-xs mt-2 tracking-widest uppercase">Scroll</span>
        </div>
      </div>
    </section>
  )
}
