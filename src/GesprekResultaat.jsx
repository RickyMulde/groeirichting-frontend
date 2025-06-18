import React from 'react'
import { useNavigate } from 'react-router-dom'

function GesprekResultaat() {
  const navigate = useNavigate()

  // Dummy data voor nu
  const themeTitle = 'Werkdruk & Taaklast'
  const samenvatting = `Tijdens dit gesprek kwam naar voren dat de medewerker structureel te veel taken op zich neemt en moeite heeft met prioriteren. Er is sprake van een hoge interne druk, gecombineerd met het gevoel niet aan verwachtingen te voldoen. De medewerker ervaart onvoldoende ruimte om nee te zeggen en mist ondersteuning in de dagelijkse werkdruk. Het gesprek was gericht op het signaleren van knelpunten.`
  const score = 4

  return (
    <div className="centered-page space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-[var(--kleur-primary)]">Samenvatting van je gesprek</h1>
        <p className="text-[var(--kleur-muted)]">Bekijk hier de resultaten van je gesprek</p>
      </div>

      <section className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Thema: {themeTitle}</h2>
          <p className="text-sm text-[var(--kleur-muted)]">
            Dit is de samenvatting van jouw eerdere gesprek, gegenereerd op basis van je antwoorden.
          </p>
        </div>

        <div className="bg-[var(--kleur-background)] border border-gray-200 rounded-lg p-4 text-gray-700 whitespace-pre-line leading-relaxed">
          {samenvatting}
        </div>

        <div className="flex items-center gap-2">
          <p className="font-semibold">Jouw score op dit thema:</p>
          <span className="text-2xl font-bold text-[var(--kleur-primary)]">{score}/10</span>
        </div>
      </section>

      <section className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Wil je deze samenvatting delen?</h2>
          <p className="text-sm text-[var(--kleur-muted)]">
            Je kunt ervoor kiezen om deze samenvatting te delen met je werkgever. 
            Je kunt dit anoniem of persoonlijk doen. Je keuze kun je later altijd aanpassen.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="btn btn-primary w-full sm:w-auto">Deel persoonlijk met werkgever</button>
          <button className="btn btn-accent w-full sm:w-auto">Deel anoniem met werkgever</button>
          <button className="btn btn-secondary w-full sm:w-auto" onClick={() => navigate('/employee-portal')}>Niet delen</button>
        </div>
      </section>
    </div>
  )
}

export default GesprekResultaat
