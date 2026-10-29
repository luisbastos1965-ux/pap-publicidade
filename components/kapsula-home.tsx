'use client'

import { useState, useEffect } from 'react'
import { ArrowDown, ArrowUpRight, Beaker, Boxes, ChevronRight, HeartPulse, Sparkles, Target, TrendingUp, X, Brain, Smile, Activity, Wind, Scale, Sun, Plane, BookOpen, Ribbon, Droplet, Snowflake } from 'lucide-react'
import { campanhasData } from '../data/campanhas'
import { GoogleSearch } from './google-search'
import { TeoriaPap } from './teoria-pap'

const pillars = [
  { icon: Sparkles, number: '01', title: 'Publicidade', text: 'Campanhas que param o scroll e tornam a literacia em saúde impossível de ignorar.' },
  { icon: Boxes, number: '02', title: 'Pack clínico', text: 'Materiais claros, rigorosos e prontos para a equipa aplicar no balcão.' },
  { icon: HeartPulse, number: '03', title: 'Comunidade', text: 'Extensões que levam a conversa para escolas, famílias e território local.' },
]

const pilulasDeSabedoria = [
  "80% das decisões de saúde numa família são tomadas por mulheres.",
  "O utente demora apenas 3 segundos a decidir se lê um cartaz de balcão.",
  "Campanhas visuais nas farmácias aumentam a retenção da mensagem clínica em 65%.",
  "A literacia em saúde reduz em 30% as idas desnecessárias às urgências."
]

// MAPEAMENTO DINÂMICO PARA OS FILTROS E MARCAS D'ÁGUA
const campaignMeta: Record<string, { icon: any, categoria: string }> = {
  '01': { icon: Brain, categoria: 'Bem-Estar' },       
  '02': { icon: Smile, categoria: 'Bem-Estar' },       
  '03': { icon: Activity, categoria: 'Bem-Estar' },    
  '04': { icon: Wind, categoria: 'Prevenção' },        
  '05': { icon: HeartPulse, categoria: 'Bem-Estar' },  
  '06': { icon: Scale, categoria: 'Prevenção' },       
  '07': { icon: Sun, categoria: 'Prevenção' },         
  '08': { icon: Plane, categoria: 'Sazonal' },         
  '09': { icon: BookOpen, categoria: 'Sazonal' },      
  '10': { icon: Ribbon, categoria: 'Prevenção' },      
  '11': { icon: Droplet, categoria: 'Prevenção' },     
  '12': { icon: Snowflake, categoria: 'Sazonal' }      
}
const filterCategories = ['Todos', 'Prevenção', 'Bem-Estar', 'Sazonal']

