'use client'

import { useState, useEffect } from 'react'
import { Search, Mic, Camera, X, LayoutGrid, Keyboard, Sparkles } from 'lucide-react'

interface GoogleSearchProps {
  onSearchSubmit: () => void;
}

const FloatingPill = ({ top, left, rotate, delay, scale = "scale-100" }: { top: string, left: string, rotate: string, delay: string, scale?: string }) => (
  <div 
    className={`absolute ${top} ${left} z-0 pointer-events-none drop-shadow-xl`}
    style={{ animation: `float 5s ease-in-out infinite ${delay}` }}
  >
    <div className={`relative w-[72px] h-[28px] rounded-full flex overflow-hidden shadow-[inset_0_-4px_6px_rgba(0,0,0,0.25)] border border-black/5 ${rotate} ${scale}`}>
      <div className="w-1/2 h-full bg-gradient-to-b from-[#873bea] via-[#6B23CA] to-[#45118a]"></div>
      <div className="w-1/2 h-full bg-gradient-to-b from-[#ffa34d] via-[#FF7A00] to-[#cc6200]"></div>
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/10 -translate-x-1/2"></div>
      <div className="absolute top-1 left-[10%] right-[10%] h-[6px] rounded-full bg-gradient-to-b from-white/70 to-transparent blur-[0.5px]"></div>
    </div>
  </div>
);

