import React, { useEffect } from 'react';
import { SiteContent } from '../types';

interface SEOProps {
  content: SiteContent;
}

export default function SEO({ content }: SEOProps) {
  useEffect(() => {
    // LocalBusiness Schema
    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Masud Enterprise",
      "image": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1200",
      "@id": "https://masudenterprise.com",
      "url": "https://masudenterprise.com",
      "telephone": content.contactPhone,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": content.address,
        "addressLocality": "Riyadh",
        "addressRegion": "Riyadh Province",
        "addressCountry": "SA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 24.7136,
        "longitude": 46.6753
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Sunday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      "sameAs": [
        "https://www.instagram.com/masudenterprise",
        "https://www.linkedin.com/company/masudenterprise"
      ]
    };

    // Services Schema (Stages)
    const servicesSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Concert Stage Construction",
          "description": "Heavy-duty steel stages for large-scale outdoor music festivals and concerts."
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Exhibition Stand Fabrication",
          "description": "Custom modular exhibition stands and booths for corporate events and trade shows."
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Wedding Stage Design",
          "description": "Elegant and sophisticated stage setups for luxury weddings and private celebrations."
        }
      ]
    };

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where does Masud Enterprise operate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We are based in Riyadh and provide stage construction services across the entire Kingdom of Saudi Arabia."
          }
        },
        {
          "@type": "Question",
          "name": "What materials do you use for stage construction?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We primarily use high-grade industrial steel to ensure maximum safety and durability for all our event stages."
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify([businessSchema, servicesSchema, faqSchema]);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [content]);

  return null;
}
