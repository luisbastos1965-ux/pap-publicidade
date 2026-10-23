'use client'

import { useState, useEffect } from 'react'
import { Search, Mic, Camera, X, LayoutGrid } from 'lucide-react'

interface GoogleSearchProps {
  onSearchSubmit: () => void;
}

// COMPONENTE EXTRA: Comprimido Flutuante Animado 3D
const FloatingPill = ({ top, left, rotate, delay, scale = "scale-100" }: { top: string, left: string, rotate: string, delay: string, scale?: string }) => (
  <div 
    className={`absolute ${top} ${left} z-0 pointer-events-none`}
    style={{ animation: `float 4s ease-in-out infinite ${delay}` }}
  >
    <div className={`w-14 h-[22px] rounded-full flex overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.15)] border border-black/5 ${rotate} ${scale}`}>
      {/* Lado Roxo */}
      <div className="w-1/2 h-full bg-[#6B23CA]"></div>
      {/* Lado Laranja */}
      <div className="w-1/2 h-full bg-[#FF7A00]"></div>
      {/* Reflexo de luz (Efeito 3D) */}
      <div className="absolute top-1 left-2 w-4 h-[5px] rounded-full bg-white/40"></div>
    </div>
  </div>
);

export function GoogleSearch({ onSearchSubmit }: GoogleSearchProps) {
  const [query, setQuery] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const placeholders = [
    "preciso de uma campanha para a farmácia",
    "como ter 20 na PAP da Profitecla?",
    "tradutor de letra de médico para português",
    "farmácias abertas de madrugada perto de mim",
    "quanto café posso beber antes da apresentação da PAP?"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (query === '' && !hasSearched) {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length)
      }
    }, 3500)
    return () => clearInterval(interval)
  }, [query, hasSearched])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() !== '') {
      setHasSearched(true)
    }
  }

  const Footer = () => (
    <footer className="w-full bg-[#f2f2f2] text-[15px] text-[#70757a] mt-auto">
      <div className="border-b border-[#dadce0] px-8 py-3">Portugal</div>
      <div className="border-b border-[#dadce0] bg-white py-2 px-8 flex justify-center">
        <img 
          src="/BarraParceiros_cores_EP26.jpg" 
          alt="Parceiros Institucionais e Financiamento" 
          className="h-10 md:h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
        />
      </div>
      <div className="flex flex-col flex-wrap justify-between px-8 py-3 md:flex-row">
        <div className="flex flex-wrap gap-6">
          <a href="#" className="hover:underline">Sobre</a>
          <a href="#" className="hover:underline">Publicidade</a>
          <a href="#" className="hover:underline">Negócios</a>
          <a href="#" className="hover:underline">Como funciona a Pesquisa</a>
        </div>
        <div className="mt-3 flex flex-wrap gap-6 md:mt-0">
          <a href="#" className="hover:underline">Privacidade</a>
          <a href="#" className="hover:underline">Termos</a>
          <a href="#" className="hover:underline">Definições</a>
        </div>
      </div>
    </footer>
  );

  // VISTA 2: PÁGINA DE RESULTADOS DE PESQUISA
  if (hasSearched) {
    return (
      <div className="flex min-h-screen flex-col bg-white font-arial">
        <header className="flex w-full items-center gap-6 p-6 pb-0 md:pl-8 md:pr-6">
          <div className="flex items-center gap-6 md:gap-10 w-full mb-4">
            <div 
              className="relative cursor-pointer flex-shrink-0 pt-1"
              onClick={() => setHasSearched(false)}
            >
              <h1 className="text-3xl font-black tracking-tighter">
                <span className="text-[#6B23CA]">G</span>
                <span className="text-[#FF7A00]">o</span>
                <span className="text-[#FF7A00]">o</span>
                <span className="text-[#6B23CA]">g</span>
                <span className="text-[#6B23CA]">l</span>
                <span className="text-[#FF7A00]">e</span>
              </h1>
            </div>

            <form onSubmit={handleSearch} className="flex-1 max-w-[690px]">
              <div className="group flex w-full items-center rounded-full border border-transparent shadow-[0_2px_5px_rgba(0,0,0,0.16)] bg-white px-4 py-2 hover:shadow-md focus-within:shadow-md transition-shadow">
                <input
                  type="text"
                  className="flex-1 bg-transparent text-base outline-none text-[#202124]"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <X 
                    size={24} 
                    strokeWidth={1.5}
                    className="text-[#70757a] cursor-pointer mr-3 border-r border-[#dadce0] pr-3 w-10 hover:text-[#202124]" 
                    onClick={() => setQuery('')} 
                  />
                )}
                <div className="flex items-center gap-4 pr-2 text-[#4285f4]">
                  <Mic size={20} className="cursor-pointer" />
                  <Camera size={20} className="cursor-pointer" />
                  <Search size={20} className="cursor-pointer ml-1 text-[#4285f4]" />
                </div>
              </div>
            </form>

            <div className="ml-auto hidden md:flex items-center gap-4">
              <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
                <LayoutGrid size={24} className="text-[#5f6368]" strokeWidth={1.5} />
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B23CA] text-white font-bold transition-transform hover:scale-110">
                P
              </button>
            </div>
          </div>
        </header>

        <div className="border-b border-[#ebebeb] w-full md:pl-[170px] px-6">
          <div className="flex gap-6 text-sm text-[#5f6368] pb-0">
            <span className="text-[#1a0dab] font-medium border-b-4 border-[#1a0dab] pb-3">Todas</span>
            <span className="cursor-pointer hover:text-[#202124] pb-3">Imagens</span>
            <span className="cursor-pointer hover:text-[#202124] pb-3">Notícias</span>
            <span className="cursor-pointer hover:text-[#202124] pb-3">Vídeos</span>
            <span className="cursor-pointer hover:text-[#202124] pb-3 hidden sm:block">Maps</span>
            <span className="cursor-pointer hover:text-[#202124] pb-3 hidden sm:block">Mais</span>
          </div>
        </div>

        <main className="flex-1 w-full px-6 md:pl-[170px] pt-4 pb-20">
          <p className="text-[13px] text-[#70757a] mb-6">Aproximadamente 12.400.000 resultados (0,32 segundos)</p>

          <div className="w-full max-w-[650px] mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div 
              onClick={onSearchSubmit}
              className="group cursor-pointer rounded-2xl border border-transparent p-5 -ml-5 transition-all hover:bg-gray-50 hover:border-[#dadce0]/50"
            >
              <div className="mb-1 flex items-center gap-3">
                <span className="font-bold text-[#202124] text-sm">Patrocinado</span>
                <span className="text-sm text-[#202124] flex items-center gap-1">
                  https://www.pharmamedia.pt <span className="text-[10px] opacity-50">▼</span>
                </span>
              </div>
              <h3 className="mb-1 text-[22px] text-[#1a0dab] group-hover:underline leading-tight">
                PharmaMedia — Agência B2B de Literacia em Saúde
              </h3>
              <p className="text-sm text-[#4d5156] leading-relaxed mt-2">
                Campanhas de saúde chave-na-mão para farmácias comunitárias. Descubra como revolucionar a comunicação no balcão e garantir o 20 na PAP. Onde o rigor clínico encontra a criatividade.
              </p>
            </div>
          </div>

          <div className="w-full max-w-[650px] mb-8 opacity-90">
            <div className="mb-1 flex items-center gap-3">
              <span className="font-bold text-[#202124] text-sm">Patrocinado</span>
              <span className="text-sm text-[#202124] flex items-center gap-1">
                https://www.marketingfarmaceutico.com <span className="text-[10px] opacity-50">▼</span>
              </span>
            </div>
            <h3 className="mb-1 text-[20px] text-[#1a0dab] hover:underline cursor-pointer leading-tight">
              Marketing para Farmácias | Soluções Digitais XPTO
            </h3>
            <p className="text-sm text-[#4d5156] leading-relaxed mt-1">
              Ajudamos a sua farmácia a vender mais com gestão de redes sociais e anúncios online. Fale com os nossos especialistas e peça já o seu orçamento sem compromisso.
            </p>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  // VISTA 1: PÁGINA INICIAL DO GOOGLE
  return (
    <div className="flex min-h-screen flex-col bg-white font-arial">
      
      {/* CSS injetado para a animação de flutuação */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}} />

      <header className="flex w-full items-center justify-end gap-4 p-4 text-sm text-[#4d5156]">
        <a href="#" className="hover:underline">Gmail</a>
        <a href="#" className="hover:underline">Imagens</a>
        <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
          <LayoutGrid size={24} className="text-[#5f6368]" strokeWidth={1.5} />
        </div>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B23CA] text-white font-bold transition-transform hover:scale-110">
          P
        </button>
      </header>

      <main className="flex w-full flex-1 flex-col items-center pt-20 px-5">
        
        {/* Logótipo Grande com os Comprimidos */}
        <div className="mb-8 flex justify-center">
          <div className="relative inline-block px-10 py-6">
            
            <h1 className="text-[5.5rem] font-black tracking-tighter relative z-10">
              <span className="text-[#6B23CA]">G</span>
              <span className="text-[#FF7A00]">o</span>
              <span className="text-[#FF7A00]">o</span>
              <span className="text-[#6B23CA]">g</span>
              <span className="text-[#6B23CA]">l</span>
              <span className="text-[#FF7A00]">e</span>
            </h1>
            
            {/* Os 4 Comprimidos Originais Flutuantes */}
            <FloatingPill top="-top-4" left="-left-4" rotate="-rotate-[25deg]" delay="0s" />
            <FloatingPill top="-top-8" left="left-[45%]" rotate="-rotate-[12deg]" delay="1.5s" scale="scale-75" />
            <FloatingPill top="top-2" left="-right-6" rotate="-rotate-[35deg]" delay="0.8s" />
            <FloatingPill top="bottom-2" left="left-2" rotate="rotate-[20deg]" delay="2.3s" scale="scale-90" />
            
          </div>
        </div>

        <form onSubmit={handleSearch} className="w-full max-w-[580px]">
          <div className="group flex w-full items-center rounded-full border border-[#dfe1e5] bg-white px-4 py-3 hover:shadow-md focus-within:shadow-md transition-shadow">
            <Search size={20} className="text-[#9aa0a6] mr-3" />
            <input
              type="text"
              className="flex-1 bg-transparent text-base outline-none transition-all duration-500 placeholder:text-gray-400 text-[#202124]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={query === '' ? placeholders[placeholderIndex] : ''}
              autoFocus
            />
            <div className="flex items-center gap-4 pr-2">
              <Mic size={20} className="text-[#4285f4] cursor-pointer" />
              <Camera size={20} className="text-[#ea4335] cursor-pointer" />
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <button 
              type="submit" 
              className="rounded bg-[#f8f9fa] px-4 py-2.5 text-sm text-[#3c4043] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm"
            >
              Pesquisa Google
            </button>
            <button 
              type="button" 
              className="rounded bg-[#f8f9fa] px-4 py-2.5 text-sm text-[#3c4043] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm"
            >
              Estou com sorte
            </button>
          </div>
        </form>

      </main>

      <Footer />

    </div>
  )
}