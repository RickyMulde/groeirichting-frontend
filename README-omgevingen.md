# Frontend Omgevingsbeheer - Test & Productie

Deze frontend ondersteunt nu zowel een testomgeving als een productieomgeving.

## Bestanden

- `.env.test` - Configuratie voor testomgeving (lokale ontwikkeling)
- `.env.production` - Configuratie voor productieomgeving (live omgeving)
- `.env` - Actieve configuratie (wordt automatisch gegenereerd)

## Gebruik

### Handmatig schakelen tussen omgevingen

```bash
# Schakel naar testomgeving
npm run env:test

# Schakel naar productieomgeving
npm run env:production
```

### Direct starten met specifieke omgeving

```bash
# Start dev server met testomgeving
npm run dev:test

# Start dev server met productieomgeving
npm run dev:production

# Build met testomgeving
npm run build:test

# Build met productieomgeving
npm run build:production
```

### Script gebruiken

```bash
# Schakel naar testomgeving
node switch-env.js test

# Schakel naar productieomgeving
node switch-env.js production

# Toon status
node switch-env.js status

# Herstel backup
node switch-env.js restore
```

## Wat gebeurt er?

1. Het script kopieert het gekozen omgevingsbestand naar `.env`
2. Vite laadt automatisch de configuratie uit `.env`
3. Alle omgevingsvariabelen zijn beschikbaar via `import.meta.env.VITE_*`

## Belangrijke omgevingsvariabelen

Zorg ervoor dat je in beide `.env` bestanden de juiste waarden hebt:

```bash
# Supabase configuratie (VERPLICHT)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API configuratie
VITE_API_BASE_URL=https://api.jouwdomein.nl

# Omgevingsidentificatie (VERPLICHT voor productie)
VITE_APP_ENV=production
```

## 🛡️ Productie Beveiliging

De frontend heeft een ingebouwde beveiliging tegen onbedoeld gebruik van de productieomgeving:

- **Verplichte bevestiging**: Je moet `VITE_APP_ENV=production` toevoegen aan `.env.production`
- **Validatie**: Het script controleert automatisch of deze bevestiging aanwezig is
- **Duidelijke feedback**: Het script toont welke omgeving actief is

## Veiligheid

- Alle `.env*` bestanden staan in `.gitignore`
- De actieve `.env` wordt automatisch gegenereerd
- Geen gevoelige gegevens worden gecommit

## ⚠️ Belangrijke opmerkingen

### Voor Vite (Frontend)
- **Herstart je dev server** na het wijzigen van omgeving
- Vite laadt omgevingsvariabelen alleen bij startup
- Gebruik `VITE_` prefix voor alle variabelen die je in de frontend wilt gebruiken

### Voor Backend
- Backend en frontend gebruiken verschillende omgevingsbestanden
- Zorg ervoor dat beide omgevingen correct zijn ingesteld
- Test altijd beide omgevingen voordat je live gaat

## Troubleshooting

Als je een foutmelding krijgt over ontbrekende omgevingsvariabelen:

1. Controleer of het omgevingsbestand bestaat
2. Controleer of alle vereiste variabelen zijn ingevuld
3. Schakel opnieuw naar de gewenste omgeving
4. **Herstart je dev server** (dit is cruciaal voor Vite!)

## Voorbeeld workflow

```bash
# 1. Schakel naar testomgeving
npm run env:test

# 2. Start dev server
npm run dev

# 3. Test je wijzigingen

# 4. Schakel naar productieomgeving
npm run env:production

# 5. Build voor productie
npm run build:production

# 6. Deploy naar je hosting
```
