'use client'

import { useState } from 'react'
import { ArrowUpRight, BookOpen, CheckCircle2, Quote, Zap, Target, Lightbulb, ShieldAlert, ChevronRight, ChevronLeft } from 'lucide-react'
import { teoriaData } from '../data/teoria'

interface TeoriaProps {
  onGoToApp: () => void;
  onGoToGoogle: () => void;
}

export function TeoriaPap({ onGoToApp, onGoToGoogle }: TeoriaProps) {
  // Estado de Navegação (Typeform Style)
  const [step, setStep] = useState(1)
  const totalSteps = 6

  // Estados de Conteúdo
  const [manifestoSelecionado, setManifestoSelecionado] = useState(teoriaData.manifestoAtivo)
  const [problemaSelecionado, setProblemaSelecionado] = useState<string | null>(null)
  
  // Array para permitir múltiplos autores abertos em simultâneo
  const [autoresAtivos, setAutoresAtivos] = useState<number[]>([])
  
  // Estado da SWOT: Blocos Ativos e Tópicos Enfatizados
  const [selectedInternalBlock, setSelectedInternalBlock] = useState<string | null>(null)
  const [selectedExternalBlock, setSelectedExternalBlock] = useState<string | null>(null)
  const [emphasizedTopics, setEmphasizedTopics] = useState<string[]>([])

  const [isPreparing, setIsPreparing] = useState(false)

  // Ações
  const toggleAutor = (index: number) => {
    setAutoresAtivos(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index])
  }
  
  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps))
  const prevStep = () => setStep((s) => Math.max(s - 1, 1))

  // A chave agora é montada apenas quando blocos completos são selecionados
  const calculatedTowsKey = (selectedInternalBlock && selectedExternalBlock) 
    ? `${selectedInternalBlock}${selectedExternalBlock}` as keyof typeof teoriaData.tows 
    : null;
  const calculatedTows = calculatedTowsKey ? teoriaData.tows[calculatedTowsKey] : null;

  const handlePrepareSolution = () => {
    if (isPreparing) return;
    setIsPreparing(true);
    setTimeout(() => onGoToApp(), 5000);
  };

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#6B23CA] flex flex-col relative overflow-hidden">
      
      {/* BARRA DE PROGRESSO & CABEÇALHO FIXO */}
      <header className="w-full bg-white border-b border-[#6B23CA]/10 sticky top-0 z-50 shadow-sm">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button onClick={onGoToGoogle} className="text-[#6B23CA]/50 hover:text-[#FF7A00] transition-colors">
              <ChevronLeft size={24} />
            </button>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF7A00]">PharmaMedia</p>
              <h1 className="text-sm font-black tracking-tight text-[#6B23CA]">Estratégia & Fundamentação</h1>
            </div>
          </div>
          <div className="text-xs font-bold text-[#6B23CA]/50 uppercase tracking-widest">
            Passo {step} de {totalSteps}
          </div>
        </div>
        <div className="w-full bg-[#f4f1e9] h-1.5">
          <div 
            className="h-full bg-[#FF7A00] transition-all duration-700 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </header>

      {/* ÁREA DE CONTEÚDO */}
      <div className="flex-1 w-full mx-auto max-w-[1000px] px-6 py-12 md:py-20 flex flex-col justify-center">
        
        <div key={step} className="animate-in fade-in slide-in-from-right-8 duration-500 w-full">

          {/* PASSO 1: DIAGNÓSTICO */}
          {step === 1 && (
            <section>
              <div className="mb-10 text-center md:text-left">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A00]">01. O Diagnóstico</p>
                <h2 className="text-4xl font-black tracking-tight md:text-5xl text-[#6B23CA]">As Dores da Farmácia em Portugal</h2>
                <p className="mt-4 text-lg text-[#4C1D95]">Selecione a dor de mercado que a nossa agência se propõe a curar.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {teoriaData.problemasMercado.map((prob) => {
                  const isSelected = problemaSelecionado === prob.id;
                  const hasSelection = problemaSelecionado !== null;
                  const isDimmed = hasSelection && !isSelected;

                  return (
                    <button
                      key={prob.id}
                      onClick={() => setProblemaSelecionado(prob.id)}
                      className={`relative p-8 text-left rounded-3xl border-2 transition-all duration-300 flex flex-col justify-start h-full
                        ${isSelected 
                          ? 'border-[#FF7A00] bg-[#FF7A00] text-white shadow-xl -translate-y-2' 
                          : 'border-[#6B23CA]/10 bg-white hover:border-[#6B23CA]/30 hover:-translate-y-1'
                        }
                        ${isDimmed ? 'opacity-40 grayscale-[50%]' : 'opacity-100'}
                      `}
                    >
                      {isSelected && <CheckCircle2 className="absolute top-6 right-6 text-white opacity-80 animate-in zoom-in" size={24} />}
                      <h3 className={`text-xl font-black mb-3 leading-tight ${isSelected ? 'text-white' : 'text-[#6B23CA]'}`}>
                        {prob.titulo}
                      </h3>
                      <p className={`text-sm leading-relaxed ${isSelected ? 'text-white/90' : 'text-[#4C1D95]'}`}>
                        {prob.descricao}
                      </p>
                    </button>
                  )
                })}
              </div>
            </section>
          )}

          {/* PASSO 2: FUNDAMENTAÇÃO */}
          {step === 2 && (
            <section>
              <div className="mb-10 text-center md:text-left">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A00]">02. Fundamentação Científica</p>
                <h2 className="text-4xl font-black tracking-tight md:text-5xl text-[#6B23CA]">A Ciência por Trás da Agência</h2>
                <p className="mt-4 text-lg text-[#4C1D95]">A literacia em saúde visual está provada por dados. Explore os autores.</p>
              </div>

              <div className="flex flex-col gap-4">
                {teoriaData.fundamentacaoCientifica.map((item, index) => {
                  const isExpanded = autoresAtivos.includes(index);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => toggleAutor(index)}
                      className={`text-left p-6 md:p-8 rounded-3xl border-2 transition-all duration-300
                        ${isExpanded ? 'border-[#FF7A00] bg-white shadow-xl' : 'border-[#6B23CA]/10 bg-white/50 hover:bg-white hover:border-[#6B23CA]/30'}
                      `}
                    >
                      <div className="flex items-center gap-5">
                        <div className={`p-4 rounded-2xl transition-colors ${isExpanded ? 'bg-[#FF7A00] text-white' : 'bg-[#6B23CA]/10 text-[#6B23CA]'}`}>
                          <BookOpen size={24} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold uppercase tracking-widest text-[#FF7A00]">{item.tema}</p>
                          <h4 className={`text-xl font-black ${isExpanded ? 'text-[#6B23CA]' : 'text-[#6B23CA]'}`}>
                            {item.autor}
                          </h4>
                        </div>
                        <ChevronRight className={`transition-transform duration-300 ${isExpanded ? 'rotate-90 text-[#FF7A00]' : 'text-[#6B23CA]/30'}`} />
                      </div>
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-40 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                        <p className="text-base md:text-lg leading-relaxed text-[#4C1D95] italic font-serif border-l-4 border-[#FF7A00] pl-5 py-2 bg-[#FF7A00]/5 rounded-r-xl">
                          &ldquo;{item.tese}&rdquo;
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>
          )}

          {/* PASSO 3: IDENTIDADE E MANIFESTO */}
          {step === 3 && (
            <section>
              <div className="mb-10 text-center md:text-left">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A00]">03. Identidade & Posicionamento</p>
                <h2 className="text-4xl font-black tracking-tight md:text-5xl text-[#6B23CA]">O Manifesto da Agência</h2>
                <p className="mt-4 text-lg text-[#4C1D95]">A forma como falamos dita como somos lembrados. Qual deve ser o nosso slogan?</p>
              </div>

              <div className="mb-12 rounded-[2.5rem] bg-[#6B23CA] p-10 shadow-2xl relative overflow-hidden">
                <Quote size={120} className="absolute -top-10 -right-10 text-white/5 rotate-12 pointer-events-none" />
                <p className="text-xs uppercase tracking-widest text-[#FF7A00] font-bold mb-4 flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-[#FF7A00] animate-pulse"></span>
                  Slogan Ativo no Sistema
                </p>
                <p className="text-3xl md:text-5xl font-black font-serif italic text-white leading-tight">
                  &ldquo;{manifestoSelecionado}&rdquo;
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {teoriaData.manifestosOpcoes.map((frase, index) => (
                  <button
                    key={index}
                    onClick={() => setManifestoSelecionado(frase)}
                    className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 font-bold flex flex-col justify-center min-h-[120px] ${
                      manifestoSelecionado === frase 
                        ? 'border-[#FF7A00] bg-[#FF7A00]/10 text-[#6B23CA] shadow-md -translate-y-1' 
                        : 'border-[#6B23CA]/10 bg-white text-[#4C1D95] hover:border-[#6B23CA]/30'
                    }`}
                  >
                    <span className="text-base">&ldquo;{frase}&rdquo;</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* PASSO 4: BRANDING VISUAL */}
          {step === 4 && (
            <section>
              <div className="mb-10 text-center md:text-left">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A00]">04. Branding Visual</p>
                <h2 className="text-4xl font-black tracking-tight md:text-5xl text-[#6B23CA]">A Anatomia da Marca</h2>
                <p className="mt-4 text-lg text-[#4C1D95]">
                  O logótipo da PharmaMedia nasce da fusão entre a precisão farmacêutica (a pílula) e a dinâmica editorial de uma agência de comunicação moderna.
                </p>
              </div>

              <div className="mb-10 flex justify-center rounded-[2.5rem] bg-[#f4f1e9] p-16 border-2 border-[#6B23CA]/5 shadow-inner group overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF7A00]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl"></div>
                <img 
                  src="/logo-pharmamedia.png" 
                  alt="Logótipo Oficial PharmaMedia" 
                  className="w-full max-w-[340px] h-auto object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply relative z-10" 
                />
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {teoriaData.identidadeVisual.simbolismoCores.map((item, index) => {
                  const isPurple = item.cor.includes('#6B23CA');
                  const isOrange = item.cor.includes('#FF7A00');
                  const dotColor = isPurple ? '#6B23CA' : isOrange ? '#FF7A00' : '#f4f1e9';
                  const colorName = item.cor.split(' (')[0];
                  const hexCode = item.cor.match(/\((.*?)\)/)?.[1] || dotColor;

                  return (
                    <div key={index} className="group relative overflow-hidden rounded-3xl bg-white p-8 border-2 border-[#6B23CA]/5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                      <div className="mb-6 flex items-center gap-4">
                        <div 
                          className="h-14 w-14 shrink-0 rounded-full shadow-inner border border-black/10 transition-transform duration-500 group-hover:scale-125"
                          style={{ backgroundColor: dotColor }}
                        />
                        <div>
                          <span className="block font-black text-sm text-[#6B23CA] uppercase tracking-widest">{colorName}</span>
                          <span className="mt-1 inline-block rounded-md bg-[#f4f1e9] px-2 py-1 text-[10px] font-bold text-[#4C1D95]">
                            {hexCode}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-[#4C1D95]">{item.significado}</p>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* PASSO 5: SWOT E TOWS */}
          {step === 5 && (
            <section>
              <div className="mb-10 text-center md:text-left">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A00]">05. Laboratório Estratégico</p>
                <h2 className="text-4xl font-black tracking-tight md:text-5xl text-[#6B23CA]">Matriz SWOT Dinâmica</h2>
                <p className="mt-4 text-lg text-[#4C1D95]">Clique nos tópicos para enfatizar durante a defesa, e ative os blocos principais para gerar a estratégia cruzada.</p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 mb-10 items-stretch">
                {/* LADO INTERNO */}
                <div className="flex flex-col gap-6 h-full">
                  {/* FORÇAS */}
                  <div className={`flex flex-col flex-1 group relative overflow-hidden rounded-3xl bg-white p-6 md:p-8 shadow-sm border-2 transition-all duration-300
                    ${selectedInternalBlock === 'S' ? 'border-[#FF7A00] shadow-[0_8px_30px_rgba(255,122,0,0.15)]' : 'border-[#6B23CA]/5 hover:border-[#6B23CA]/20'}
                  `}>
                    <span className={`absolute -right-4 -top-8 select-none text-[120px] font-black leading-none transition-transform duration-500 group-hover:scale-110 ${selectedInternalBlock === 'S' ? 'text-[#FF7A00]/5' : 'text-[#6B23CA]/5'}`}>S</span>
                    
                    <div className="relative z-10 flex flex-col flex-1">
                      <button
                        onClick={() => setSelectedInternalBlock(selectedInternalBlock === 'S' ? null : 'S')}
                        className="mb-6 flex w-full items-center justify-between group/header text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${selectedInternalBlock === 'S' ? 'bg-[#FF7A00] text-white' : 'bg-[#6B23CA]/10 text-[#6B23CA] group-hover/header:bg-[#6B23CA]/20'}`}>
                            <Zap size={24} />
                          </div>
                          <h3 className="text-xl font-black text-[#6B23CA] uppercase tracking-widest">Forças</h3>
                        </div>
                        <div className={`text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${selectedInternalBlock === 'S' ? 'bg-[#FF7A00] border-[#FF7A00] text-white' : 'border-[#6B23CA]/20 text-[#6B23CA]/50 group-hover/header:border-[#6B23CA]/50 group-hover/header:text-[#6B23CA]'}`}>
                          {selectedInternalBlock === 'S' ? '✓ Bloco Ativo' : 'Ativar Bloco'}
                        </div>
                      </button>

                      <div className="space-y-3 mt-auto">
                        {teoriaData.swot.forcas.map((item, i) => {
                          const itemId = `S${i}`;
                          const isEmphasized = emphasizedTopics.includes(itemId);
                          const isSelected = selectedInternalBlock === 'S' || isEmphasized;
                          
                          return (
                            <button
                              key={i}
                              onClick={() => setEmphasizedTopics(prev => prev.includes(itemId) ? prev.filter(t => t !== itemId) : [...prev, itemId])}
                              className={`w-full text-left flex gap-3 text-sm p-3 rounded-xl transition-all
                                ${isSelected ? 'bg-[#FF7A00] text-white shadow-md -translate-y-1' : 'bg-[#f4f1e9]/50 text-[#4C1D95] hover:bg-[#FF7A00]/10'}
                              `}
                            >
                              <span className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${isSelected ? 'bg-white/30' : 'bg-[#FF7A00]/20'}`}>
                                <div className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[#FF7A00]'}`}></div>
                              </span>
                              <span className="leading-relaxed">{item}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* FRAQUEZAS */}
                  <div className={`flex flex-col flex-1 group relative overflow-hidden rounded-3xl bg-white p-6 md:p-8 shadow-sm border-2 transition-all duration-300
                    ${selectedInternalBlock === 'W' ? 'border-[#FF7A00] shadow-[0_8px_30px_rgba(255,122,0,0.15)]' : 'border-[#6B23CA]/5 hover:border-[#6B23CA]/20'}
                  `}>
                    <span className={`absolute -right-4 -top-8 select-none text-[120px] font-black leading-none transition-transform duration-500 group-hover:scale-110 ${selectedInternalBlock === 'W' ? 'text-[#FF7A00]/5' : 'text-[#6B23CA]/5'}`}>W</span>
                    
                    <div className="relative z-10 flex flex-col flex-1">
                      <button
                        onClick={() => setSelectedInternalBlock(selectedInternalBlock === 'W' ? null : 'W')}
                        className="mb-6 flex w-full items-center justify-between group/header text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${selectedInternalBlock === 'W' ? 'bg-[#FF7A00] text-white' : 'bg-[#6B23CA]/10 text-[#6B23CA] group-hover/header:bg-[#6B23CA]/20'}`}>
                            <Target size={24} />
                          </div>
                          <h3 className="text-xl font-black text-[#6B23CA] uppercase tracking-widest">Fraquezas</h3>
                        </div>
                        <div className={`text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${selectedInternalBlock === 'W' ? 'bg-[#FF7A00] border-[#FF7A00] text-white' : 'border-[#6B23CA]/20 text-[#6B23CA]/50 group-hover/header:border-[#6B23CA]/50 group-hover/header:text-[#6B23CA]'}`}>
                          {selectedInternalBlock === 'W' ? '✓ Bloco Ativo' : 'Ativar Bloco'}
                        </div>
                      </button>

                      <div className="space-y-3 mt-auto">
                        {teoriaData.swot.fraquezas.map((item, i) => {
                          const itemId = `W${i}`;
                          const isEmphasized = emphasizedTopics.includes(itemId);
                          const isSelected = selectedInternalBlock === 'W' || isEmphasized;
                          
                          return (
                            <button
                              key={i}
                              onClick={() => setEmphasizedTopics(prev => prev.includes(itemId) ? prev.filter(t => t !== itemId) : [...prev, itemId])}
                              className={`w-full text-left flex gap-3 text-sm p-3 rounded-xl transition-all
                                ${isSelected ? 'bg-[#FF7A00] text-white shadow-md -translate-y-1' : 'bg-[#f4f1e9]/50 text-[#4C1D95] hover:bg-[#FF7A00]/10'}
                              `}
                            >
                              <span className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${isSelected ? 'bg-white/30' : 'bg-[#FF7A00]/20'}`}>
                                <div className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[#FF7A00]'}`}></div>
                              </span>
                              <span className="leading-relaxed">{item}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* LADO EXTERNO */}
                <div className="flex flex-col gap-6 h-full">
                  {/* OPORTUNIDADES */}
                  <div className={`flex flex-col flex-1 group relative overflow-hidden rounded-3xl bg-white p-6 md:p-8 shadow-sm border-2 transition-all duration-300
                    ${selectedExternalBlock === 'O' ? 'border-[#FF7A00] shadow-[0_8px_30px_rgba(255,122,0,0.15)]' : 'border-[#6B23CA]/5 hover:border-[#6B23CA]/20'}
                  `}>
                    <span className={`absolute -right-4 -top-8 select-none text-[120px] font-black leading-none transition-transform duration-500 group-hover:scale-110 ${selectedExternalBlock === 'O' ? 'text-[#FF7A00]/5' : 'text-[#6B23CA]/5'}`}>O</span>
                    
                    <div className="relative z-10 flex flex-col flex-1">
                      <button
                        onClick={() => setSelectedExternalBlock(selectedExternalBlock === 'O' ? null : 'O')}
                        className="mb-6 flex w-full items-center justify-between group/header text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${selectedExternalBlock === 'O' ? 'bg-[#FF7A00] text-white' : 'bg-[#6B23CA]/10 text-[#6B23CA] group-hover/header:bg-[#6B23CA]/20'}`}>
                            <Lightbulb size={24} />
                          </div>
                          <h3 className="text-xl font-black text-[#6B23CA] uppercase tracking-widest">Oportunidades</h3>
                        </div>
                        <div className={`text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${selectedExternalBlock === 'O' ? 'bg-[#FF7A00] border-[#FF7A00] text-white' : 'border-[#6B23CA]/20 text-[#6B23CA]/50 group-hover/header:border-[#6B23CA]/50 group-hover/header:text-[#6B23CA]'}`}>
                          {selectedExternalBlock === 'O' ? '✓ Bloco Ativo' : 'Ativar Bloco'}
                        </div>
                      </button>

                      <div className="space-y-3 mt-auto">
                        {teoriaData.swot.oportunidades.map((item, i) => {
                          const itemId = `O${i}`;
                          const isEmphasized = emphasizedTopics.includes(itemId);
                          const isSelected = selectedExternalBlock === 'O' || isEmphasized;
                          
                          return (
                            <button
                              key={i}
                              onClick={() => setEmphasizedTopics(prev => prev.includes(itemId) ? prev.filter(t => t !== itemId) : [...prev, itemId])}
                              className={`w-full text-left flex gap-3 text-sm p-3 rounded-xl transition-all
                                ${isSelected ? 'bg-[#FF7A00] text-white shadow-md -translate-y-1' : 'bg-[#f4f1e9]/50 text-[#4C1D95] hover:bg-[#FF7A00]/10'}
                              `}
                            >
                              <span className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${isSelected ? 'bg-white/30' : 'bg-[#FF7A00]/20'}`}>
                                <div className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[#FF7A00]'}`}></div>
                              </span>
                              <span className="leading-relaxed">{item}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {/* AMEAÇAS */}
                  <div className={`flex flex-col flex-1 group relative overflow-hidden rounded-3xl bg-white p-6 md:p-8 shadow-sm border-2 transition-all duration-300
                    ${selectedExternalBlock === 'T' ? 'border-[#FF7A00] shadow-[0_8px_30px_rgba(255,122,0,0.15)]' : 'border-[#6B23CA]/5 hover:border-[#6B23CA]/20'}
                  `}>
                    <span className={`absolute -right-4 -top-8 select-none text-[120px] font-black leading-none transition-transform duration-500 group-hover:scale-110 ${selectedExternalBlock === 'T' ? 'text-[#FF7A00]/5' : 'text-[#6B23CA]/5'}`}>T</span>
                    
                    <div className="relative z-10 flex flex-col flex-1">
                      <button
                        onClick={() => setSelectedExternalBlock(selectedExternalBlock === 'T' ? null : 'T')}
                        className="mb-6 flex w-full items-center justify-between group/header text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${selectedExternalBlock === 'T' ? 'bg-[#FF7A00] text-white' : 'bg-[#6B23CA]/10 text-[#6B23CA] group-hover/header:bg-[#6B23CA]/20'}`}>
                            <ShieldAlert size={24} />
                          </div>
                          <h3 className="text-xl font-black text-[#6B23CA] uppercase tracking-widest">Ameaças</h3>
                        </div>
                        <div className={`text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${selectedExternalBlock === 'T' ? 'bg-[#FF7A00] border-[#FF7A00] text-white' : 'border-[#6B23CA]/20 text-[#6B23CA]/50 group-hover/header:border-[#6B23CA]/50 group-hover/header:text-[#6B23CA]'}`}>
                          {selectedExternalBlock === 'T' ? '✓ Bloco Ativo' : 'Ativar Bloco'}
                        </div>
                      </button>

                      <div className="space-y-3 mt-auto">
                        {teoriaData.swot.ameacas.map((item, i) => {
                          const itemId = `T${i}`;
                          const isEmphasized = emphasizedTopics.includes(itemId);
                          const isSelected = selectedExternalBlock === 'T' || isEmphasized;
                          
                          return (
                            <button
                              key={i}
                              onClick={() => setEmphasizedTopics(prev => prev.includes(itemId) ? prev.filter(t => t !== itemId) : [...prev, itemId])}
                              className={`w-full text-left flex gap-3 text-sm p-3 rounded-xl transition-all
                                ${isSelected ? 'bg-[#FF7A00] text-white shadow-md -translate-y-1' : 'bg-[#f4f1e9]/50 text-[#4C1D95] hover:bg-[#FF7A00]/10'}
                              `}
                            >
                              <span className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${isSelected ? 'bg-white/30' : 'bg-[#FF7A00]/20'}`}>
                                <div className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[#FF7A00]'}`}></div>
                              </span>
                              <span className="leading-relaxed">{item}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MOTOR TOWS */}
              <div className="rounded-[2.5rem] border-2 border-[#6B23CA]/20 bg-white p-8 md:p-12 transition-all duration-500 min-h-[220px] flex items-center justify-center shadow-lg">
                {calculatedTows ? (
                  <div className="relative z-10 animate-in zoom-in-95 fade-in duration-500 w-full">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                      <div className="shrink-0 rounded-full bg-[#6B23CA] h-24 w-24 flex items-center justify-center text-3xl font-black text-white shadow-lg">
                        {calculatedTowsKey}
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#FF7A00] mb-1">{calculatedTows.formula}</p>
                        <h3 className="text-2xl font-black text-[#6B23CA] mb-3">{calculatedTows.tipo}</h3>
                        <p className="text-sm md:text-base leading-relaxed text-[#4C1D95] font-medium bg-[#f4f1e9] p-5 rounded-2xl">
                          {calculatedTows.estrategia}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center opacity-60">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#6B23CA]/10 text-[#6B23CA] mb-4">
                      <Zap size={32} className="animate-pulse" />
                    </div>
                    <h3 className="text-xl font-bold text-[#6B23CA]">Motor Estratégico TOWS</h3>
                    <p className="text-sm text-[#4C1D95] max-w-sm mx-auto mt-2">
                      Ative 1 Bloco Interno e 1 Bloco Externo para gerar a estratégia.
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* PASSO 6: O LANÇAMENTO (FIM) */}
          {step === 6 && (
            <section className="flex flex-col items-center justify-center text-center min-h-[60vh]">
              <h2 className="text-5xl font-black tracking-tight md:text-7xl text-[#6B23CA] mb-6">
                Tudo a postos.
              </h2>
              <p className="max-w-xl text-xl leading-relaxed text-[#4C1D95] mb-16">
                Fundamentação validada. Identidade consolidada. Estratégia de mercado gerada com sucesso. Apresente agora ao júri a plataforma em ação.
              </p>

              <button
                onClick={handlePrepareSolution}
                disabled={isPreparing}
                className={`group relative overflow-hidden rounded-full border-4 border-white bg-[#FF7A00] px-14 py-8 text-center text-white transition-all duration-300 shadow-2xl shadow-[#FF7A00]/40 ${
                  isPreparing ? 'scale-105 cursor-wait' : 'hover:scale-105 hover:bg-[#E66E00]'
                }`}
              >
                <div 
                  className="absolute inset-y-0 left-0 bg-[#6B23CA] transition-all ease-linear"
                  style={{ width: isPreparing ? '100%' : '0%', transitionDuration: isPreparing ? '5000ms' : '0ms' }}
                />
                <span className="relative z-10 flex flex-col items-center">
                  <span className="flex items-center gap-3 text-3xl font-black drop-shadow-sm tracking-tight">
                    {isPreparing ? 'A Preparar Solução...' : 'Preparar Solução'}
                    {!isPreparing && <ArrowUpRight size={32} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                  </span>
                  <span className="mt-2 text-sm font-bold uppercase tracking-widest opacity-90 drop-shadow-sm">
                    {isPreparing ? 'Por favor, aguarde' : '(Agitar antes de apresentar)'}
                  </span>
                </span>
              </button>
            </section>
          )}

        </div>
      </div>

      {/* RODAPÉ DE NAVEGAÇÃO (Fixo no Fundo) */}
      {step < 6 && (
        <div className="w-full bg-white border-t border-[#6B23CA]/10 sticky bottom-0 z-50 p-4 md:px-16 md:py-6 flex justify-between items-center shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className={`font-bold text-sm tracking-wider uppercase transition-colors px-6 py-3 rounded-full flex items-center gap-2 ${step === 1 ? 'opacity-0 cursor-default' : 'text-[#6B23CA] hover:bg-[#6B23CA]/10'}`}
          >
            <ChevronLeft size={18} /> Recuar
          </button>
          
          <button 
            onClick={nextStep}
            disabled={(step === 1 && !problemaSelecionado) || (step === 5 && !calculatedTowsKey)}
            className={`font-bold text-sm tracking-wider uppercase transition-all px-8 py-3 rounded-full flex items-center gap-2 shadow-md hover:-translate-y-0.5
              ${(step === 1 && !problemaSelecionado) || (step === 5 && !calculatedTowsKey) ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 'bg-[#6B23CA] text-white hover:bg-[#561CA3] hover:shadow-lg'}
            `}
          >
            Continuar <ChevronRight size={18} />
          </button>
        </div>
      )}

    </main>
  );
}