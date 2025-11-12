import { useEffect } from 'react';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonical,
  ogImage = "https://groeirichting.nl/og-image.jpg",
  ogType = "website"
}) => {
  const fullTitle = title ? `${title} | GroeiRichting` : 'GroeiRichting - AI-Gestuurde Gesprekken voor Werkgevers en Medewerkers';
  const fullDescription = description || 'Ontdek hoe AI-gestuurde gesprekken werkgevers en medewerkers helpen groeien. Professionele gespreksvoering met kunstmatige intelligentie voor betere werkrelaties.';
  const fullKeywords = keywords || 'AI gesprekken, werkgever medewerker, kunstmatige intelligentie, gespreksvoering, groei, ontwikkeling, HR, personeel';
  const fullCanonical = canonical || 'https://groeirichting.nl/';

  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', fullDescription);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', fullKeywords);
    }
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = fullCanonical;
    
    // Update Open Graph tags
    const updateMetaTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    updateMetaTag('og:title', fullTitle);
    updateMetaTag('og:description', fullDescription);
    updateMetaTag('og:image', ogImage);
    updateMetaTag('og:type', ogType);
    updateMetaTag('og:url', fullCanonical);
    
    // Update Twitter tags
    const updateTwitterTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    updateTwitterTag('twitter:title', fullTitle);
    updateTwitterTag('twitter:description', fullDescription);
    updateTwitterTag('twitter:image', ogImage);
    
  }, [fullTitle, fullDescription, fullKeywords, fullCanonical, ogImage, ogType]);

  return null; // This component doesn't render anything
};

export default SEOHead;
