import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-charcoal-950 via-steel-900 to-charcoal-950 text-white overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-metal-texture opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-gradient-accent mb-2">JR Câmbio Automático</h3>
              <div className="w-20 h-1 bg-gradient-accent rounded-full mb-4"></div>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed text-lg">
              Oficina de câmbio automático com mais de 15 anos de experiência.
              Diagnóstico, manutenção de câmbio automático e reparos com padrão técnico
              e garantia para toda a região metropolitana de São Paulo.
            </p>

            {/* Trust indicators */}
            {/* <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center glass-enhanced p-3 rounded-lg">
                <div className="text-2xl font-bold text-accent-400">15+</div>
                <div className="text-xs text-white/70">Anos</div>
              </div>
              <div className="text-center glass-enhanced p-3 rounded-lg">
                <div className="text-2xl font-bold text-accent-400">5K+</div>
                <div className="text-xs text-white/70">Projetos</div>
              </div>
              <div className="text-center glass-enhanced p-3 rounded-lg">
                <div className="text-2xl font-bold text-accent-400">98%</div>
                <div className="text-xs text-white/70">Satisfação</div>
              </div>
            </div> */}

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/profile.php?id=100063594938515"}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-enhanced w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600/20 transition-all duration-300 hover:scale-110"
              >
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/jrcambioautomatico"}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-enhanced w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-600/20 transition-all duration-300 hover:scale-110"
              >
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Navegação</h4>
            <ul className="space-y-3">
              <li><FooterLink href="/">Início</FooterLink></li>
              <li><FooterLink href="/portfolio">Portfólio</FooterLink></li>
              <li><FooterLink href="/services">Serviços</FooterLink></li>
              {/* <li><FooterLink href="/products">Produtos</FooterLink></li> */}
              <li><FooterLink href="/about">Sobre Nós</FooterLink></li>
              <li><FooterLink href="https://wa.me/5511971829629?text=Olá! Gostaria de agendar uma avaliação para meu câmbio automático." title="Iniciar conversa no WhatsApp">Contato</FooterLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-accent p-2 rounded-lg mt-1">
                  <svg className="w-4 h-4 text-charcoal-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <a
                    href="https://wa.me/5511971829629?text=Olá! Gostaria de agendar uma avaliação para meu câmbio automático."
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-id="footer-whatsapp-link"
                    className="text-accent-400 hover:text-accent-300 font-semibold transition-colors block"
                    title="Iniciar conversa no WhatsApp"
                  >
                    (11) 97182-9629
                  </a>
                  <span className="text-white/70 text-sm">Atendimento via WhatsApp</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gradient-accent p-2 rounded-lg mt-1">
                  <svg className="w-4 h-4 text-charcoal-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <a
                    href="mailto:contato@jrcambioautomatico.com.br"
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    contato@jrcambioautomatico.com.br
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gradient-accent p-2 rounded-lg mt-1">
                  <svg className="w-4 h-4 text-charcoal-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-white/80">
                  <p>São Paulo, SP</p>
                  <p className="text-sm text-white/60">Atendemos toda RMSP</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gradient-accent p-2 rounded-lg mt-1">
                  <svg className="w-4 h-4 text-charcoal-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-white/80 text-sm">
                  <p>Seg-Sex: 8h às 18h</p>
                  <p>Sáb: 9h às 16h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/10 pt-8 mt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-white/70">
                © {new Date().getFullYear()} JR Câmbio Automático. Todos os direitos reservados.
              </p>
              <p className="text-white/50 text-sm mt-1">
                Oficina de câmbio automático em São Paulo
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end items-center gap-6">
              <Link href="/politica-privacidade" className="text-white/70 hover:text-white transition-colors text-sm">
                Política de Privacidade
              </Link>
            </div>
          </div>

          {/* Certificate badges */}
          {/* <div className="flex justify-center space-x-6 mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-2 text-white/60">
              <span className="text-accent-400">🏅</span>
              <span className="text-xs">Licenciado CREA</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60">
              <span className="text-accent-400">🛡️</span>
              <span className="text-xs">Totalmente Segurado</span>
            </div>
            <div className="flex items-center space-x-2 text-white/60">
              <span className="text-accent-400">🌱</span>
              <span className="text-xs">Madeira Sustentável</span>
            </div>
          </div> */}

          {/* Developer credit */}
          <div className="flex justify-center mt-6 pt-4 border-t border-white/10">
            <p className="text-white/50 text-xl text-center">
              Desenvolvido por{' '}
              <a
                href="https://pegue.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-400 hover:text-accent-400 transition-colors font-medium"
              >
                pegue.app
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Helper component for footer links
function FooterLink({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: any }) {
  return (
    <Link
      href={href}
      {...props}
      className="text-white/70 hover:text-accent-400 transition-all duration-300 hover:translate-x-1 inline-block"
    >
      {children}
    </Link>
  )
}
