import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonical,
  ogImage = "https://groeirichting.nl/og-image.jpg",
  ogType = "website"
}) => {
  const fullTitle = title ? `${title} | GroeiRichting` : 'GroeiRichting - AI-Gestuurde Gesprekken voor Werkgevers en Werknemers';
  const fullDescription = description || 'Ontdek hoe AI-gestuurde gesprekken werkgevers en werknemers helpen groeien. Professionele gespreksvoering met kunstmatige intelligentie voor betere werkrelaties.';
  const fullKeywords = keywords || 'AI gesprekken, werkgever werknemer, kunstmatige intelligentie, gespreksvoering, groei, ontwikkeling, HR, personeel';
  const fullCanonical = canonical || 'https://groeirichting.nl/';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEOHead;
