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
              Especialistas em câmbio automático com mais de 15 anos de experiência.
              Diagnóstico, manutenção e reparo com qualidade e garantia
              em toda região metropolitana de São Paulo.
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
                href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/jrcambioautomatico"}
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
              <li><FooterLink href="/contact">Contato</FooterLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-gradient-accent p-2 rounded-lg mt-1">
                  <span className="text-charcoal-900">📞</span>
                </div>
                <div>
                  <a
                    href="https://wa.me/5511940147157?text=Olá! Gostaria de agendar um diagnóstico para meu câmbio automático."
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track-id="footer-whatsapp-link"
                    className="text-accent-400 hover:text-accent-300 font-semibold transition-colors block"
                  >
                    (11) 94014-7157
                  </a>
                  <span className="text-white/70 text-sm">WhatsApp</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gradient-accent p-2 rounded-lg mt-1">
                  <span className="text-charcoal-900">✉️</span>
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
                  <span className="text-charcoal-900">📍</span>
                </div>
                <div className="text-white/80">
                  <p>São Paulo, SP</p>
                  <p className="text-sm text-white/60">Atendemos toda RMSP</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-gradient-accent p-2 rounded-lg mt-1">
                  <span className="text-charcoal-900">🕒</span>
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
                Especialistas em câmbio automático
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end space-x-6">
              <Link href="/politica-privacidade" className="text-white/70 hover:text-white transition-colors text-sm">
                Política de Privacidade
              </Link>
              {/* <Link href="/terms" className="text-white/70 hover:text-white transition-colors text-sm">
                Termos de Serviço
              </Link> */}
              {/* <Link href="/sitemap" className="text-white/70 hover:text-white transition-colors text-sm">
                Mapa do Site
              </Link> */}
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
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-white/70 hover:text-accent-400 transition-all duration-300 hover:translate-x-1 inline-block"
    >
      {children}
    </Link>
  )
}