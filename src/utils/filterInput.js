import {
  functieSet,
  voornamenSet,
  achternamenSet,
  medischeSet,
  seksueleSet,
  religieuzeSet,
  politiekeSet
} from './gevoeligeData';

console.log("Eerste 20 voornamen:", Array.from(voornamenSet).slice(0, 20));
console.log("Bevat 'rick'?", voornamenSet.has("rick"));
console.log("Bevat 'john'?", voornamenSet.has("john"));
console.log("Aantal voornamen:", voornamenSet.size);

const patterns = {
  email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i,
  phone: /\+?\d{6,15}/,
  iban: /\bNL\d{2}[A-Z]{4}\d{10}\b/i,
};

export function containsSensitiveInfo(text) {
  const lowered = text.toLowerCase();

  // Check voor regex patterns (email, telefoon, IBAN)
  for (const [type, regex] of Object.entries(patterns)) {
    if (regex.test(text)) {
      return { flagged: true, reason: `Vul a.u.b. geen ${type} in.` };
    }
  }

  // Check voor gevoelige woorden in de tekst
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

  // Tijdelijk uitgeschakeld tot compromise is geïnstalleerd
  // const doc = nlp(text);
  // const names = doc.people().out('array');
  // if (names.length > 0) {
  //   console.log("Compromise naam gedetecteerd:", names[0]);
  //   return { flagged: true, reason: `Naam gedetecteerd: "${names[0]}"` };
  // }

  return { flagged: false };
}