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

  // ESTADO PARA O BOTÃO FLUTUANTE
  const [activeSection, setActiveSection] = useState('top')

  // =========================================================================
  // ✨ NOVO: O "CÉREBRO" DA TRANSIÇÃO CINEMATOGRÁFICA
  // =========================================================================
  const [transitionState, setTransitionState] = useState<'idle' | 'start' | 'in' | 'out'>('idle')

  const changeView = (targetView: 'google' | 'intro' | 'app') => {
    if (targetView === view) return; 
    setView(targetView);
    window.scrollTo(0, 0);
  }

  // Atalho para a pesquisa do Google usando o novo motor de transição
  const handleSearchTrigger = () => changeView('intro')

  const handlePilulaClick = () => {
    const randomFact = pilulasDeSabedoria[Math.floor(Math.random() * pilulasDeSabedoria.length)]
    setToastFact(randomFact)
    setTimeout(() => setToastFact(null), 6000)
  }

  // Modais e Scrolls
  useEffect(() => {
    if (activeCampanha || transitionState !== 'idle') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [activeCampanha, transitionState])

  // =========================================================================
  // DETETOR DE SCROLL (Agora deteta também o Lookbook)
  // =========================================================================
  useEffect(() => {
    const handleScroll = () => {
      const metodoEl = document.getElementById('metodo');
      const lookbookEl = document.getElementById('lookbook');
      
      if (metodoEl && lookbookEl) {
        const metodoRect = metodoEl.getBoundingClientRect();
        const lookbookRect = lookbookEl.getBoundingClientRect();
        
        // Verifica primeiro se já chegámos ao Lookbook
        if (lookbookRect.top <= window.innerHeight / 2) {
          setActiveSection('lookbook');
        } 
        // Se não, verifica se estamos no Método
        else if (metodoRect.top <= window.innerHeight / 2) {
          setActiveSection('metodo');
        } 
        // Se nenhuma das duas, estamos no topo
        else {
          setActiveSection('top');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lógica do botão consoante a secção:
  const isOrangeTheme = activeSection === 'metodo'; // Fica laranja APENAS no método
  
  // Define para onde o botão vai apontar a seguir
  let nextSectionLink = '#metodo';
  if (activeSection === 'metodo') nextSectionLink = '#lookbook';
  if (activeSection === 'lookbook') nextSectionLink = '#contacto';

  const filteredCampanhas = campanhasData.filter(c => 
    activeFilter === 'Todos' || campaignMeta[c.id]?.categoria === activeFilter
  )

  // =========================================================================
  // EM VEZ DE 'IF / RETURN', ENVOLVEMOS TUDO PARA A CORTINA PODER SOBREPOR-SE
  // =========================================================================
  return (
    <>
      {/* JANELA 1: GOOGLE */}
      {view === 'google' && <GoogleSearch onSearchSubmit={handleSearchTrigger} />}

      {/* JANELA 2: TEORIA */}
      {view === 'intro' && <TeoriaPap onGoToApp={() => changeView('app')} onGoToGoogle={() => changeView('google')} />}

      {/* JANELA 3: APP (PHARMAMEDIA HOME) */}
      {view === 'app' && (
        <main className="min-h-screen bg-[#f4f1e9] text-[#6B23CA] relative animate-in fade-in duration-500">

          {/* NAVEGAÇÃO */}
          <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-6 md:px-10 lg:px-16 relative z-50">
            <div></div>
            <div className="flex items-center">
              {/* ✨ Ao clicar, usa a nova transição para regressar à Teoria! */}
              <button
                onClick={() => changeView('intro')}
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

          {/* HERO SECTION */}
          <section id="top" className="relative mx-auto grid min-h-[calc(100vh-120px)] w-full max-w-[1400px] items-center gap-12 px-6 pb-12 pt-0 md:px-10 lg:grid-cols-[1.05fr_.95fr] lg:px-16 lg:pb-16">
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

            <div className="relative flex min-h-[400px] flex-col items-center justify-center lg:min-h-[500px] animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both">
              <div onClick={handlePilulaClick} className="group relative cursor-pointer" title="Clique para descobrir uma ideia">
                <style dangerouslySetInnerHTML={{
                  __html: `
                  @keyframes borderTravel {
                    0% { box-shadow: 15px 20px 0 #6B23CA, 0 -3px 15px #FF7A00, inset 0 0 10px rgba(255,122,0,0.2); }
                    33% { box-shadow: 15px 20px 0 #6B23CA, 10px 0 15px #FF7A00, inset 0 0 10px rgba(255,122,0,0.2); }
                    66% { box-shadow: 15px 20px 0 #6B23CA, 0 10px 15px #FF7A00, inset 0 0 10px rgba(255,122,0,0.2); }
                    100% { box-shadow: 15px 20px 0 #6B23CA, 0 -3px 15px #FF7A00, inset 0 0 10px rgba(255,122,0,0.2); }
                  }
                  .pill-running-led { animation: borderTravel 3s infinite linear; }
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
          </section>

          {/* SECÇÃO MÉTODO - REDESIGN "AGÊNCIA PREMIUM" (Compactado para caber num ecrã normal) */}
          <section id="metodo" className="relative min-h-screen bg-[#6B23CA] px-6 py-12 lg:py-16 flex flex-col justify-center overflow-hidden">

            {/* Luzes de fundo */}
            <div className="absolute -left-[10%] top-[20%] h-[600px] w-[600px] rounded-full bg-[#FF7A00] opacity-[0.04] blur-[120px] pointer-events-none"></div>
            <div className="absolute right-[5%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-[#8B48E6] opacity-[0.2] blur-[100px] pointer-events-none"></div>

            <div className="mx-auto w-full max-w-[1400px] relative z-10">

              {/* TÍTULO PRINCIPAL (Com mais respiro na margem inferior: mb-16 lg:mb-20) */}
              <div className="mb-16 lg:mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <h2 className="text-[clamp(3.2rem,6vw,5.5rem)] font-black leading-[0.9] tracking-tight text-white">
                  Pequenas<br />
                  doses.<br />
                  <span className="font-serif italic text-[#FF7A00] font-normal">Grande impacto.</span>
                </h2>
              </div>

              {/* GRELHA DE SERVIÇOS - EFEITO CASCATA SUAVE */}
              <div className="grid gap-5 md:grid-cols-3 md:gap-6 items-start">

                {/* CARTÃO 01 - PUBLICIDADE */}
                <div className="group relative flex min-h-[300px] lg:min-h-[320px] flex-col justify-between overflow-hidden rounded-[2rem] bg-white/5 p-6 lg:p-8 backdrop-blur-md border border-white/10 transition-all duration-500 ease-out hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:border-white/30 cursor-pointer animate-in fade-in zoom-in-95 duration-700 delay-100">

                  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FF7A00] opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-20 pointer-events-none"></div>

                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white shadow-inner transition-all duration-500 group-hover:bg-[#FF7A00] group-hover:scale-110 group-hover:rotate-[10deg]">
                      <Target size={24} strokeWidth={2} />
                    </div>
                    <span className="text-5xl font-black tracking-tighter text-white/10 transition-all duration-500 group-hover:text-white/30 group-hover:-translate-x-2">01</span>
                  </div>

                  <div className="relative z-10 mt-8">
                    <h3 className="mb-3 text-2xl font-black text-white tracking-tight">Publicidade</h3>
                    <p className="text-white/60 transition-colors duration-300 group-hover:text-white/90 leading-relaxed text-sm lg:text-base font-medium">
                      Campanhas que param o scroll e tornam a literacia em saúde impossível de ignorar.
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-[#FF7A00] transition-all duration-700 ease-out group-hover:w-full"></div>
                </div>

                {/* CARTÃO 02 - PACK CLÍNICO (Desce ligeiramente 24px) */}
                <div className="group relative flex min-h-[300px] lg:min-h-[320px] flex-col justify-between overflow-hidden rounded-[2rem] bg-white/5 p-6 lg:p-8 backdrop-blur-md border border-white/10 transition-all duration-500 ease-out hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:border-white/30 cursor-pointer animate-in fade-in zoom-in-95 duration-700 delay-300 md:mt-6">

                  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FF7A00] opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-20 pointer-events-none"></div>

                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white shadow-inner transition-all duration-500 group-hover:bg-[#FF7A00] group-hover:scale-110 group-hover:rotate-[10deg]">
                      <Boxes size={24} strokeWidth={2} />
                    </div>
                    <span className="text-5xl font-black tracking-tighter text-white/10 transition-all duration-500 group-hover:text-white/30 group-hover:-translate-x-2">02</span>
                  </div>

                  <div className="relative z-10 mt-8">
                    <h3 className="mb-3 text-2xl font-black text-white tracking-tight">Pack clínico</h3>
                    <p className="text-white/60 transition-colors duration-300 group-hover:text-white/90 leading-relaxed text-sm lg:text-base font-medium">
                      Materiais claros, rigorosos e prontos para a equipa aplicar no balcão.
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-[#FF7A00] transition-all duration-700 ease-out group-hover:w-full"></div>
                </div>

                {/* CARTÃO 03 - COMUNIDADE (Desce ligeiramente 48px) */}
                <div className="group relative flex min-h-[300px] lg:min-h-[320px] flex-col justify-between overflow-hidden rounded-[2rem] bg-white/5 p-6 lg:p-8 backdrop-blur-md border border-white/10 transition-all duration-500 ease-out hover:-translate-y-4 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:border-white/30 cursor-pointer animate-in fade-in zoom-in-95 duration-700 delay-500 md:mt-12">

                  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FF7A00] opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-20 pointer-events-none"></div>

                  <div className="flex justify-between items-start relative z-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white shadow-inner transition-all duration-500 group-hover:bg-[#FF7A00] group-hover:scale-110 group-hover:rotate-[10deg]">
                      <HeartPulse size={24} strokeWidth={2} />
                    </div>
                    <span className="text-5xl font-black tracking-tighter text-white/10 transition-all duration-500 group-hover:text-white/30 group-hover:-translate-x-2">03</span>
                  </div>

                  <div className="relative z-10 mt-8">
                    <h3 className="mb-3 text-2xl font-black text-white tracking-tight">Comunidade</h3>
                    <p className="text-white/60 transition-colors duration-300 group-hover:text-white/90 leading-relaxed text-sm lg:text-base font-medium">
                      Extensões que levam a conversa para escolas, famílias e território local.
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-[#FF7A00] transition-all duration-700 ease-out group-hover:w-full"></div>
                </div>

              </div>
            </div>
          </section>

          {/* LOOKBOOK INTERATIVO */}
          <section id="lookbook" className="px-6 py-24 md:px-10 lg:px-16 lg:py-32 bg-[#f4f1e9]">
            <div className="mx-auto max-w-[1400px]">
              <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                  <h2 className="max-w-2xl text-5xl font-black leading-[.9] tracking-[-.07em] md:text-7xl">Um ano de<br /><span className="font-serif font-normal italic text-[#6B23CA]">boas conversas.</span></h2>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3 bg-white p-2 rounded-full border border-[#6B23CA]/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
                  {filterCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeFilter === cat
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
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                      <div
                        className="absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none -z-10"
                        style={{ boxShadow: `0 20px 40px ${campanha.corTematicaHex}60` }}
                      />
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
                        <h2 className="text-2xl font-black leading-[1.1] tracking-tight md:text-3xl drop-shadow-sm">{campanha.tema}</h2>
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

          {/* FAIXA DESLIZANTE (MARQUEE) - TRANSIÇÃO LOOKBOOK -> CONTACTO */}
          <div className="relative flex overflow-hidden bg-[#4C1D95] py-4 md:py-5 border-y border-[#6B23CA]">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
              .animate-marquee { animation: marquee 20s linear infinite; width: max-content; display: flex; }
            `}} />
            <div className="animate-marquee text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#FF7A00]">
              {/* Bloco 1 */}
              <div className="flex shrink-0 items-center w-max">
                <span className="mx-6 flex items-center gap-6">Agendar um Pitch <Sparkles size={12}/></span>
                <span className="mx-6 flex items-center gap-6 text-white/50">PharmaMedia <Sparkles size={12}/></span>
                <span className="mx-6 flex items-center gap-6">Literacia em Saúde <Sparkles size={12}/></span>
                <span className="mx-6 flex items-center gap-6 text-white/50">Design Clínico <Sparkles size={12}/></span>
              </div>
              {/* Bloco 2 (Cópia exata para o loop infinito não quebrar) */}
              <div className="flex shrink-0 items-center w-max">
                <span className="mx-6 flex items-center gap-6">Agendar um Pitch <Sparkles size={12}/></span>
                <span className="mx-6 flex items-center gap-6 text-white/50">PharmaMedia <Sparkles size={12}/></span>
                <span className="mx-6 flex items-center gap-6">Literacia em Saúde <Sparkles size={12}/></span>
                <span className="mx-6 flex items-center gap-6 text-white/50">Design Clínico <Sparkles size={12}/></span>
              </div>
            </div>
          </div>

          {/* CONTACTO & CTA (CÊNTRICO, MASSIVO E MONUMENTAL) */}
          <section id="contacto" className="relative flex min-h-[70vh] lg:min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-[#FF7A00] px-6 py-24 text-center md:px-10 lg:px-16">
            
            {/* Luz de fundo central para destacar o texto */}
            <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-[0.08] blur-[100px] pointer-events-none transition-all duration-1000"></div>

            <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-14">
              
              <h2 className="text-[clamp(4rem,9vw,10rem)] font-black leading-[0.85] tracking-[-0.04em] text-white">
                Vamos pôr a<br />
                <span className="font-serif font-normal italic text-[#4C1D95]">saúde a falar?</span>
              </h2>
              
              <a 
                href="mailto:ola@pharmamedia.pt" 
                className="group relative inline-flex items-center justify-center gap-5 overflow-hidden rounded-[3rem] bg-[#6B23CA] pl-10 pr-3 py-3 text-sm md:text-lg font-black uppercase tracking-[0.2em] text-white transition-all duration-500 hover:scale-110 hover:bg-[#4C1D95] hover:shadow-[0_20px_50px_rgba(76,29,149,0.5)] border border-white/20 hover:border-white/40"
              >
                <span className="relative z-10 flex items-center gap-6">
                  Agendar um pitch 
                  <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-white/10 transition-all duration-500 group-hover:bg-white group-hover:text-[#6B23CA] group-hover:rotate-45">
                    <ArrowUpRight className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.5} />
                  </div>
                </span>
              </a>

            </div>
          </section>

          {/* FOOTER PREMIUM */}
          <footer className="relative bg-[#4C1D95] px-6 py-12 md:px-10 lg:px-16 text-[#f4f1e9] overflow-hidden">
            {/* Fio de luz no topo do footer */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF7A00]/50 to-transparent"></div>
            
            <div className="mx-auto max-w-[1400px] flex flex-col md:flex-row justify-between items-start md:items-end gap-10 relative z-10">
              
              {/* Lado Esquerdo Footer */}
              <div className="flex flex-col gap-4">
                <span className="text-3xl md:text-4xl font-black tracking-tighter text-white drop-shadow-md">
                  PharmaMedia<span className="text-[#FF7A00]">.</span>
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-60">Projeto de Prova de Aptidão Profissional</span>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A00]">Profitecla do Porto • 2027</span>
                </div>
              </div>
              
              {/* Lado Direito Footer */}
              <div className="flex flex-col md:text-right gap-4 md:items-end">
                <span className="text-base md:text-lg font-serif italic text-white/90">Onde o rigor clínico encontra a criatividade.</span>
              </div>
              
            </div>
          </footer>

          {/* BOTÃO FLUTUANTE CONTÍNUO (Foge da caixa de factos e navega até ao fim!) */}
          <div className={`fixed z-[99] transition-all duration-700 ease-in-out ${
            activeSection === 'top' 
              ? `right-8 md:right-12 lg:right-20 ${
                  toastFact 
                    ? 'bottom-48 md:bottom-48 lg:bottom-52'
                    : 'bottom-10 md:bottom-12 lg:bottom-16'
                }`
              : 'top-8 right-8 md:top-10 md:right-12 lg:top-12 lg:right-16'
          }`}>
            <a 
              href={nextSectionLink} 
              className={`group flex items-center justify-center gap-0 overflow-hidden rounded-full backdrop-blur-md p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out hover:shadow-[0_10px_25px_rgba(255,122,0,0.3)] hover:pr-4 hover:pl-5 hover:gap-3 ${
                isOrangeTheme 
                  ? 'bg-white/10 border border-white/10 hover:bg-white/20 hover:border-[#FF7A00]/50' 
                  : 'bg-white/90 border border-[#6B23CA]/20 hover:border-[#FF7A00]/50'
              }`}
              title="Próxima secção"
            >
              <span className={`w-0 overflow-hidden whitespace-nowrap text-[0.75rem] font-black uppercase tracking-[0.2em] transition-all duration-500 ease-out group-hover:w-[130px] mt-[2px] opacity-0 group-hover:opacity-100 ${
                isOrangeTheme ? 'text-white group-hover:text-white' : 'text-[#6B23CA] group-hover:text-[#FF7A00]'
              }`}>
                Próxima Dose
              </span>

              <div className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-all duration-500 bg-gradient-to-tr ${
                isOrangeTheme 
                  ? 'from-[#FF7A00] to-[#FF9833] group-hover:from-white group-hover:to-white group-hover:text-[#FF7A00]' 
                  : 'from-[#6B23CA] to-[#8B48E6] group-hover:from-[#FF7A00] group-hover:to-[#FF9833] group-hover:text-white'
              }`}>
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

          {/* TOAST (FACTOS) */}
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

          {/* MODAL DA CAMPANHA (BULAS) */}
          {activeCampanha && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#6B23CA]/90 p-4 md:p-6 backdrop-blur-lg transition-all animate-in fade-in duration-300">
              <div className="relative flex h-[95vh] md:h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-[2.5rem] bg-[#f4f1e9] shadow-[0_30px_60px_rgba(0,0,0,0.4)] animate-in zoom-in-95 duration-500">
                <div className={`flex shrink-0 items-start justify-between px-8 py-10 md:px-12 md:py-12 ${activeCampanha.cor} ${activeCampanha.textoCor} relative overflow-hidden`}>
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

                <div className="flex-1 overflow-y-auto p-8 md:p-12 text-[#6B23CA] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
                  <div className="grid gap-12 lg:grid-cols-3">

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
                        <div className="relative rounded-2xl bg-[#6B23CA] p-6 text-[#f4f1e9] shadow-lg overflow-hidden group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                          <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: activeCampanha.corTematicaHex }}>
                            <Sparkles size={14} /> Pitch de Vendas
                          </p>
                          <p className="text-sm font-serif italic leading-relaxed text-white/90 relative z-10">&ldquo;{activeCampanha.pitch}&rdquo;</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-6 lg:col-span-2 lg:grid-cols-2">
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
      )}

      
    </>
  )
}