export function KapsulaHome() {
  const [view, setView] = useState<'google' | 'intro' | 'app'>('google')
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeCampanha = campanhasData.find(c => c.id === activeId)
  const [toastFact, setToastFact] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState('Todos')

  const handleSearchTrigger = () => setView('intro')

  const handlePilulaClick = () => {
    const randomFact = pilulasDeSabedoria[Math.floor(Math.random() * pilulasDeSabedoria.length)]
    setToastFact(randomFact)
    setTimeout(() => setToastFact(null), 6000)
  }

  useEffect(() => {
    if (activeCampanha) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [activeCampanha])

  if (view === 'google') return <GoogleSearch onSearchSubmit={handleSearchTrigger} />
  if (view === 'intro') return <TeoriaPap onGoToApp={() => setView('app')} onGoToGoogle={() => setView('google')} />

  const filteredCampanhas = campanhasData.filter(c => 
    activeFilter === 'Todos' || campaignMeta[c.id]?.categoria === activeFilter
  )

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#6B23CA] relative animate-in fade-in duration-500">
      
      {/* NAVEGAÇÃO COM LOGÓTIPO MAIOR */}
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-6 md:px-10 lg:px-16 relative z-50">
        <div></div>

        <div className="flex items-center">
          <button 
            onClick={() => setView('intro')} 
            className="group flex items-center transition-all duration-300 hover:scale-105"
            title="Voltar à Teoria"
          >
            <img
              src="/logo-pharmamedia-transparente.png"
              alt="PharmaMedia"
              className="h-16 md:h-20 lg:h-24 w-auto object-contain transition-transform group-hover:scale-110"
            />
          </button>
        </div>
      </nav>

      {/* HERO SECTION - COM BOTÃO "PRÓXIMA DOSE" NO CANTO INFERIOR DIREITO */}
      <section id="top" className="relative mx-auto grid min-h-[calc(100vh-120px)] w-full max-w-[1400px] items-center gap-12 px-6 pb-12 pt-0 md:px-10 lg:grid-cols-[1.05fr_.95fr] lg:px-16 lg:pb-16">
        
        {/* LADO ESQUERDO: Textos */}
        <div className="relative z-10 max-w-3xl flex flex-col justify-center h-full"> 
          
          <h1 className="text-[clamp(4.2rem,9vw,9.5rem)] font-black leading-[0.95] tracking-[-0.07em] text-[#6B23CA] animate-in fade-in slide-in-from-left-4 duration-700">
            Rigor que<br />
            <span className="text-[#FF7A00]">
              ganha<br />
              vida.
            </span>
          </h1>
          
          <p className="my-8 md:my-10 max-w-lg text-[1.2rem] leading-relaxed text-[#4C1D95] md:text-xl font-medium animate-in fade-in slide-in-from-left-4 duration-700 delay-100 fill-mode-both">
            Campanhas de saúde <em className="font-serif italic font-bold">chave-na-mão</em> para farmácias que querem comunicar melhor, cuidar mais e crescer com propósito.
          </p>
        </div>

        {/* LADO DIREITO: Pílula Animada com LED */}
        <div className="relative flex min-h-[400px] flex-col items-center justify-center lg:min-h-[500px] animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both">
          
          <div 
            onClick={handlePilulaClick}
            className="group relative cursor-pointer"
            title="Clique para descobrir uma ideia"
          >
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes borderTravel {
                0% { box-shadow: 15px 20px 0 #6B23CA, 0 -3px 15px #FF7A00, inset 0 0 10px rgba(255,122,0,0.2); }
                33% { box-shadow: 15px 20px 0 #6B23CA, 10px 0 15px #FF7A00, inset 0 0 10px rgba(255,122,0,0.2); }
                66% { box-shadow: 15px 20px 0 #6B23CA, 0 10px 15px #FF7A00, inset 0 0 10px rgba(255,122,0,0.2); }
                100% { box-shadow: 15px 20px 0 #6B23CA, 0 -3px 15px #FF7A00, inset 0 0 10px rgba(255,122,0,0.2); }
              }
              .pill-running-led {
                animation: borderTravel 3s infinite linear;
              }
            `}} />

            <div className="relative z-10 flex h-36 w-[340px] -rotate-[12deg] flex-row overflow-hidden rounded-full border-4 border-[#6B23CA] pill-running-led transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:-rotate-[8deg] group-hover:scale-105 md:h-44 md:w-[460px]">
              
              <div className="relative flex flex-1 items-center justify-center bg-[#FF7A00] text-white px-4">
                <span className="text-4xl font-black tracking-tight md:text-6xl">Pílula</span>
              </div>
              
              <div className="h-full w-[4px] bg-[#6B23CA] shrink-0" />
              
              <div className="relative flex-[1.2] flex flex-col items-start justify-center bg-white pl-3 md:pl-5 text-[#FF7A00] shadow-[inset_10px_0_20px_rgba(0,0,0,0.03)]">
                <span className="font-serif text-2xl italic leading-none text-[#6B23CA] md:text-3xl">de</span>
                <span className="text-4xl font-black tracking-tight md:text-6xl">ideias</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTÃO FLUTUANTE GLOBAL (Fica visível em todo o site) */}
      <div className="fixed bottom-10 right-8 md:bottom-12 md:right-12 lg:bottom-16 lg:right-20 z-[99] animate-in fade-in zoom-in duration-1000 delay-700">
        <a 
          href="#metodo" 
          className="group flex items-center justify-center gap-0 overflow-hidden rounded-full bg-white/90 backdrop-blur-sm p-1.5 shadow-[0_8px_20px_rgba(107,35,202,0.15)] border border-[#6B23CA]/20 transition-all duration-500 ease-out hover:shadow-[0_10px_25px_rgba(255,122,0,0.3)] hover:border-[#FF7A00]/50 hover:pr-4 hover:pl-5 hover:gap-3"
          title="Próxima secção"
        >
          {/* TEXTO ESCONDIDO */}
          <span className="w-0 overflow-hidden whitespace-nowrap text-[0.75rem] font-black uppercase tracking-[0.2em] text-[#6B23CA] transition-all duration-500 ease-out group-hover:w-[130px] group-hover:text-[#FF7A00] mt-[2px] opacity-0 group-hover:opacity-100">
            Próxima Dose
          </span>

          {/* ÍCONE DINÂMICO (Cruz -> Seta) */}
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#6B23CA] to-[#8B48E6] text-white transition-all duration-500 group-hover:bg-gradient-to-tr group-hover:from-[#FF7A00] group-hover:to-[#FF9833]">
            
            {/* ESTADO FECHADO: Cruz de Farmácia (Sem brilho) */}
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:rotate-90 group-hover:scale-50 group-hover:opacity-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 10.5h-5.5V5a1.5 1.5 0 00-3 0v5.5H5a1.5 1.5 0 000 3h5.5V19a1.5 1.5 0 003 0v-5.5H19a1.5 1.5 0 000-3z" />
              </svg>
            </div>

            {/* ESTADO ABERTO: Seta de Ação */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="absolute -rotate-90 scale-0 opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 group-hover:animate-bounce">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </div>
        </a>
      </div>
      </section>

      {/* SECÇÃO MÉTODO - DINÂMICA E SEM TEXTO SUPERIOR */}
      <section id="metodo" className="relative min-h-screen bg-[#6B23CA] px-6 py-20 md:px-10 lg:px-16 flex flex-col justify-center overflow-hidden">
        
        {/* Elemento decorativo de fundo (opcional para dar profundidade) */}
        <div className="absolute -left-[20%] top-0 h-[500px] w-[500px] rounded-full bg-[#FF7A00] opacity-[0.03] blur-[120px] pointer-events-none"></div>

        {/* EXATAMENTE AQUI! BOTÃO DA SECÇÃO MÉTODO (Laranja, no Canto Superior Direito) */}
        <div className="absolute top-8 right-8 md:top-10 md:right-12 lg:top-12 lg:right-16 z-40 animate-in fade-in zoom-in duration-1000 delay-700">
          <a 
            href="#lookbook" 
            className="group flex items-center justify-center gap-0 overflow-hidden rounded-full bg-white/10 backdrop-blur-md p-1.5 shadow-[0_8px_20px_rgba(255,122,0,0.15)] border border-white/10 transition-all duration-500 ease-out hover:shadow-[0_10px_25px_rgba(255,122,0,0.3)] hover:border-[#FF7A00]/50 hover:bg-white/20 hover:pr-4 hover:pl-5 hover:gap-3"
            title="Próxima secção"
          >
            {/* TEXTO ESCONDIDO */}
            <span className="w-0 overflow-hidden whitespace-nowrap text-[0.75rem] font-black uppercase tracking-[0.2em] text-white transition-all duration-500 ease-out group-hover:w-[130px] mt-[2px] opacity-0 group-hover:opacity-100">
              Próxima Dose
            </span>

            {/* ÍCONE DINÂMICO (Laranja) */}
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#FF7A00] to-[#FF9833] text-white transition-all duration-500 group-hover:bg-gradient-to-tr group-hover:from-white group-hover:to-white group-hover:text-[#FF7A00]">
              
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:rotate-90 group-hover:scale-50 group-hover:opacity-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 10.5h-5.5V5a1.5 1.5 0 00-3 0v5.5H5a1.5 1.5 0 000 3h5.5V19a1.5 1.5 0 003 0v-5.5H19a1.5 1.5 0 000-3z" />
                </svg>
              </div>

              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="absolute -rotate-90 scale-0 opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 group-hover:animate-bounce">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
          </a>
        </div>

        <div className="mx-auto w-full max-w-[1400px] relative z-10">
          
          {/* TÍTULO PRINCIPAL (Sem o overline text) */}
          <div className="mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h2 className="text-[clamp(3.5rem,7vw,6rem)] font-black leading-[0.9] tracking-tight text-white">
              Pequenas<br />
              doses.<br />
              <span className="font-serif italic text-[#FF7A00] font-normal">Grande impacto.</span>
            </h2>
          </div>

          {/* GRELHA DE SERVIÇOS - CARTÕES DINÂMICOS */}
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            
            {/* CARTÃO 01 - PUBLICIDADE */}
            <div className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[2rem] bg-white/5 p-8 backdrop-blur-md border border-white/10 transition-all duration-500 ease-out hover:-translate-y-4 hover:bg-white/10 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:border-[#FF7A00]/40 cursor-pointer animate-in fade-in zoom-in-95 duration-700 delay-100">
              {/* Número Gigante Animado */}
              <span className="absolute -right-2 -top-6 text-[12rem] font-black leading-none text-white-[0.03] transition-all duration-700 ease-out group-hover:-translate-x-6 group-hover:translate-y-4 group-hover:text-white/10 group-hover:scale-110 select-none">
                01
              </span>
              
              <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white transition-all duration-500 group-hover:scale-110 group-hover:bg-[#FF7A00] group-hover:shadow-[0_0_20px_rgba(255,122,0,0.5)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white tracking-wide">Publicidade</h3>
                <p className="text-white/70 transition-colors duration-300 group-hover:text-white/95 leading-relaxed text-sm md:text-base font-medium">
                  Campanhas que param o scroll e tornam a literacia em saúde impossível de ignorar.
                </p>
              </div>
            </div>

            {/* CARTÃO 02 - PACK CLÍNICO */}
            <div className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[2rem] bg-white/5 p-8 backdrop-blur-md border border-white/10 transition-all duration-500 ease-out hover:-translate-y-4 hover:bg-white/10 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:border-[#FF7A00]/40 cursor-pointer animate-in fade-in zoom-in-95 duration-700 delay-300">
              <span className="absolute -right-2 -top-6 text-[12rem] font-black leading-none text-white-[0.03] transition-all duration-700 ease-out group-hover:-translate-x-6 group-hover:translate-y-4 group-hover:text-white/10 group-hover:scale-110 select-none">
                02
              </span>
              
              <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white transition-all duration-500 group-hover:scale-110 group-hover:bg-[#FF7A00] group-hover:shadow-[0_0_20px_rgba(255,122,0,0.5)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white tracking-wide">Pack clínico</h3>
                <p className="text-white/70 transition-colors duration-300 group-hover:text-white/95 leading-relaxed text-sm md:text-base font-medium">
                  Materiais claros, rigorosos e prontos para a equipa aplicar no balcão.
                </p>
              </div>
            </div>

            {/* CARTÃO 03 - COMUNIDADE */}
            <div className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[2rem] bg-white/5 p-8 backdrop-blur-md border border-white/10 transition-all duration-500 ease-out hover:-translate-y-4 hover:bg-white/10 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:border-[#FF7A00]/40 cursor-pointer animate-in fade-in zoom-in-95 duration-700 delay-500">
              <span className="absolute -right-2 -top-6 text-[12rem] font-black leading-none text-white-[0.03] transition-all duration-700 ease-out group-hover:-translate-x-6 group-hover:translate-y-4 group-hover:text-white/10 group-hover:scale-110 select-none">
                03
              </span>
              
              <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white transition-all duration-500 group-hover:scale-110 group-hover:bg-[#FF7A00] group-hover:shadow-[0_0_20px_rgba(255,122,0,0.5)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white tracking-wide">Comunidade</h3>
                <p className="text-white/70 transition-colors duration-300 group-hover:text-white/95 leading-relaxed text-sm md:text-base font-medium">
                  Extensões que levam a conversa para escolas, famílias e território local.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* LOOKBOOK INTERATIVO (MELHORADO) */}
      <section id="lookbook" className="px-6 py-24 md:px-10 lg:px-16 lg:py-32 bg-[#f4f1e9]">
        <div className="mx-auto max-w-[1400px]">
          
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-[#FF7A00]">Lookbook anual</p>
              <h2 className="max-w-2xl text-5xl font-black leading-[.9] tracking-[-.07em] md:text-7xl">Um ano de<br /><span className="font-serif font-normal italic text-[#6B23CA]">boas conversas.</span></h2>
            </div>
            
            {/* FILTROS TIPO "CÁPSULA" */}
            <div className="flex flex-wrap gap-2 md:gap-3 bg-white p-2 rounded-full border border-[#6B23CA]/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
              {filterCategories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeFilter === cat 
                      ? 'bg-[#6B23CA] text-white shadow-[0_4px_12px_rgba(107,35,202,0.3)] scale-100' 
                      : 'bg-transparent text-[#6B23CA]/60 hover:bg-[#6B23CA]/5 hover:text-[#6B23CA]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 lg:grid-cols-4 relative min-h-[500px]">
            {filteredCampanhas.map((campanha) => {
              const Meta = campaignMeta[campanha.id] || { icon: Sparkles };
              const IconComponent = Meta.icon;

              return (
                <button
                  key={campanha.id}
                  onClick={() => setActiveId(campanha.id)}
                  className={`group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[2rem] p-7 text-left transition-all duration-500 hover:-translate-y-2 ${campanha.cor} ${campanha.textoCor} animate-in zoom-in-95 fade-in shadow-sm hover:shadow-xl border border-white/10`}
                >
                  {/* Gradiente subtil para dar profundidade editorial */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                  {/* Glow Colorido */}
                  <div 
                    className="absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none -z-10"
                    style={{ boxShadow: `0 20px 40px ${campanha.corTematicaHex}60` }} 
                  />

                  {/* Ícone d'Água (Agora roda suavemente no hover) */}
                  <div className="absolute -bottom-6 -right-6 z-0 opacity-[0.08] transition-all duration-[2000ms] ease-out group-hover:rotate-45 group-hover:scale-[1.2] group-hover:opacity-[0.15] pointer-events-none">
                    <IconComponent size={180} strokeWidth={1.5} />
                  </div>

                  <div className="relative z-10 flex w-full items-center justify-between text-xs font-bold tracking-[.16em]">
                    <div className="flex items-center gap-2.5 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <span className="inline-block h-2 w-2 rounded-full shadow-sm" style={{ backgroundColor: campanha.corTematicaHex }} />
                      <span>{campanha.mes}</span>
                    </div>
                    <span className="opacity-70 bg-black/5 px-2 py-1 rounded-md">/{campanha.id}</span>
                  </div>
                  
                  <div className="relative z-10">
                    <h2 className="text-2xl font-black leading-[1.1] tracking-tight md:text-3xl drop-shadow-sm">
                      {campanha.tema}
                    </h2>
                    
                    {/* Botão "Explorar" Deslizante */}
                    <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-md">
                        Explorar Pack <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
            
            {filteredCampanhas.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-32 text-[#6B23CA]/40 animate-in fade-in bg-white rounded-[2rem] border-2 border-dashed border-[#6B23CA]/20">
                <Sparkles size={48} className="mb-4 opacity-50" />
                <p className="text-lg font-bold">Nenhuma campanha neste segmento.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACTO & CTA REFINADO */}
      <section id="contacto" className="relative overflow-hidden bg-[#FF7A00] px-6 py-20 md:px-10 lg:px-16 lg:py-28 text-[#f4f1e9]">
        {/* Elementos decorativos de fundo */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-[80px]" />
        
        <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          
          {/* Lado Esquerdo: Mensagem Principal */}
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-[#6B23CA]">Para farmácias com visão</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-[-0.06em] text-white">
              Vamos pôr a<br />
              <span className="font-serif font-normal italic text-[#6B23CA]">saúde a falar?</span>
            </h2>
          </div>
          
          {/* Lado Direito: Botão CTA Elevado e Imponente */}
          <div className="flex lg:justify-end">
            <a 
              href="mailto:ola@pharmamedia.pt" 
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#6B23CA] px-10 py-6 text-base font-black uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 hover:bg-[#561CA3] hover:shadow-[0_20px_40px_rgba(107,35,202,0.4)] border-4 border-white/20"
            >
              <span className="relative z-10 flex items-center gap-3">
                Agendar um pitch 
                <ArrowUpRight size={22} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </a>
          </div>

        </div>
      </section>

      {/* FOOTER (Remate Final Mais Legível e Elegante) */}
      <footer className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#6B23CA] px-6 py-10 md:px-16 text-xs font-bold uppercase tracking-[0.18em] text-[#f4f1e9] border-t border-white/10">
        
        <div className="flex flex-col gap-1.5">
          <span className="text-lg font-black text-[#FF7A00] tracking-tighter">PHARMAMEDIA © 2027</span>
          <span className="opacity-80 text-[11px]">Projeto de Prova de Aptidão Profissional • Profitecla do Porto</span>
        </div>
        
        <div className="flex flex-col md:text-right gap-1.5">
          <span className="text-white/90">Onde o rigor clínico encontra a criatividade.</span>
          <span className="opacity-60 text-[10px]">Desenvolvido para defesa final</span>
        </div>
        
      </footer>

      {/* TOAST */}
      {toastFact && (
        <div className="fixed bottom-8 right-8 z-50 w-80 rounded-2xl border-2 border-[#6B23CA] bg-[#f4f1e9] p-5 shadow-[8px_8px_0_#FF7A00] animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#FF7A00]">
              <Beaker size={14} /> Facto PharmaMedia
            </span>
            <button onClick={() => setToastFact(null)} className="opacity-50 transition-opacity hover:opacity-100"><X size={16} /></button>
          </div>
          <p className="text-sm font-bold leading-relaxed text-[#6B23CA]">{toastFact}</p>
        </div>
      )}

      {/* MODAL DA CAMPANHA (ESTILO FICHA TÉCNICA / BULA PREMIUM) */}
      {activeCampanha && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#6B23CA]/90 p-4 md:p-6 backdrop-blur-lg transition-all animate-in fade-in duration-300">
          
          <div className="relative flex h-[95vh] md:h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-[2.5rem] bg-[#f4f1e9] shadow-[0_30px_60px_rgba(0,0,0,0.4)] animate-in zoom-in-95 duration-500">
            
            {/* Cabeçalho do Modal */}
            <div className={`flex shrink-0 items-start justify-between px-8 py-10 md:px-12 md:py-12 ${activeCampanha.cor} ${activeCampanha.textoCor} relative overflow-hidden`}>
              {/* Efeito gráfico de fundo no cabeçalho */}
              <div className="absolute top-0 right-0 opacity-10 scale-150 -translate-y-1/4 translate-x-1/4 pointer-events-none">
                <HeartPulse size={400} strokeWidth={1} />
              </div>
              
              <div className="relative z-10 max-w-4xl">
                <div className="flex flex-wrap items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[.2em] opacity-90 mb-4">
                  <span className="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                    <span className="inline-block h-2 w-2 rounded-full shadow-sm" style={{ backgroundColor: activeCampanha.corTematicaHex }} />
                    Cápsula {activeCampanha.mes}
                  </span>
                  <span className="bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20">
                    {activeCampanha.tomComunicacao}
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] drop-shadow-md">{activeCampanha.tema}</h2>
              </div>
              
              <button onClick={() => setActiveId(null)} className="relative z-10 rounded-full bg-black/10 p-3 md:p-4 transition-all hover:bg-black/20 hover:scale-105 hover:rotate-90">
                <X size={24} />
              </button>
            </div>

            {/* Corpo do Modal (Ficha Editorial) */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 text-[#6B23CA] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
              <div className="grid gap-12 lg:grid-cols-3">
                
                {/* Coluna Esquerda: Overview Estratégico */}
                <div className="space-y-10 lg:col-span-1 animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-both" style={{ animationDelay: '100ms' }}>
                  
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[.15em]" style={{ color: activeCampanha.corTematicaHex }}>
                      <Target size={18} /> O Alvo
                    </h3>
                    <div className="bg-white p-5 rounded-2xl border border-[#6B23CA]/5 shadow-sm">
                      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-[#FF7A00]">Local de Ação</p>
                      <p className="mb-4 text-sm font-black text-[#6B23CA]">{activeCampanha.localAcao}</p>
                      <div className="h-px w-full bg-[#6B23CA]/10 mb-4"></div>
                      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-[#FF7A00]">Público</p>
                      <p className="text-sm leading-relaxed text-[#4C1D95] font-medium">{activeCampanha.publicoAlvo}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[.15em]" style={{ color: activeCampanha.corTematicaHex }}>
                      <TrendingUp size={18} /> Impacto (ROI)
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-[#4C1D95] font-medium pl-2 border-l-2 border-[#FF7A00]">{activeCampanha.roi}</p>
                    
                    {/* Pitch destacado */}
                    <div className="relative rounded-2xl bg-[#6B23CA] p-6 text-[#f4f1e9] shadow-lg overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                      <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: activeCampanha.corTematicaHex }}>
                        <Sparkles size={14} /> Pitch de Vendas
                      </p>
                      <p className="text-sm font-serif italic leading-relaxed text-white/90 relative z-10">&ldquo;{activeCampanha.pitch}&rdquo;</p>
                    </div>
                  </div>
                </div>

                {/* Coluna Direita: O Entregável (Packs) */}
                <div className="grid gap-6 lg:col-span-2 lg:grid-cols-2">
                  
                  {/* Pack Físico */}
                  <div className="rounded-3xl border-2 border-[#6B23CA]/10 bg-white p-7 shadow-sm transition-all hover:shadow-md hover:border-[#6B23CA]/20 animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-both" style={{ animationDelay: '200ms' }}>
                    <h3 className="mb-6 flex items-center gap-2 text-sm font-black uppercase tracking-[.15em]" style={{ color: activeCampanha.corTematicaHex }}>
                      <Boxes size={20} strokeWidth={2.5} /> Pack Físico
                    </h3>
                    <ul className="space-y-4 text-sm font-medium text-[#4C1D95]">
                      {activeCampanha.packFisico?.map((item, index) => (
                        <li key={index} className="flex gap-3 items-start">
                          <div className="mt-1 shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: activeCampanha.corTematicaHex }} /> 
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pack Digital */}
                  <div className="rounded-3xl border-2 border-[#6B23CA]/10 bg-white p-7 shadow-sm transition-all hover:shadow-md hover:border-[#6B23CA]/20 animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-both" style={{ animationDelay: '300ms' }}>
                    <h3 className="mb-6 flex items-center gap-2 text-sm font-black uppercase tracking-[.15em]" style={{ color: activeCampanha.corTematicaHex }}>
                      <Sparkles size={20} strokeWidth={2.5} /> Pack Digital
                    </h3>
                    <ul className="space-y-4 text-sm font-medium text-[#4C1D95]">
                      {activeCampanha.packDigital?.map((item, index) => (
                        <li key={index} className="flex gap-3 items-start">
                          <div className="mt-1 shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: activeCampanha.corTematicaHex }} /> 
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pack Clínico & Comunidade */}
                  <div className="rounded-3xl border-2 border-[#FF7A00]/20 bg-gradient-to-br from-white to-[#FF7A00]/5 p-7 lg:col-span-2 shadow-sm animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-both" style={{ animationDelay: '400ms' }}>
                    <h3 className="mb-6 flex items-center gap-2 text-sm font-black uppercase tracking-[.15em] text-[#FF7A00]">
                      <HeartPulse size={20} strokeWidth={2.5} /> Valor Clínico & Extensão
                    </h3>
                    
                    <div className="grid gap-8 md:grid-cols-2">
                      <ul className="space-y-4 text-sm font-medium text-[#4C1D95]">
                        {activeCampanha.packClinico?.map((item, index) => (
                          <li key={index} className="flex gap-3 items-start">
                            <div className="mt-0.5 shrink-0 flex items-center justify-center h-4 w-4 rounded-md bg-[#FF7A00] text-white font-bold text-[10px]">+</div> 
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="rounded-2xl border border-[#FF7A00]/20 bg-white p-6 text-sm text-[#4C1D95] shadow-inner relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#FF7A00]"></div>
                        <span className="mb-3 flex items-center gap-2 font-black text-[#FF7A00] uppercase tracking-widest text-[10px]">
                          <Activity size={14} /> Na Comunidade
                        </span>
                        <p className="leading-relaxed font-medium">{activeCampanha.extensaoComunidade}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}