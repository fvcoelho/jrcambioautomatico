import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import RootProvider from "@/components/RootProvider";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL('https://jrcambioautomatico.com.br'),
  title: {
    default: "JR Câmbio Automático - Especialistas em Câmbio Automático em São Paulo",
    template: "%s | JR Câmbio Automático"
  },
  description: "Especialistas em diagnóstico, reparo e manutenção de câmbio automático. Diagnóstico gratuito, peças originais e garantia de 6 meses. Mais de 15 anos de experiência em São Paulo.",
  keywords: [
    "câmbio automático são paulo",
    "conserto câmbio automático",
    "retífica câmbio",
    "troca óleo atf",
    "diagnóstico câmbio",
    "reparo transmissão",
    "manutenção câmbio automático",
    "câmbio cvt",
    "câmbio dsg",
    "oficina câmbio automático"
  ],
  authors: [{ name: "JR Câmbio Automático" }],
  creator: "JR Câmbio Automático",
  publisher: "JR Câmbio Automático",
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
    url: 'https://jrcambioautomatico.com.br',
    siteName: 'JR Câmbio Automático',
    title: 'JR Câmbio Automático - Especialistas em Câmbio Automático em São Paulo',
    description: 'Especialistas em diagnóstico, reparo e manutenção de câmbio automático. Diagnóstico gratuito e garantia de 6 meses.',
    images: [
      {
        url: '/logo_full.svg',
        width: 1200,
        height: 630,
        alt: 'JR Câmbio Automático - Especialistas em Transmissão',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JR Câmbio Automático - Especialistas em Câmbio Automático em São Paulo',
    description: 'Especialistas em diagnóstico, reparo e manutenção de câmbio automático. Diagnóstico gratuito e garantia de 6 meses.',
    images: ['/logo_full.svg'],
  },
  alternates: {
    canonical: 'https://jrcambioautomatico.com.br',
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
