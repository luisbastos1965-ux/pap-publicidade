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
  '01': { icon: Brain, categoria: 'Bem-Estar' },       // Saúde Mental
  '02': { icon: Smile, categoria: 'Bem-Estar' },       // Higiene Oral
  '03': { icon: Activity, categoria: 'Bem-Estar' },    // Saúde da Mulher
  '04': { icon: Wind, categoria: 'Prevenção' },        // Alergias
  '05': { icon: HeartPulse, categoria: 'Bem-Estar' },  // Coração
  '06': { icon: Scale, categoria: 'Prevenção' },       // Obesidade
  '07': { icon: Sun, categoria: 'Prevenção' },         // Pele
  '08': { icon: Plane, categoria: 'Sazonal' },         // Viagem
  '09': { icon: BookOpen, categoria: 'Sazonal' },      // Aulas
  '10': { icon: Ribbon, categoria: 'Prevenção' },      // Mama
  '11': { icon: Droplet, categoria: 'Prevenção' },     // Diabetes
  '12': { icon: Snowflake, categoria: 'Sazonal' }      // Inverno
}
const filterCategories = ['Todos', 'Prevenção', 'Bem-Estar', 'Sazonal']

export function KapsulaHome() {
  const [view, setView] = useState<'google' | 'splash' | 'intro' | 'app'>('google')
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeCampanha = campanhasData.find(c => c.id === activeId)
  const [toastFact, setToastFact] = useState<string | null>(null)
  
  // Estado para os Filtros do Lookbook
  const [activeFilter, setActiveFilter] = useState('Todos')

  const handleSearchTrigger = () => {
    setView('splash')
    setTimeout(() => {
      setView('intro')
    }, 1200)
  }

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

  // Vista 1: Google Search
  if (view === 'google') {
    return <GoogleSearch onSearchSubmit={handleSearchTrigger} />
  }

  // Vista 2: Splash / Fade-in
  if (view === 'splash') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f1e9] text-[#6B23CA] animate-in fade-in zoom-in duration-700">
        <div className="text-center">
          <img
            src="/logo-pharmamedia.png"
            alt="Logótipo PharmaMedia"
            className="h-16 w-auto mx-auto mb-4 drop-shadow-md"
          />
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF7A00]">A carregar portal institucional...</p>
        </div>
      </main>
    )
  }

  // Vista 3: Teoria PAP
  if (view === 'intro') {
    return <TeoriaPap onGoToApp={() => setView('app')} onGoToGoogle={() => setView('google')} />
  }

  // Filtra as campanhas com base no botão clicado
  const filteredCampanhas = campanhasData.filter(c => 
    activeFilter === 'Todos' || campaignMeta[c.id]?.categoria === activeFilter
  )

  // Vista 4: A Aplicação / Lookbook Oficial
  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#6B23CA] relative animate-in fade-in duration-500">
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-6 md:px-10 lg:px-16">
        <button onClick={() => setView('intro')} className="hover:opacity-80 transition-opacity">
          <img
            src="/logo-pharmamedia.png"
            alt="PharmaMedia"
            className="h-8 md:h-10 w-auto"
          />
        </button>
        <div className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.16em] md:flex">
          <button onClick={() => setView('intro')} className="transition-colors hover:text-[#FF7A00]">← Voltar à Teoria</button>
          <a href="#metodo" className="transition-colors hover:text-[#FF7A00]">Método</a>
          <a href="#lookbook" className="transition-colors hover:text-[#FF7A00]">Lookbook</a>
          <a href="#contacto" className="rounded-full bg-[#6B23CA] px-5 py-3 text-[#f4f1e9] transition-transform hover:-translate-y-0.5">Agendar pitch</a>
        </div>
      </nav>

      <section id="top" className="relative mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-[1400px] items-center gap-12 px-6 pb-16 pt-8 md:px-10 lg:grid-cols-[1.02fr_.98fr] lg:px-16 lg:pb-24">
        
        {/* LADO ESQUERDO: Textos */}
        <div className="relative z-10 max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#6B23CA]/10 px-4 py-2 text-sm font-bold text-[#6B23CA] animate-in fade-in slide-in-from-left-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-[#FF7A00] animate-pulse"></span>
            12 temas. 1 ano inteiro.
          </div>
          <h1 className="text-[clamp(4rem,9vw,9.4rem)] font-black leading-[.82] tracking-[-0.09em] text-[#6B23CA]">
            Rigor que<br />
            <span className="text-[#FF7A00]">ganha vida.</span>
          </h1>
          <p className="mt-10 max-w-md text-lg leading-relaxed text-[#4C1D95] md:text-xl">
            Campanhas de saúde <em className="font-serif">chave-na-mão</em> para farmácias que querem comunicar melhor, cuidar mais e crescer com propósito.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#lookbook" className="group inline-flex items-center gap-3 rounded-full bg-[#FF7A00] px-6 py-4 text-sm font-bold text-white transition-all hover:gap-5 hover:bg-[#E66E00]">Explorar campanhas <ArrowUpRight size={17} /></a>
            <a href="#metodo" className="inline-flex items-center gap-2 px-3 py-4 text-sm font-bold text-[#6B23CA]">Conhecer o método <ChevronRight size={17} /></a>
          </div>
        </div>

        {/* LADO DIREITO: Pílula Animada */}
        <div className="relative flex min-h-[420px] flex-col items-center justify-center lg:min-h-[580px]">
          <div 
            onClick={handlePilulaClick}
            className="group relative cursor-pointer"
            title="Clique para descobrir uma ideia"
          >
            <div className="absolute -top-10 right-4 z-50 animate-bounce drop-shadow-lg md:right-10 pointer-events-none">
              <div className="relative rounded-2xl bg-[#FF7A00] px-5 py-2 text-sm font-black text-white shadow-xl whitespace-nowrap">
                Clica-me! ✨
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#FF7A00]"></div>
              </div>
            </div>
            <div className="relative z-10 flex h-32 w-72 -rotate-[12deg] flex-row overflow-hidden rounded-full border-2 border-[#6B23CA] shadow-[12px_16px_0_#6B23CA] transition-all duration-500 group-hover:-translate-y-4 group-hover:-rotate-[6deg] group-hover:scale-105 group-hover:shadow-[16px_24px_0_#FF7A00] md:h-40 md:w-96">
              <div className="relative flex flex-1 flex-col items-end justify-center bg-[#FF7A00] pr-3 text-white md:pr-4">
                <Beaker size={24} className="absolute left-6 top-1/2 -translate-y-1/2 opacity-80 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span className="text-3xl font-black tracking-tight md:text-5xl">Pílula</span>
              </div>
              <div className="h-full w-[2px] bg-[#6B23CA]" />
              <div className="relative flex flex-1 flex-col items-start justify-center bg-white pl-3 text-[#FF7A00] md:pl-4">
                <span className="font-serif text-xl italic leading-none text-[#6B23CA] md:text-2xl">de</span>
                <span className="text-3xl font-black tracking-tight md:text-5xl">ideias</span>
              </div>
            </div>
          </div>
        </div>
        <a href="#metodo" className="absolute bottom-8 left-6 hidden items-center gap-3 text-xs font-bold uppercase tracking-[.18em] md:flex lg:left-16"><ArrowDown size={15} /> fazer scroll</a>
      </section>

      {/* MÉTODO */}
      <section id="metodo" className="relative overflow-hidden bg-[#6B23CA] px-6 py-24 text-[#f4f1e9] md:px-10 lg:px-16 lg:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9B4DCA]/20 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-[#FF7A00]">O método PharmaMedia</p>
            <h2 className="text-5xl font-black leading-[.9] tracking-[-.07em] md:text-7xl">Pequenas doses.<br /><span className="font-serif font-normal italic text-[#FFA726]">Grande impacto.</span></h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {pillars.map(({ icon: Icon, number, title, text }) => (
              <article
                key={number}
                className="group relative overflow-hidden rounded-3xl border border-[#f4f1e9]/10 bg-[#561CA3]/80 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:border-[#FF7A00]/50 hover:shadow-[0_20px_40px_rgba(255,122,0,0.15)] md:p-10"
              >
                <span className="absolute -right-4 -top-8 select-none text-[140px] font-black leading-none text-[#f4f1e9]/5 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#FF7A00]/10">
                  {number}
                </span>
                <div className="relative z-10">
                  <div className="mb-12 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4f1e9]/10 text-[#FFA726] transition-colors duration-500 group-hover:bg-[#FF7A00] group-hover:text-white">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">{title}</h3>
                  <p className="leading-relaxed text-[#f4f1e9]/70 transition-colors duration-300 group-hover:text-[#f4f1e9]">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LOOKBOOK INTERATIVO */}
      <section id="lookbook" className="px-6 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          
          {/* Cabeçalho e Filtros */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-[#FF7A00]">Lookbook anual</p>
              <h2 className="max-w-2xl text-5xl font-black leading-[.9] tracking-[-.07em] md:text-7xl">Um ano de<br /><span className="font-serif font-normal italic text-[#6B23CA]">boas conversas.</span></h2>
            </div>
            
            {/* O NOVO SISTEMA DE FILTROS */}
            <div className="flex flex-wrap gap-3">
              {filterCategories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeFilter === cat 
                      ? 'bg-[#6B23CA] text-white shadow-md -translate-y-1' 
                      : 'bg-[#6B23CA]/10 text-[#6B23CA] hover:bg-[#6B23CA]/20 hover:-translate-y-0.5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grelha de Campanhas */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 relative min-h-[500px]">
            {filteredCampanhas.map((campanha) => {
              
              // Busca o ícone correspondente à campanha
              const Meta = campaignMeta[campanha.id] || { icon: Sparkles };
              const IconComponent = Meta.icon;

              return (
                <button
                  key={campanha.id}
                  onClick={() => setActiveId(campanha.id)}
                  className={`group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl p-6 text-left transition-all duration-500 hover:-translate-y-3 ${campanha.cor} ${campanha.textoCor} animate-in zoom-in-95 fade-in`}
                >
                  {/* O EFEITO NEON/GLOW (Sombra colorida baseada na cor da campanha) */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none -z-10"
                    style={{ boxShadow: `0 20px 40px ${campanha.corTematicaHex}80` }} 
                  />

                  {/* A MARCA D'ÁGUA DINÂMICA (Ícone) */}
                  <div className="absolute -bottom-6 -right-6 z-0 opacity-[0.08] transition-all duration-500 group-hover:-rotate-12 group-hover:scale-110 group-hover:opacity-[0.15] pointer-events-none">
                    <IconComponent size={160} strokeWidth={2} />
                  </div>

                  {/* CONTEÚDO DO CARTÃO */}
                  <div className="relative z-10 flex w-full items-center justify-between text-xs font-bold tracking-[.16em]">
                    <div className="flex items-center gap-2">
                      <span>{campanha.mes}</span>
                      <span
                        className="inline-block h-2 w-2 rounded-full shadow-sm"
                        style={{ backgroundColor: campanha.corTematicaHex }}
                      />
                    </div>
                    <span className="opacity-70">/{campanha.id}</span>
                  </div>
                  
                  <div className="relative z-10">
                    <h2 className="text-2xl font-black leading-[1.1] tracking-tight md:text-3xl">
                      {campanha.tema}
                    </h2>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] opacity-0 transition-opacity group-hover:opacity-100">
                      Explorar Pack <ArrowUpRight size={14} />
                    </div>
                  </div>
                </button>
              )
            })}
            
            {/* Mensagem caso o filtro fique vazio (prevenção extra) */}
            {filteredCampanhas.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-[#6B23CA]/50 animate-in fade-in">
                <Sparkles size={48} className="mb-4 opacity-50" />
                <p className="text-lg font-bold">Nenhuma campanha encontrada nesta categoria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACTO & CTA */}
      <section id="contacto" className="relative overflow-hidden bg-[#FF7A00] px-6 py-24 text-[#f4f1e9] md:px-10 lg:px-16 lg:py-32">
        {/* Elementos decorativos de fundo (Profundidade) */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/20 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-[500px] w-[500px] rounded-full border-[40px] border-white/5" />

        <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col justify-between gap-12 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-[#6B23CA]">Para farmácias com visão</p>
            <h2 className="max-w-3xl text-5xl font-black leading-[.86] tracking-[-.08em] md:text-8xl">
              Vamos pôr a<br />
              <span className="font-serif font-normal italic text-[#6B23CA]">saúde a falar?</span>
            </h2>
          </div>
          
          {/* O Botão CTA Elevado */}
          <a 
            href="mailto:ola@pharmamedia.pt" 
            className="group relative inline-flex shrink-0 items-center gap-3 overflow-hidden rounded-full bg-[#6B23CA] px-9 py-6 text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#561CA3] hover:shadow-[0_15px_40px_rgba(107,35,202,0.4)] border-2 border-transparent hover:border-white/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Agendar um pitch 
              <ArrowUpRight size={22} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </a>
        </div>
      </section>

      {/* FOOTER (O Remate Final em Roxo) */}
      <footer className="flex flex-col justify-between gap-8 bg-[#6B23CA] px-6 py-12 text-xs font-bold uppercase tracking-[.16em] text-[#f4f1e9] md:flex-row md:items-end md:px-16">
        <div className="flex flex-col gap-2">
          <span className="text-xl font-black text-[#FF7A00] tracking-tighter">PHARMAMEDIA © 2027</span>
          <span className="opacity-60">Projeto de Prova de Aptidão Profissional</span>
        </div>
        
        <div className="flex flex-col gap-2 md:text-right">
          <span>Onde o rigor clínico encontra a criatividade.</span>
          <span className="opacity-50 mt-4 md:mt-0 text-[10px]">Desenvolvido para defesa final</span>
        </div>
      </footer>

      {/* TOAST INFO */}
      {toastFact && (
        <div className="fixed bottom-8 right-8 z-50 w-80 rounded-2xl border-2 border-[#6B23CA] bg-[#f4f1e9] p-5 shadow-[8px_8px_0_#FF7A00] animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#FF7A00]">
              <Beaker size={14} /> Fato PharmaMedia
            </span>
            <button onClick={() => setToastFact(null)} className="opacity-50 transition-opacity hover:opacity-100">
              <X size={16} />
            </button>
          </div>
          <p className="text-sm font-bold leading-relaxed text-[#6B23CA]">{toastFact}</p>
        </div>
      )}

      {/* MODAL DA CAMPANHA */}
      {activeCampanha && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#6B23CA]/80 p-6 backdrop-blur-md transition-all">
          <div className="relative flex h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] bg-[#f4f1e9] shadow-2xl animate-in zoom-in-95 duration-300">
            <div className={`flex shrink-0 items-center justify-between px-10 py-8 ${activeCampanha.cor} ${activeCampanha.textoCor}`}>
              <div>
                <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] opacity-80">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: activeCampanha.corTematicaHex }} />
                  Cápsula {activeCampanha.mes} — {activeCampanha.tomComunicacao}
                </p>
                <h2 className="mt-2 text-5xl font-black tracking-tight">{activeCampanha.tema}</h2>
              </div>
              <button onClick={() => setActiveId(null)} className="rounded-full bg-black/10 p-3 transition-colors hover:bg-black/20">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 text-[#6B23CA]">
              <div className="grid gap-10 lg:grid-cols-3">
                <div className="space-y-8 lg:col-span-1">
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[.1em]" style={{ color: activeCampanha.corTematicaHex }}>
                      <Target size={16} /> Público-Alvo & Local
                    </h3>
                    <p className="mb-2 text-sm font-bold text-[#6B23CA]">{activeCampanha.localAcao}</p>
                    <p className="text-sm leading-relaxed text-[#4C1D95]">{activeCampanha.publicoAlvo}</p>
                  </div>
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[.1em]" style={{ color: activeCampanha.corTematicaHex }}>
                      <TrendingUp size={16} /> Retorno (ROI)
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-[#4C1D95]">{activeCampanha.roi}</p>
                    <div className="rounded-xl bg-[#6B23CA] p-5 text-[#f4f1e9]">
                      <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: activeCampanha.corTematicaHex }}>Pitch de Vendas</p>
                      <p className="text-sm italic leading-relaxed">{activeCampanha.pitch}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 lg:col-span-2 lg:grid-cols-2">
                  <div className="rounded-2xl border-2 border-[#6B23CA]/10 bg-white p-6">
                    <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-[.1em]" style={{ color: activeCampanha.corTematicaHex }}>
                      <Boxes size={18} /> Pack Físico
                    </h3>
                    <ul className="space-y-3 text-sm text-[#4C1D95]">
                      {activeCampanha.packFisico?.map((item, index) => (
                        <li key={index} className="flex gap-2">
                          <span style={{ color: activeCampanha.corTematicaHex }}>•</span> <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border-2 border-[#6B23CA]/10 bg-white p-6">
                    <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-[.1em]" style={{ color: activeCampanha.corTematicaHex }}>
                      <Sparkles size={18} /> Pack Digital
                    </h3>
                    <ul className="space-y-3 text-sm text-[#4C1D95]">
                      {activeCampanha.packDigital?.map((item, index) => (
                        <li key={index} className="flex gap-2">
                          <span style={{ color: activeCampanha.corTematicaHex }}>•</span> <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border-2 border-[#6B23CA]/10 bg-white p-6 lg:col-span-2">
                    <h3 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-[.1em]" style={{ color: activeCampanha.corTematicaHex }}>
                      <HeartPulse size={18} /> Pack Clínico & Extensão
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      <ul className="space-y-3 text-sm text-[#4C1D95]">
                        {activeCampanha.packClinico?.map((item, index) => (
                          <li key={index} className="flex gap-2">
                            <span className="font-bold text-[#6B23CA]">+</span> <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="rounded-xl border border-[#6B23CA]/10 bg-[#f4f1e9] p-5 text-sm text-[#4C1D95]">
                        <span className="mb-2 block font-bold text-[#6B23CA]">Extensão à Comunidade:</span>
                        {activeCampanha.extensaoComunidade}
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