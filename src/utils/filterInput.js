import {
  functieSet,
  voornamenSet,
  achternamenSet,
  medischeSet,
  seksueleSet,
  religieuzeSet,
  politiekeSet
} from './gevoeligeData';

const patterns = {
  email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i,
  phone: /\+?\d{6,15}/,
  iban: /\bNL\d{2}[A-Z]{4}\d{10}\b/i,
  xss: /<\s*script.*?>.*?<\s*\/\s*script\s*>/gi,
  suspiciousFileLink: /(https?:\/\/)?[a-z0-9.-]+\.(exe|zip|scr|php|bat|cmd|sh)(\b|\/|$)/i,
  base64: /\b([A-Za-z0-9+\/]{40,}={0,2})\b/
};

export function containsSensitiveInfo(text) {
  const lowered = text.toLowerCase();

  for (const regex of Object.values(patterns)) {
    if (regex.test(text)) {
      return {
        flagged: true,
        reason: `Vul a.u.b. geen persoonsgegevens of andere belangrijke gegevens in.`
      };
    }
  }

  const woorden = lowered.split(/[^\w]+/);
  for (const woord of woorden) {
    if (voornamenSet.has(woord)) {
      return { flagged: true, reason: `Noem liever geen voornamen zoals "${woord}".` };
    }
    if (achternamenSet.has(woord)) {
      return { flagged: true, reason: `Noem liever geen achternamen zoals "${woord}".` };
    }
    if (medischeSet.has(woord)) {
      return { flagged: true, reason: `Vermijd medische termen zoals "${woord}".` };
    }
    if (seksueleSet.has(woord)) {
      return { flagged: true, reason: `Vermijd termen over seksuele voorkeur zoals "${woord}".` };
    }
    if (religieuzeSet.has(woord)) {
      return { flagged: true, reason: `Vermijd religieuze termen zoals "${woord}".` };
    }
    if (functieSet.has(woord)) {
      return { flagged: true, reason: `Noem liever geen functietitels zoals "${woord}".` };
    }
    if (politiekeSet.has(woord)) {
      return { flagged: true, reason: `Vermijd politieke termen zoals "${woord}".` };
    }
  }

  return { flagged: false };
}

// Sanitize input om XSS en onbedoelde HTML rendering te voorkomen
export const sanitizeInput = (input) => {
  if (!input || typeof input !== 'string') {
    return input;
  }
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Veilige HTML entity decoder (alternatief voor DOM-based decode)
export const safeDecodeHtmlEntities = (text) => {
  if (!text || typeof text !== 'string') {
    return text;
  }
  
  // Gebruik een veilige mapping in plaats van DOM manipulatie
  const entityMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/',
    '&nbsp;': ' ',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™'
  };
  
  return text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
    return entityMap[entity] || entity;
  });
};

// Praktische input validatie - alleen echte bedreigingen blokkeren
export const validateInput = (input) => {
  if (!input || typeof input !== 'string') {
    return { isValid: false, error: 'Ongeldige input' };
  }
  
  // Alleen de meest gevaarlijke patronen blokkeren
  const dangerousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,  // Alleen complete script tags
    /javascript\s*:/gi,              // JavaScript URLs
    /data\s*:\s*text\/html/gi,       // Data URLs met HTML
    /vbscript\s*:/gi                 // VBScript
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(input)) {
      return { isValid: false, error: 'Deze input bevat mogelijk schadelijke code' };
    }
  }
  
  // Redelijke lengte limiet voor gesprekken
  if (input.length > 5000) {
    return { isValid: false, error: 'Je antwoord is te lang. Houd het beknopt.' };
  }
  
  return { isValid: true };
};
