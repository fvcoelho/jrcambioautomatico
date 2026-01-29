import Script from 'next/script'

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://pisospro.com.br",
    "name": "Pisos Pró",
    "description": "Especialistas em instalação, reforma e manutenção de pisos de madeira, laminados, vinílicos e Swisskrono com mais de 15 anos de experiência em São Paulo.",
    "url": "https://pisospro.com.br",
    "telephone": "+55-11-3113-7934",
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
    "image": "https://pisospro.com.br/logo_full.svg",
    "logo": "https://pisospro.com.br/logo_full.svg",
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
      }
    ],
    "sameAs": [
      "https://www.facebook.com/pisospro",
      "https://www.instagram.com/pisospro"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
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
        "name": "Instalação de Pisos de Madeira",
        "description": "Instalação premium de piso de madeira com artesanato especializado",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Pisos Pró"
        },
        "areaServed": "São Paulo, SP",
        "serviceType": "Instalação de Pisos"
      },
      {
        "@type": "Service",
        "name": "Instalação de Piso Laminado",
        "description": "Piso laminado acessível e durável com instalação profissional",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Pisos Pró"
        },
        "areaServed": "São Paulo, SP",
        "serviceType": "Instalação de Pisos"
      },
      {
        "@type": "Service",
        "name": "Instalação de Piso Vinílico e LVT",
        "description": "Piso vinílico de luxo em régua e manta perfeito para áreas de alta umidade",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Pisos Pró"
        },
        "areaServed": "São Paulo, SP",
        "serviceType": "Instalação de Pisos"
      },
      {
        "@type": "Service",
        "name": "Instalação de Pisos Swisskrono",
        "description": "Pisos laminados Swisskrono com tecnologia Hydro EVO 100% impermeável",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Pisos Pró"
        },
        "areaServed": "São Paulo, SP",
        "serviceType": "Instalação de Pisos"
      },
      {
        "@type": "Service",
        "name": "Restauração de Pisos",
        "description": "Restaure a beleza dos seus pisos de madeira existentes com lixamento e acabamento profissional",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Pisos Pró"
        },
        "areaServed": "São Paulo, SP",
        "serviceType": "Reforma de Pisos"
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
        "item": "https://pisospro.com.br"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Serviços",
        "item": "https://pisospro.com.br/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Produtos",
        "item": "https://pisospro.com.br/products"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Portfólio",
        "item": "https://pisospro.com.br/portfolio"
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
