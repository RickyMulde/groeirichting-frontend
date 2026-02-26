import { useEffect } from 'react';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonical,
  ogImage = "https://groeirichting.nl/og-image.jpg",
  ogType = "website",
  structuredData = null // JSON-LD structured data object
}) => {
  const fullTitle = title ? `${title} | GroeiRichting` : 'Stop met brandjes blussen. Start weer met ondernemen! | GroeiRichting';
  const fullDescription = description || 'Je bedrijf groeit, maar je tijd wordt opgeslokt door brandjes blussen. Met GroeiRichting breng je bloot waar de brandhaarden zitten en krijg je hapklare oplossingen. Voor scale-up ondernemers.';
  const fullKeywords = keywords || 'scale-up ondernemer, organisatiecultuur, personeelsgedoe, DGA, brandjes blussen, medewerkerstevredenheid, verloop verzuim, GroeiRichting, HR-capaciteit';
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
    
    // Update or add structured data (JSON-LD)
    if (structuredData) {
      // Remove existing page-specific structured data scripts
      const existingPageScript = document.querySelector('script#page-structured-data');
      if (existingPageScript) {
        existingPageScript.remove();
      }
      
      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      script.id = 'page-structured-data';
      document.head.appendChild(script);
    } else {
      // Remove page-specific structured data if no new data is provided
      const existingPageScript = document.querySelector('script#page-structured-data');
      if (existingPageScript) {
        existingPageScript.remove();
      }
    }
    
  }, [fullTitle, fullDescription, fullKeywords, fullCanonical, ogImage, ogType, structuredData]);

  return null; // This component doesn't render anything
};

export default SEOHead;
