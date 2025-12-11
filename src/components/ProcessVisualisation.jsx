import { TriangleAlert, CheckCircle2, Target, TrendingUp } from 'lucide-react'

function ProcessVisualisation() {
  return (
    <div className="w-full max-w-3xl mx-auto bg-[#F8FAFC] p-6 rounded-xl">
      {/* TOP CARD - Q1: De GroeiScan */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#1A4D8C]/20 mb-4">
        <h3 className="text-lg font-semibold text-[#1A4D8C] mb-4">
          De GroeiScan (Nulmeting)
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Werkdruk & Taaklast - Alert */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 border border-[#F4A261]/30">
            <TriangleAlert className="text-[#F4A261] flex-shrink-0" size={24} />
            <div>
              <p className="text-sm font-medium text-[#1A4D8C]">Werkdruk & Taaklast</p>
              <p className="text-xs text-[#1A4D8C]">Huidige score: 4,2</p>
              <p className="text-xs text-[#F4A261]">Actie vereist</p>
            </div>
          </div>

          {/* Samenwerking & Werksfeer - Good */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-50/60 border border-[#2A9D8F]/20 opacity-60">
            <CheckCircle2 className="text-[#2A9D8F] flex-shrink-0" size={24} />
            <div>
              <p className="text-sm font-medium text-[#1A4D8C]">Samenwerking & Werksfeer</p>
              <p className="text-xs text-[#1A4D8C]">Huidige score: 7,1</p>
              <p className="text-xs text-[#2A9D8F]">Goed</p>
            </div>
          </div>

          {/* Motivatie & Werkplezier - Alert */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 border border-[#F4A261]/30">
            <TriangleAlert className="text-[#F4A261] flex-shrink-0" size={24} />
            <div>
              <p className="text-sm font-medium text-[#1A4D8C]">Motivatie & Werkplezier</p>
              <p className="text-xs text-[#1A4D8C]">Huidige score: 5,3</p>
              <p className="text-xs text-[#F4A261]">Actie vereist</p>
            </div>
          </div>

          {/* Perspectief & Ontwikkeling - Good */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-50/60 border border-[#2A9D8F]/20 opacity-60">
            <CheckCircle2 className="text-[#2A9D8F] flex-shrink-0" size={24} />
            <div>
              <p className="text-sm font-medium text-[#1A4D8C]">Perspectief & Ontwikkeling</p>
              <p className="text-xs text-[#1A4D8C]">Huidige score: 8,0</p>
              <p className="text-xs text-[#2A9D8F]">Goed</p>
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE CONNECTOR - FOCUS & ACTIE */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-0.5 h-8 bg-[#1A4D8C]/30"></div>
        <div className="bg-[#1A4D8C] text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
          <Target size={18} />
          <span className="text-sm font-semibold">FOCUS & ACTIE</span>
        </div>
        <div className="w-0.5 h-8 bg-[#1A4D8C]/30"></div>
      </div>

      {/* BOTTOM CARD - Q3: De Check */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#2A9D8F]/30">
        <h3 className="text-lg font-semibold text-[#1A4D8C] mb-4">
          De Check (Resultaat)
        </h3>
        <div className="space-y-3">
          {/* Werkdruk & Taaklast - Improved */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-50 border border-[#2A9D8F]/30">
            <TrendingUp className="text-[#2A9D8F] flex-shrink-0" size={24} />
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1A4D8C]">Werkdruk & Taaklast</p>
              <p className="text-xs text-[#2A9D8F] font-medium">Verbeterd naar 7.8</p>
            </div>
          </div>

          {/* Motivatie & Werkplezier - Improved */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-50 border border-[#2A9D8F]/30">
            <TrendingUp className="text-[#2A9D8F] flex-shrink-0" size={24} />
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1A4D8C]">Motivatie & Werkplezier</p>
              <p className="text-xs text-[#2A9D8F] font-medium">Verbeterd naar 8.1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProcessVisualisation

