
# ✅ Technische Checklist – GroeiRichting (MVP)

## 🔐 Authenticatie & Rollenbeheer (Supabase)
- [x] Supabase-project aangemaakt
- [x] Tabellen: users, employers, employees, invitations, conversations
- [x] Rollenbeheer: employee, employer, admin
- [x] Invite-only registratieflow werknemer
- [ ] Supabase RLS-policies correct ingericht
- [ ] Accountbeveiliging (rate limiting, brute force preventie)

## 📥 Registratie & Inlogflows
- [x] Werkgeverregistratie backend + frontend
- [x] Werknemerregistratie via e-mailuitnodiging
- [x] Tokenverwerking bij werknemerregistratie
- [x] Automatische doorsturing naar juiste portaal
- [ ] Flow voor vergeten wachtwoord (optioneel)
- [ ] Validatie en foutafhandeling e-mailduplicatie

## 🧭 Front-end Structuur (Cursor / Tailwind)
- [x] `globals.css` met kleurenschema en typografie
- [x] Navigatiestructuur portalen werknemer/werkgever
- [x] Responsive layout met max-w-[700px]
- [ ] Responsieve tabellen
- [ ] Tooltipcomponent (hover/tap)
- [ ] Employer dashboard UI (startpagina + medewerkers)
- [ ] Employee dashboard UI (gesprekken + overzicht)
- [ ] Start gesprek component
- [ ] Instellingen werknemer
- [ ] Instellingen werkgever (thema’s aan/uit)

## 📩 E-mailfunctionaliteit
- [x] Uitnodiging werknemer e-mail
- [ ] Bevestiging na registratie
- [ ] E-mailnotificaties (bij updates)
- [ ] Logging e-mailverzending

## 🧠 AI-interactie (voorbereiding)
- [ ] Prompt check op gevoelige info in backend
- [ ] Naamdetectie / compromise filter
- [ ] Blokkering + uitleg bij PII-detectie
- [ ] Audit log (tijdstip, onderwerp, status verzending)

## 🗃️ Gespreksbeheer
- [x] Gesprekken opslaan in Supabase
- [ ] Samenvattingen zichtbaar maken voor werknemer
- [ ] Knop ‘start nieuw gesprek’ werknemer
- [ ] Thema’s dynamisch ophalen uit werkgeversinstellingen
- [ ] Employer dashboard: overzicht gesprekken

## ⚙️ Instellingen & configuratie
- [ ] Thema’s aan/uit per werkgever
- [ ] Employer-specifieke voorkeuren instelbaar
- [ ] Exportoptie voor gesprekken (CSV / PDF)
- [ ] Instellingen werknemer (bijv. e-mail aanpassen)

## 📊 Voorbereiding dashboards
- [ ] Datamodel geschikt maken voor analyse
- [ ] Backend endpoints voor rapportage
- [ ] Voorbereiding datavisualisatie (Recharts etc.)
- [ ] Voorbereiding op AI-samenvattingen/sentiment

## 🌐 Deployment & omgeving
- [x] Setup frontend/backend in Cursor en VSC
- [x] Supabase keys in .env gezet
- [ ] Continuous deployment pipeline (Render etc.)
- [ ] Testomgeving vs productie splitsen
- [ ] Domein koppelen bij livegang

## 📚 Documentatie & onderhoud
- [ ] README met setupinstructies
- [ ] Uitleg endpoints en dataflows
- [ ] Acceptatietest MVP
- [ ] Document: uitbreidingsopties & roadmap
