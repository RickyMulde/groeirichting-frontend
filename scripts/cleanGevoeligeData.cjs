const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'utils', 'gevoeligeData.js');
const data = fs.readFileSync(filePath, 'utf8');

function extractSet(name) {
  const regex = new RegExp(`export const ${name} = new Set\\((\\[[\\s\\S]*?\\])\\);`);
  const match = data.match(regex);
  if (!match) throw new Error('Set '+name+' not found');
  const arrStr = match[1];
  const entries = [];
  const regexEntries = /'([^']*)'/g;
  let m;
  while ((m = regexEntries.exec(arrStr)) !== null) {
    entries.push(m[1]);
  }
  return entries;
}

const forbidden = new Set([
  'aan',
  'aangezien',
  'aanlokkelijk',
  'aantekeningen',
  'afgelopen',
  'alleen',
  'alles',
  'basis',
  'beginnend',
  'belangstelling',
  'bekende',
  'bekijk',
  'zoek',
  'amsterdam',
  'rotterdam',
  'utrecht',
  'groningen',
  'den haag',
  'apeldoorn'
]);

function clean(list) {
  const result = [];
  const seen = new Set();
  for (let item of list) {
    item = item.toLowerCase();
    if (forbidden.has(item)) continue;
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }
  return result;
}

const voornamen = extractSet('voornamenSet');
const achternamen = extractSet('achternamenSet');

const cleanedVoornamen = clean(voornamen);
const cleanedAchternamen = clean(achternamen);

const tailIndex = data.indexOf('export const medischeSet');
const tail = data.slice(tailIndex);

function stringifyArray(arr) {
  return '[\n  ' + arr.map(v => `'${v}'`).join(',\n  ') + '\n]';
}

const output = `// 📁 Gevoelige data voor filtering (frontend)\nexport const voornamenSet = new Set(${stringifyArray(cleanedVoornamen)});\nexport const achternamenSet = new Set(${stringifyArray(cleanedAchternamen)});\n${tail}`;

fs.writeFileSync(filePath, output);
