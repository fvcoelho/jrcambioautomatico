import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import RootProvider from "@/components/RootProvider";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL('https://pisospro.com.br'),
  title: {
    default: "Pisos Pró - Instalação e Reforma de Pisos em São Paulo",
    template: "%s | Pisos Pró"
  },
  description: "Especialistas em instalação, reforma e manutenção de pisos de madeira, laminados, vinílicos e Swisskrono. Artesanato de qualidade com mais de 15 anos de experiência em São Paulo.",
  keywords: [
    "pisos são paulo",
    "instalação de pisos",
    "pisos de madeira",
    "piso laminado",
    "piso vinílico",
    "swisskrono",
    "reforma de pisos",
    "pisos profissionais",
    "instalação laminado são paulo",
    "pisos comerciais",
    "pisos residenciais"
  ],
  authors: [{ name: "Pisos Pró" }],
  creator: "Pisos Pró",
  publisher: "Pisos Pró",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    apple: '/apple-touch-icon.png',
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ]
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://pisospro.com.br',
    siteName: 'Pisos Pró',
    title: 'Pisos Pró - Instalação e Reforma de Pisos em São Paulo',
    description: 'Especialistas em instalação, reforma e manutenção de pisos de madeira, laminados, vinílicos e Swisskrono. Mais de 15 anos de experiência.',
    images: [
      {
        url: '/logo_full.svg',
        width: 1200,
        height: 630,
        alt: 'Pisos Pró - Especialistas em Pisos',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pisos Pró - Instalação e Reforma de Pisos em São Paulo',
    description: 'Especialistas em instalação, reforma e manutenção de pisos de madeira, laminados, vinílicos e Swisskrono.',
    images: ['/logo_full.svg'],
  },
  alternates: {
    canonical: 'https://pisospro.com.br',
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <StructuredData />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-16457283704"
        />
        <Script
          id="google-ads"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16457283704');
            `,
          }}
        />
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}