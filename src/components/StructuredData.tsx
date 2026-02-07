import Script from 'next/script'

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://jrcambioautomatico.com.br",
    "name": "JR Câmbio Automático",
    "description": "Oficina de câmbio automático em São Paulo com diagnóstico preciso, manutenção de câmbio automático, reparo e garantia.",
    "url": "https://jrcambioautomatico.com.br",
    "telephone": "+55-11-97182-9629",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-23.550520",
      "longitude": "-46.633308"
    },
    "image": "https://jrcambioautomatico.com.br/logo_full.svg",
    "logo": "https://jrcambioautomatico.com.br/logo_full.svg",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/jrcambioautomatico"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "200"
    },
    "areaServed": {
      "@type": "City",
      "name": "São Paulo"
    }
  }

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Diagnóstico Computadorizado",
        "description": "Avaliação técnica com leitura eletrônica e testes para identificar a causa raiz",
        "provider": {
          "@type": "LocalBusiness",
          "name": "JR Câmbio Automático"
        },
        "areaServed": "São Paulo, SP",
        "serviceType": "Diagnóstico Automotivo"
      },
      {
        "@type": "Service",
        "name": "Conserto de Câmbio Automático",
        "description": "Reparos especializados com peças de procedência e garantia",
        "provider": {
          "@type": "LocalBusiness",
          "name": "JR Câmbio Automático"
        },
        "areaServed": "São Paulo, SP",
        "serviceType": "Reparo de Transmissão"
      },
      {
        "@type": "Service",
        "name": "Retífica de Câmbio",
        "description": "Retífica com padrão técnico e tolerâncias de fábrica",
        "provider": {
          "@type": "LocalBusiness",
          "name": "JR Câmbio Automático"
        },
        "areaServed": "São Paulo, SP",
        "serviceType": "Retífica de Transmissão"
      },
      {
        "@type": "Service",
        "name": "Troca de Óleo ATF",
        "description": "Troca de fluido ATF com especificação correta para cada transmissão",
        "provider": {
          "@type": "LocalBusiness",
          "name": "JR Câmbio Automático"
        },
        "areaServed": "São Paulo, SP",
        "serviceType": "Manutenção Automotiva"
      },
      {
        "@type": "Service",
        "name": "Manutenção Preventiva",
        "description": "Manutenção preventiva para reduzir falhas e prolongar a vida útil",
        "provider": {
          "@type": "LocalBusiness",
          "name": "JR Câmbio Automático"
        },
        "areaServed": "São Paulo, SP",
        "serviceType": "Manutenção Preventiva"
      }
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://jrcambioautomatico.com.br"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Serviços",
        "item": "https://jrcambioautomatico.com.br/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Portfólio",
        "item": "https://jrcambioautomatico.com.br/portfolio"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Contato",
        "item": "https://jrcambioautomatico.com.br/contact"
      }
    ]
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
