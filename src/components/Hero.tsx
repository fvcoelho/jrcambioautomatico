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
                Especialistas em Câmbio Automático
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
                Especialistas em Câmbio Automático
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-montserrat text-xl md:text-2xl mb-12 font-light tracking-wide text-white/90 drop-shadow">
              Diagnóstico, manutenção e reparo com qualidade e garantia
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/contact"
                className="group relative px-12 py-4 overflow-hidden bg-accent-500 hover:bg-accent-600 transition-all duration-300 rounded glow-blue"
              >
                <span className="relative z-10 font-montserrat text-sm tracking-widest uppercase text-white font-semibold">
                  Agendar Diagnóstico
                </span>
              </Link>

              <Link
                href="/#services"
                className="font-montserrat text-sm tracking-widest uppercase text-white/90 hover:text-white transition-colors duration-300 border border-white/50 hover:border-white px-12 py-4 rounded"
              >
                Nossos Serviços
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
