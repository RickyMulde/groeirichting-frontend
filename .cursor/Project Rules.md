# Project Rules voor GroeiRichting

## 🎨 Styling & Layout
- Gebruik TailwindCSS met classes uit globals.css voor alle styling
- Gebruik het kleurenschema gebaseerd op --kleur-primary, --kleur-accent, etc.
- Gebruik geen inline styles, tenzij uitdrukkelijk nodig
- Zorg dat alle componenten mobielvriendelijk zijn via responsive Tailwind-classes

## 🧱 Structuur & Componenten
- Gebruik functionele React-componenten met export default
- Nieuwe pagina's worden aangemaakt als aparte componenten en via App.jsx gekoppeld via React Router
- Gebruik duidelijke bestandsstructuur: pagina's in /src, API-calls in /api (backend)

## 🔐 Authenticatie & Database
- Gebruik Supabase als primaire backend voor dataopslag én authenticatie
- Supabase-client staat in supabaseClient.js en maakt gebruik van .env-variabelen:
  - SUPABASE_URL
  - SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY (alleen backend)

## 🛠️ Backend (extern, via Express op Render)
- Backend draait los van frontend, via Node.js + Express op Render
- Endpoints beginnen met `/api/` (bijv. `/api/register-employee`)
- Backend gebruikt environment variables uit `.env` (niet zichtbaar in frontend door .gitignore)

## ✉️ E-mail
- Gebruik Resend voor e-mailuitnodigingen (via backend)
- API-key wordt opgehaald uit RESEND_API_KEY in .env
- E-mails worden verzonden vanuit `noreply@groeirichting.nl`

## 📦 Deployment & Routing
- Frontend draait via Render (niet Netlify). Gebruik geen _redirects bestand
- Voor redirect logica na login (bijv. rolgebaseerd) gebruik je PostLoginRedirect.jsx

## 🧪 Formulieren
- Gebruik controlled inputs en voorkom refresh met `e.preventDefault()` in submit handlers

## 🧾 Algemene afspraken
- Werk semantisch (form, header, section)
- Gebruik alleen iconen uit Lucide
- Gebruik standaardklasse `btn`, `btn-primary`, `btn-accent` etc. voor knoppen 