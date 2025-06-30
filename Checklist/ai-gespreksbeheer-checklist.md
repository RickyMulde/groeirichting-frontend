# 🧠 GroeiRichting – Thema- en AI/Conversatiebeheer Checklist

Een complete en chronologisch verantwoorde checklist voor het ontwikkelen van het themabeheer, AI-interactie en gespreksbeheer in GroeiRichting. Gericht op schaalbaarheid, flexibiliteit en beheer voor superadmin, werkgevers en werknemers.

---

## 🧩 Thema-strategie & superadmin-flexibiliteit

### ✅ Centrale `themes`-structuur via superadmin
- [ ] Thema's kunnen toegevoegd/verwijderd worden via superadmin-portaal
- [ ] Thema's hebben metadata zoals: naam, beschrijving, verplicht_standaard, zichtbaar_in_portaal, betaalde_optie
- [ ] Superadmin kan thema's instellen als:
  - ✔ standaard actief voor alle werkgevers
  - ✔ zichtbaar maar niet actief (voor upsell)
  - ✔ verplicht bij activering
- [ ] Superadmin kan per thema kiezen:
  - ✔ zichtbaar maken voor alle werkgevers
  - ✔ zichtbaar maken voor specifieke werkgevers
  - ✔ activeren of deactiveren bij alle of specifieke werkgevers

### ✅ Employer-thema instellingen
- [ ] Werkgever kan in eigen portaal:
  - ✔ Thema activeren/deactiveren
  - ✔ Thema zichtbaar of onzichtbaar maken voor werknemers
  - ✔ Thema markeren als verplicht of optioneel
- [ ] Thema's worden alleen getoond aan werknemers als:
  - ✔ actief = true
  - ✔ zichtbaar = true (in `employer_themes`)

### ✅ Upsell-logica
- [ ] Thema's met `betaalde_optie = true` worden getoond met "Upgrade vereist"
- [ ] Superadmin kan thema's markeren als premium
- [ ] Employers kunnen deze thema's aanvragen of activeren via upsell-flow (toekomstig)

---

## ✅ Volledige Checklist op Logische Volgorde

### 🔹 FASE 0 – Superadmin & themabeheer
1. ✔ Bouw superadmin-portaal (afgeschermd)
2. ✔ `themes`-tabel maken met juiste kolommen
3. [ ] `employer_themes`-koppeltabel maken
4. ✔ Functionaliteit: thema toevoegen, verwijderen, zichtbaar maken (globaal/specifiek)
5. ✔ Functionaliteit: thema activeren voor specifieke werkgevers
6. ✔ Functionaliteit: premium-thema's met betaallogica markeren

### 🔹 FASE 1 – Werkgeveromgeving
7. [ ] Thema-overzicht tonen in dashboard werkgever
8. [ ] Werkgever kan instellen:
    - [ ] Actief / inactief
    - [ ] Verplicht / optioneel
    - [ ] Zichtbaar / onzichtbaar
9. [ ] Thema-configuratie opslaan in `employer_themes`

### 🔹 FASE 2 – Werknemeromgeving & AI-flow
10. [ ] Dynamisch thema-overzicht tonen (gefilterd op zichtbaar + actief)
11. [ ] Gesprek starten vanuit geselecteerd thema
12. [ ] Keuzemenu: wat mag de werkgever zien (score, samenvatting, volledig)
13. [ ] Prompt check: detecteer PII vóór verzending
14. [ ] Blokkering + feedback tonen bij detectie
15. [ ] Audit log genereren (tijd, thema, status, actie)
16. [ ] Gesprek opslaan in `antwoordpervraag` met metadata

### 🔹 FASE 3 – AI en uitbreidingen
17. [ ] AI-samenvatting genereren via GPT
18. [ ] Samenvatting tonen aan werknemer
19. [ ] Sentimentanalyse toevoegen (optioneel)
20. [ ] Versiebeheer bij heropeningen
21. [ ] Draft-mode / concept opslaan
22. [ ] Uploads via Supabase Storage
23. [ ] OCR + PII-scan op uploads (optioneel)
24. [ ] Exportopties: PDF / CSV per gesprek