export function GoogleSearch({ onSearchSubmit }: GoogleSearchProps) {
  const [query, setQuery] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  
  // NOVO: Estado e função para a transição Premium
  const [isNavigating, setIsNavigating] = useState(false)

  const handleNavigation = () => {
    setIsNavigating(true)
    setTimeout(() => {
      onSearchSubmit()
    }, 2400) // Dá tempo para a animação brilhar antes de mudar de página
  }
  
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

  // VISTA 2: PÁGINA DE RESULTADOS DE PESQUISA (SERP)
  if (hasSearched) {
    return (
      <div className="flex min-h-screen flex-col bg-white font-arial relative">
        <header className="flex w-full items-center gap-6 p-6 pb-0 md:pl-8 md:pr-6">
          <div className="flex items-center gap-6 md:gap-10 w-full mb-4">
            <div 
              className="relative cursor-pointer flex-shrink-0 pt-1"
              onClick={() => setHasSearched(false)}
            >
              <h1 className="text-3xl font-black tracking-[-0.05em] select-none" style={{ fontFamily: 'Product Sans, Arial, sans-serif' }}>
                <span className="bg-gradient-to-b from-[#873bea] to-[#6B23CA] bg-clip-text text-transparent">G</span>
                <span className="bg-gradient-to-b from-[#ffa34d] to-[#FF7A00] bg-clip-text text-transparent">o</span>
                <span className="bg-gradient-to-b from-[#ffa34d] to-[#FF7A00] bg-clip-text text-transparent">o</span>
                <span className="bg-gradient-to-b from-[#873bea] to-[#6B23CA] bg-clip-text text-transparent">g</span>
                <span className="bg-gradient-to-b from-[#873bea] to-[#6B23CA] bg-clip-text text-transparent">l</span>
                <span className="bg-gradient-to-b from-[#ffa34d] to-[#FF7A00] bg-clip-text text-transparent">e</span>
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
                <div className="flex items-center gap-4 pr-2">
                  <Keyboard size={20} className="text-[#5f6368] cursor-pointer hover:text-[#202124]" />
                  <Mic size={20} className="text-[#5f6368] cursor-pointer hover:text-[#202124]" />
                  <Camera size={20} className="text-[#5f6368] cursor-pointer hover:text-[#202124]" />
                  <Search size={20} className="text-[#5f6368] cursor-pointer ml-1 hover:text-[#202124]" />
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

          {/* RESULTADO 1: PharmaMedia (Com a nova função handleNavigation) */}
          <div className="w-full max-w-[650px] mb-6">
            <div 
              onClick={handleNavigation}
              className="group cursor-pointer rounded-2xl border border-transparent transition-all hover:bg-gray-50 hover:border-[#dadce0]/50 relative z-10"
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

          {/* RESULTADO 2: Concorrente Falso */}
          <div className="w-full max-w-[650px] mb-6 opacity-90">
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

          {/* RESULTADO 3: Ordem dos Farmacêuticos */}
          <div className="w-full max-w-[650px] mb-6">
            <div className="mb-1 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#f1f3f4] flex items-center justify-center text-xs font-bold text-[#202124]">OF</div>
              <div className="flex flex-col">
                <span className="text-[14px] text-[#202124] leading-tight">Ordem dos Farmacêuticos</span>
                <span className="text-[12px] text-[#4d5156] leading-tight flex items-center gap-1">https://www.ordemdosfarmaceuticos.pt <span className="text-[10px] opacity-50">▼</span></span>
              </div>
            </div>
            <h3 className="mb-1 text-[20px] text-[#1a0dab] hover:underline cursor-pointer leading-tight mt-1">
              A importância da Literacia em Saúde na Farmácia Comunitária
            </h3>
            <p className="text-sm text-[#4d5156] leading-relaxed mt-1">
              A farmácia comunitária desempenha um papel fundamental na promoção da literacia em saúde, ajudando os utentes a tomar decisões informadas sobre a sua saúde e terapêutica...
            </p>
          </div>

          {/* RESULTADO 4: Wikipédia */}
          <div className="w-full max-w-[650px] mb-6">
            <div className="mb-1 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#f1f3f4] flex items-center justify-center font-serif font-bold text-[#202124]">W</div>
              <div className="flex flex-col">
                <span className="text-[14px] text-[#202124] leading-tight">Wikipédia</span>
                <span className="text-[12px] text-[#4d5156] leading-tight flex items-center gap-1">https://pt.wikipedia.org › wiki › Literacia_em_saúde <span className="text-[10px] opacity-50">▼</span></span>
              </div>
            </div>
            <h3 className="mb-1 text-[20px] text-[#1a0dab] hover:underline cursor-pointer leading-tight mt-1">
              Literacia em saúde – Wikipédia, a enciclopédia livre
            </h3>
            <p className="text-sm text-[#4d5156] leading-relaxed mt-1">
              Literacia em saúde (ou alfabetização em saúde) é a capacidade de obter, processar e compreender informações de saúde e serviços básicos necessários para...
            </p>
          </div>

          {/* RESULTADO 5: Portal Nacional de Saúde */}
          <div className="w-full max-w-[650px] mb-6">
            <div className="mb-1 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#f1f3f4] flex items-center justify-center text-[10px] font-bold text-[#202124]">SNS</div>
              <div className="flex flex-col">
                <span className="text-[14px] text-[#202124] leading-tight">Portal Nacional de Saúde</span>
                <span className="text-[12px] text-[#4d5156] leading-tight flex items-center gap-1">https://www.sns.gov.pt › literacia-em-saude <span className="text-[10px] opacity-50">▼</span></span>
              </div>
            </div>
            <h3 className="mb-1 text-[20px] text-[#1a0dab] hover:underline cursor-pointer leading-tight mt-1">
              Estudo: O impacto da Literacia em Saúde em Portugal
            </h3>
            <p className="text-sm text-[#4d5156] leading-relaxed mt-1">
              O relatório anual demonstra que utentes informados têm maior adesão à terapêutica. A aposta em comunicação clara e campanhas visuais nas farmácias é a prioridade.
            </p>
          </div>

          {/* RESULTADO 6: Revista NetFarma */}
          <div className="w-full max-w-[650px] mb-6">
            <div className="mb-1 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#f1f3f4] flex items-center justify-center text-[11px] font-bold text-[#202124]">NF</div>
              <div className="flex flex-col">
                <span className="text-[14px] text-[#202124] leading-tight">NetFarma</span>
                <span className="text-[12px] text-[#4d5156] leading-tight flex items-center gap-1">https://www.netfarma.pt › gestao-e-marketing <span className="text-[10px] opacity-50">▼</span></span>
              </div>
            </div>
            <h3 className="mb-1 text-[20px] text-[#1a0dab] hover:underline cursor-pointer leading-tight mt-1">
              Como a comunicação visual transforma o balcão da farmácia
            </h3>
            <p className="text-sm text-[#4d5156] leading-relaxed mt-1">
              Especialistas afirmam que investir em campanhas de marketing estruturadas não só fideliza os clientes, como otimiza o tempo de atendimento da equipa técnica.
            </p>
          </div>
        </main>
        
        <Footer />

        {/* OVERLAY DE TRANSIÇÃO CINEMATOGRÁFICA */}
        {isNavigating && (
          <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d041a] overflow-hidden animate-in fade-in duration-500">
             <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_#6B23CA_0%,_transparent_70%)] scale-150 animate-pulse"></div>
             
             <div className="relative z-10 flex flex-col items-center">
               {/* Aumento da margem inferior (mb-12) para respirar */}
               <div className="mb-12 scale-[2]">
                 <FloatingPill top="relative" left="0" rotate="rotate-0" delay="0s" />
               </div>
               
               {/* Texto maior e com mais destaque */}
               <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 animate-in slide-in-from-bottom-4 duration-700 delay-200">
                 Pharma<span className="text-[#FF7A00]">Media</span>
               </h2>
               
               {/* Corrigido o contraste: passou para Laranja com brilho */}
               <p className="text-[#FF7A00] font-bold uppercase tracking-[0.3em] text-sm md:text-base mb-14 animate-in fade-in duration-1000 delay-300 drop-shadow-md">
                 A processar diagnóstico de mercado...
               </p>

               {/* Barra de Loading com efeito Glow/Neon */}
               <div className="w-72 h-1.5 bg-white/10 rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,122,0,0.15)] relative">
                 <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF7A00] via-[#FFA726] to-[#FF7A00] animate-[loading_2s_ease-in-out_forwards] shadow-[0_0_15px_#FF7A00]"></div>
               </div>
             </div>
             
             <style dangerouslySetInnerHTML={{__html: `
               @keyframes loading {
                 0% { width: 0%; }
                 100% { width: 100%; }
               }
             `}} />
          </div>
        )}
      </div>
    )
  }

  // VISTA 1: PÁGINA INICIAL DO GOOGLE
  return (
    <div className="flex min-h-screen flex-col bg-white font-arial">
      
      {/* CSS injetado numa única linha para não quebrar no VS Code */}
      <style dangerouslySetInnerHTML={{ __html: "@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }" }} />

      <header className="flex w-full items-center justify-between p-4 text-sm text-[#4d5156]">
        <div className="flex items-center gap-4">
          <a href="#" className="hover:underline">Sobre</a>
          <a href="#" className="hover:underline">Google Store</a>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="#" className="hover:underline">Gmail</a>
          <a href="#" className="hover:underline">Imagens</a>
          <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <LayoutGrid size={24} className="text-[#5f6368]" strokeWidth={1.5} />
          </div>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B23CA] text-white font-bold transition-transform hover:scale-110">
            P
          </button>
        </div>
      </header>

      <main className="flex w-full flex-1 flex-col items-center pt-20 px-5">
        
        <div className="mb-8 flex justify-center">
          <div className="relative inline-block px-10 py-6">
            
            <h1 className="text-[6rem] font-black tracking-[-0.05em] relative z-10 drop-shadow-sm select-none" style={{ fontFamily: 'Product Sans, Arial, sans-serif' }}>
              <span className="bg-gradient-to-b from-[#873bea] to-[#6B23CA] bg-clip-text text-transparent">G</span>
              <span className="bg-gradient-to-b from-[#ffa34d] to-[#FF7A00] bg-clip-text text-transparent">o</span>
              <span className="bg-gradient-to-b from-[#ffa34d] to-[#FF7A00] bg-clip-text text-transparent">o</span>
              <span className="bg-gradient-to-b from-[#873bea] to-[#6B23CA] bg-clip-text text-transparent">g</span>
              <span className="bg-gradient-to-b from-[#873bea] to-[#6B23CA] bg-clip-text text-transparent">l</span>
              <span className="bg-gradient-to-b from-[#ffa34d] to-[#FF7A00] bg-clip-text text-transparent">e</span>
            </h1>
            
            <FloatingPill top="-top-4" left="-left-6" rotate="-rotate-[25deg]" delay="0s" />
            <FloatingPill top="-top-12" left="left-[45%]" rotate="-rotate-[12deg]" delay="1.5s" scale="scale-75" />
            <FloatingPill top="top-2" left="-right-10" rotate="-rotate-[35deg]" delay="0.8s" />
            <FloatingPill top="bottom-1" left="left-2" rotate="rotate-[20deg]" delay="2.3s" scale="scale-90" />
            
          </div>
        </div>

        <form onSubmit={handleSearch} className="w-full max-w-[580px]">
          <div className="group flex w-full items-center rounded-full border border-[#dfe1e5] bg-white pl-4 pr-2 py-2 hover:shadow-md focus-within:shadow-md transition-shadow">
            <Search size={20} className="text-[#9aa0a6] mr-3" />
            
            <input
              type="text"
              className="flex-1 bg-transparent text-base outline-none transition-all duration-500 placeholder:text-gray-400 text-[#202124]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={query === '' ? placeholders[placeholderIndex] : ''}
              autoFocus
            />
            
            <div className="flex items-center gap-3 pl-2">
              <Keyboard size={20} className="text-[#5f6368] cursor-pointer hover:text-[#202124]" />
              <Mic size={20} className="text-[#5f6368] cursor-pointer hover:text-[#202124]" />
              <Camera size={20} className="text-[#5f6368] cursor-pointer hover:text-[#202124]" />
              
              <button 
                type="button"
                className="ml-1 flex items-center gap-1.5 rounded-full bg-[#f8f9fa] border border-[#dadce0] px-4 py-1.5 text-sm font-medium text-[#5f6368] hover:bg-[#e8eaed] transition-colors"
              >
                <Sparkles size={16} className="text-[#5f6368]" />
                Modo IA
              </button>
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
              Sinto-me com sorte
            </button>
          </div>
        </form>

      </main>

      <Footer />

    </div>
  )
}