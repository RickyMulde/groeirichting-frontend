
# 📘 GroeiRichting – README

GroeiRichting is een schaalbaar medewerkerportaal voor werkgevers die structureel willen werken aan mentale belasting, werkgeluk, balans, motivatie en samenwerking op de werkvloer. Het platform is ontworpen voor HR-professionals en kleinere werkgevers die behoefte hebben aan inzichten en structuur zonder zelf een traject te hoeven begeleiden.

## 🚀 Doel van het project
Een digitale tool waarmee werknemers op een toegankelijke manier thema’s rondom werkdruk, samenwerking, motivatie, en privé-omstandigheden kunnen bespreken – anoniem of op naam – met als doel:

- Beter inzicht voor werkgevers
- Lagere uitval
- Gerichtere gesprekken (bijv. functioneringsgesprekken)
- Bewuste keuzes in leiderschap en beleid

## 🏗️ Huidige MVP Functionaliteiten (onder ontwikkeling)

### ✅ Werkgever features:
- Registratie via frontend/backend
- Uitnodigen van medewerkers via e-mail
- Dashboard met uitleg, medewerkerbeheer en overzicht van gesprekken
- Thema’s aan/uit kunnen zetten per organisatie

### ✅ Werknemer features:
- Registratie via uitnodiging (token)
- Gesprekken starten op basis van thema’s
- Inzage in eigen samenvattingen (toekomstig)

### ✅ Overig:
- Backend gebouwd in Node.js
- Supabase als database + authenticatie
- Frontend in React (Cursor)
- Styling met TailwindCSS
- E-mailuitnodigingen via serverfunctie

## 🔐 Beveiliging & privacy
- Invite-only registratie
- Supabase RLS policies (in voorbereiding)
- Technische preventie van persoonsgegevens in AI-prompts (in voorbereiding)

## 🛠️ Lokale ontwikkeling
1. Clone dit project
2. Voeg `.env` toe met je Supabase URL en `anon/public` key
3. Start frontend in Cursor of met `npm run dev`
4. Start backend lokaal via `node index.js`

## 🗃️ Belangrijke mappen/bestanden
- `/src/` – Frontend (React + Tailwind)
- `/backend/` – Node.js server (API's en e-mails)
- `tech-checklist.md` – Interne ontwikkelchecklist
- `README.md` – Dit bestand

## 📆 Volgende stappen
- AI-integratie: detectie van namen & privacychecks
- Dashboard voor werkgever: datavisualisatie per thema
- Samenvatting per werknemer tonen
- Feedback loop implementeren

## 👤 Auteurs
**Rick Mulderij** – Initiatiefnemer & ontwikkelaar (Cursor / Supabase integratie)

---
Laatste update: mei 2025
