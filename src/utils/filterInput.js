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
  // Verfijnde telefoon regex
  phoneMobile: /(?:\+31|0)\s*6(?:[\s-]?\d){8}\b/,
  phoneLandline: /(?:\+31|0)\s*\d(?:[\s-]?\d){8,9}\b/,
  // Generieke IBAN regex
  iban: /\b[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}\b/i,
  // BSN met elfproef
  bsn: /\b\d{9}\b/,
  // Geboortedata patronen
  birthDate: /\b(0?[1-9]|[12]\d|3[01])[-/](0?[1-9]|1[0-2])[-/](19|20)\d{2}\b/,
  xss: /<\s*script.*?>.*?<\s*\/\s*script\s*>/gi,
  suspiciousFileLink: /(https?:\/\/)?[a-z0-9.-]+\.(exe|zip|scr|php|bat|cmd|sh)(\b|\/|$)/i,
  base64: /\b([A-Za-z0-9+\/]{40,}={0,2})\b/
};

// Helper functies
function validateBSN(bsn) {
  if (bsn.length !== 9) return false;
  
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += parseInt(bsn[i]) * (9 - i);
  }
  const remainder = sum % 11;
  const checkDigit = remainder < 2 ? remainder : 11 - remainder;
  
  return checkDigit === parseInt(bsn[8]);
}

function validateIBAN(iban) {
  // Eenvoudige IBAN validatie voor frontend (zonder externe library)
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}([A-Z0-9]?){0,16}$/i.test(iban)) {
    return false;
  }
  
  // Basis checksum validatie
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (char) => char.charCodeAt(0) - 55);
  
  let remainder = 0;
  for (let i = 0; i < numeric.length; i++) {
    remainder = (remainder * 10 + parseInt(numeric[i])) % 97;
  }
  
  return remainder === 1;
}

function maskSensitiveData(text) {
  let maskedText = text;
  let maskCounter = { email: 0, phone: 0, iban: 0, name: 0, bsn: 0, birthdate: 0 };
  
  // E-mail maskeren
  maskedText = maskedText.replace(patterns.email, (match) => {
    maskCounter.email++;
    return `[EMAIL_${maskCounter.email}]`;
  });
  
  // Telefoon maskeren
  maskedText = maskedText.replace(patterns.phoneMobile, (match) => {
    maskCounter.phone++;
    return `[TEL_${maskCounter.phone}]`;
  });
  maskedText = maskedText.replace(patterns.phoneLandline, (match) => {
    maskCounter.phone++;
    return `[TEL_${maskCounter.phone}]`;
  });
  
  // IBAN maskeren (alleen als geldig)
  maskedText = maskedText.replace(patterns.iban, (match) => {
    if (validateIBAN(match)) {
      maskCounter.iban++;
      return `[IBAN_${maskCounter.iban}]`;
    }
    return match; // Laat ongeldige IBAN staan
  });
  
  // BSN maskeren (alleen als geldig)
  maskedText = maskedText.replace(patterns.bsn, (match) => {
    if (validateBSN(match)) {
      maskCounter.bsn++;
      return `[BSN_${maskCounter.bsn}]`;
    }
    return match; // Laat ongeldige BSN staan
  });
  
  // Geboortedata maskeren
  maskedText = maskedText.replace(patterns.birthDate, (match) => {
    maskCounter.birthdate++;
    return `[GEBOORTEDATUM_${maskCounter.birthdate}]`;
  });
  
  return { maskedText, maskCounter };
}

export function containsSensitiveInfo(text) {
  const lowered = text.toLowerCase();

  // Unicode-bewust tokeniseren
  const woorden = lowered.split(/[^\p{L}\p{N}_]+/u);

  // Context-guards voor politieke termen
  const hasNumberBeforeVolt = /\b\d+\s*volt\b/i.test(text);
  
  // Naam detectie met context
  const namePatterns = [
    /\bik\s+heet\b/i,
    /\bmijn\s+naam\s+is\b/i,
    /\bik\s+ben\b/i
  ];
  const hasNameContext = namePatterns.some(pattern => pattern.test(text));
  
  // Twee opeenvolgende naam-tokens detectie
  let consecutiveNames = 0;
  let hasConsecutiveNames = false;
  
  for (let i = 0; i < woorden.length - 1; i++) {
    const currentWord = woorden[i];
    const nextWord = woorden[i + 1];
    
    if (voornamenSet.has(currentWord) && achternamenSet.has(nextWord)) {
      consecutiveNames++;
      if (consecutiveNames >= 1) {
        hasConsecutiveNames = true;
        break;
      }
    } else if (voornamenSet.has(currentWord) || achternamenSet.has(nextWord)) {
      consecutiveNames = 0; // Reset counter
    }
  }

  // Soft-block: maskeren i.p.v. blokkeren
  const { maskedText, maskCounter } = maskSensitiveData(text);
  const hasMaskedData = Object.values(maskCounter).some(count => count > 0);
  
  // Regex-patterns controleren (zonder IBAN/BSN - die worden al gemaskeerd)
  const criticalPatterns = {
    xss: patterns.xss,
    suspiciousFileLink: patterns.suspiciousFileLink,
    base64: patterns.base64
  };
  
  for (const [type, regex] of Object.entries(criticalPatterns)) {
    if (regex.test(text)) {
      return {
        flagged: true,
        reason: `Vul a.u.b. geen persoonsgegevens of belangrijke gegevens in.`
      };
    }
  }

  // Woordenlijst-checks met context-guards
  for (const woord of woorden) {
    if (voornamenSet.has(woord) && (hasNameContext || hasConsecutiveNames)) {
      return { 
        flagged: true, 
        reason: `Noem liever geen voornamen zoals "${woord}".`,
        maskedText: hasMaskedData ? maskedText : undefined
      };
    }
    if (achternamenSet.has(woord) && (hasNameContext || hasConsecutiveNames)) {
      return { 
        flagged: true, 
        reason: `Noem liever geen achternamen zoals "${woord}".`,
        maskedText: hasMaskedData ? maskedText : undefined
      };
    }
    if (medischeSet.has(woord)) {
      return { 
        flagged: true, 
        reason: `Vermijd medische termen zoals "${woord}".`,
        maskedText: hasMaskedData ? maskedText : undefined
      };
    }
    if (seksueleSet.has(woord)) {
      return { 
        flagged: true, 
        reason: `Vermijd termen over seksuele voorkeur zoals "${woord}".`,
        maskedText: hasMaskedData ? maskedText : undefined
      };
    }
    if (religieuzeSet.has(woord)) {
      return { 
        flagged: true, 
        reason: `Vermijd religieuze termen zoals "${woord}".`,
        maskedText: hasMaskedData ? maskedText : undefined
      };
    }
    if (functieSet.has(woord)) {
      return { 
        flagged: true, 
        reason: `Noem liever geen functietitels zoals "${woord}".`,
        maskedText: hasMaskedData ? maskedText : undefined
      };
    }
    if (politiekeSet.has(woord) && !hasNumberBeforeVolt) {
      return { 
        flagged: true, 
        reason: `Vermijd politieke termen zoals "${woord}".`,
        maskedText: hasMaskedData ? maskedText : undefined
      };
    }
  }

  // Als er data is gemaskeerd, toon melding maar blokkeer niet
  if (hasMaskedData) {
    return {
      flagged: false,
      maskedText: maskedText,
      message: "We hebben gevoelige gegevens verborgen."
    };
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
