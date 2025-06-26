interface Author {
  name: string;
  url: string;
}

interface StructuredDataProps {
  type: 'website' | 'tool' | 'article';
  data: {
    name?: string;
    description?: string;
    url?: string;
    applicationCategory?: string;
    operatingSystem?: string;
    author?: Author;
  };
}

interface JsonLdBase {
  "@context": string;
  "@type": string;
  name?: string;
  description?: string;
  url?: string;
  author?: {
    "@type": string;
    name: string;
    url: string;
  };
}

interface WebSiteJsonLd extends JsonLdBase {
  "@type": "WebSite";
  potentialAction?: {
    "@type": string;
    target: {
      "@type": string;
      urlTemplate: string;
    };
    "query-input": string;
  };
}

interface SoftwareApplicationJsonLd extends JsonLdBase {
  "@type": "SoftwareApplication";
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
}

interface ArticleJsonLd extends JsonLdBase {
  "@type": "Article";
  headline?: string;
  publisher?: {
    "@type": string;
    name: string;
  };
}

type JsonLd = WebSiteJsonLd | SoftwareApplicationJsonLd | ArticleJsonLd;

export function StructuredData({ type, data }: StructuredDataProps) {
  let jsonLd: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
  };

  switch (type) {
    case 'website':
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: data.name,
        description: data.description,
        url: data.url,
        author: data.author ? {
          "@type": "Person",
          name: data.author.name,
          url: data.author.url
        } : undefined,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${data.url}/performance?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      };
      break;
    
    case 'tool':
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: data.name,
        description: data.description,
        url: data.url,
        applicationCategory: data.applicationCategory || "GameApplication",
        operatingSystem: data.operatingSystem || "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "JPY"
        },
        author: data.author ? {
          "@type": "Person",
          name: data.author.name,
          url: data.author.url
        } : undefined
      };
      break;
    
    case 'article':
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.name,
        description: data.description,
        url: data.url,
        author: data.author ? {
          "@type": "Person",
          name: data.author.name,
          url: data.author.url
        } : undefined,
        publisher: {
          "@type": "Organization",
          name: "MKWorld Tools"
        }
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}