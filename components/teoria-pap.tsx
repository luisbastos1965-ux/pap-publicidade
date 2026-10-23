'use client'

import { useState } from 'react'
import { ArrowUpRight, BookOpen, CheckCircle2, Quote, Zap, Target, Lightbulb, ShieldAlert } from 'lucide-react'
import { teoriaData } from '../data/teoria'

interface TeoriaProps {
  onGoToApp: () => void;
  onGoToGoogle: () => void;
}

export function TeoriaPap({ onGoToApp, onGoToGoogle }: TeoriaProps) {
  const [manifestoSelecionado, setManifestoSelecionado] = useState(teoriaData.manifestoAtivo)
  const [problemaSelecionado, setProblemaSelecionado] = useState<string | null>(null)
  const [autorAtivo, setAutorAtivo] = useState<number | null>(null)
  
  // Estados para a Matriz TOWS Interativa
  const [selectedInternal, setSelectedInternal] = useState<string | null>(null)
  const [selectedExternal, setSelectedExternal] = useState<string | null>(null)

  // Estado para a animação do botão final
  const [isPreparing, setIsPreparing] = useState(false)

  const toggleAutor = (index: number) => {
    setAutorAtivo(autorAtivo === index ? null : index)
  }

  // Lógica de cálculo da TOWS
  const calculatedTowsKey = (selectedInternal && selectedExternal) 
    ? `${selectedInternal[0]}${selectedExternal[0]}` as keyof typeof teoriaData.tows 
    : null;
  const calculatedTows = calculatedTowsKey ? teoriaData.tows[calculatedTowsKey] : null;

  // Função que inicia a animação de 5 segundos e depois muda de ecrã
  const handlePrepareSolution = () => {
    if (isPreparing) return;
    setIsPreparing(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' }); // Força a página a ir para o topo!
      onGoToApp();
    }, 5000);
  };

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#6B23CA] relative px-6 py-12 md:px-16 lg:py-20 animate-in fade-in duration-500">
      <div className="mx-auto max-w-[1200px]">
        
        {/* Cabeçalho */}
        <div className="mb-16 flex flex-col justify-between gap-6 border-b border-[#6B23CA]/20 pb-8 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A00]">Prova de Aptidão Profissional (PAP) — Estratégia</p>
            <h1 className="text-4xl font-black tracking-tight md:text-6xl text-[#6B23CA]">PharmaMedia</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onGoToGoogle}
              className="text-xs font-bold uppercase tracking-wider text-[#6B23CA] hover:text-[#FF7A00]"
            >
              ← Simulação Google
            </button>
            <button
              onClick={onGoToApp}
              className="group inline-flex items-center gap-3 rounded-full bg-[#FF7A00] px-8 py-5 text-sm font-bold text-white transition-all hover:gap-5 hover:bg-[#E66E00] shadow-xl"
            >
              Aceder ao Lookbook <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        {/* 01. Diagnóstico */}
        <section className="mb-20">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A00]">01. O Diagnóstico</p>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl text-[#6B23CA]">As Dores da Farmácia em Portugal</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {teoriaData.problemasMercado.map((prob) => {
              const isSelected = problemaSelecionado === prob.id;
              const hasSelection = problemaSelecionado !== null;
              const isDimmed = hasSelection && !isSelected;

              return (
                <button
                  key={prob.id}
                  onClick={() => setProblemaSelecionado(prob.id)}
                  className={`relative p-6 text-left rounded-2xl border-2 transition-all duration-300 flex flex-col justify-start h-full
                    ${isSelected 
                      ? 'border-[#FF7A00] bg-[#FF7A00] text-white shadow-lg -translate-y-2' 
                      : 'border-[#6B23CA]/10 bg-white hover:border-[#6B23CA]/30'
                    }
                    ${isDimmed ? 'opacity-40 grayscale-[50%]' : 'opacity-100'}
                  `}
                >
                  {isSelected && <CheckCircle2 className="absolute top-4 right-4 text-white opacity-80" size={20} />}
                  <h3 className={`text-lg font-black mb-3 leading-tight ${isSelected ? 'text-white' : 'text-[#6B23CA]'}`}>
                    {prob.titulo}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isSelected ? 'text-white/90' : 'text-[#4C1D95]'}`}>
                    {prob.descricao}
                  </p>
                </button>
              )
            })}
          </div>

          {problemaSelecionado && (
            <div className="mt-8 rounded-2xl bg-[#561CA3] p-8 text-white shadow-xl animate-in slide-in-from-top-4 fade-in duration-500 border border-white/10">
              {teoriaData.problemasMercado.find(p => p.id === problemaSelecionado)?.isTarget ? (
                <>
                  <p className="text-xs uppercase tracking-widest text-[#FF7A00] font-bold mb-3 flex items-center gap-2">
                    🎯 O Nosso Propósito
                  </p>
                  <p className="text-xl md:text-2xl font-serif italic">
                    {teoriaData.problemasMercado.find(p => p.id === problemaSelecionado)?.solucaoPharmaMedia}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs uppercase tracking-widest text-white/50 font-bold mb-3">
                    🔍 Problema Secundário
                  </p>
                  <p className="text-lg">
                    Este é um problema real, mas não é o foco central da nossa agência. Tente encontrar a dor que a PharmaMedia se propõe a curar.
                  </p>
                </>
              )}
            </div>
          )}
        </section>

        {/* 02. Fundamentação Científica */}
        <section className="mb-20 rounded-3xl border-2 border-[#6B23CA]/10 bg-white p-8 md:p-10 shadow-sm">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A00]">02. Fundamentação Científica</h2>
              <h3 className="text-2xl font-black text-[#6B23CA]">A Ciência por Trás da Agência</h3>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {teoriaData.fundamentacaoCientifica.map((item, index) => {
              const isExpanded = autorAtivo === index;
              return (
                <button
                  key={index}
                  onClick={() => toggleAutor(index)}
                  className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-start
                    ${isExpanded ? 'border-[#FF7A00] bg-[#FF7A00]/5 shadow-md' : 'border-[#6B23CA]/10 bg-white hover:border-[#6B23CA]/30'}
                  `}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${isExpanded ? 'bg-[#FF7A00] text-white' : 'bg-[#6B23CA]/10 text-[#6B23CA]'}`}>
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF7A00]">{item.tema}</p>
                      <h4 className={`text-lg font-black ${isExpanded ? 'text-[#FF7A00]' : 'text-[#6B23CA]'}`}>
                        {item.autor}
                      </h4>
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm leading-relaxed text-[#4C1D95] italic font-serif border-l-2 border-[#FF7A00] pl-3">
                      &ldquo;{item.tese}&rdquo;
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* 03. Identidade & Posicionamento */}
        <section className="mb-20 rounded-[2.5rem] bg-[#6B23CA] p-10 text-[#f4f1e9] md:p-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A00]">03. Identidade & Posicionamento</p>
              <h3 className="text-3xl font-black md:text-4xl">O Manifesto da Agência</h3>
            </div>
          </div>

          <div className="mb-10 rounded-2xl bg-[#561CA3] p-8 border border-white/10 shadow-inner">
            <p className="text-xs uppercase tracking-widest text-[#FF7A00] font-bold mb-2 flex items-center gap-2">
              <Quote size={14} /> Slogan Ativo:
            </p>
            <p className="text-2xl md:text-4xl font-black font-serif italic text-white">
              &ldquo;{manifestoSelecionado}&rdquo;
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {teoriaData.manifestosOpcoes.map((frase, index) => (
              <button
                key={index}
                onClick={() => setManifestoSelecionado(frase)}
                className={`text-left p-4 rounded-xl border transition-all text-sm font-bold flex items-center justify-between ${
                  manifestoSelecionado === frase ? 'border-[#FF7A00] bg-[#FF7A00]/20 text-white' : 'border-white/10 bg-white/5 text-[#f4f1e9]/80 hover:bg-white/10'
                }`}
              >
                <span>&ldquo;{frase}&rdquo;</span>
                {manifestoSelecionado === frase && <span className="text-[#FF7A00]">✓ Ativo</span>}
              </button>
            ))}
          </div>
        </section>

        {/* Secção 4: Branding & Design */}
        <section className="mb-20 rounded-[2.5rem] border-2 border-[#6B23CA]/10 bg-white p-10 md:p-16 shadow-sm">
          <div className="mb-12 flex flex-col md:flex-row gap-10 items-center justify-between">
            <div className="flex-1">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A00]">04. Branding & Design</p>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl text-[#6B23CA]">Construção Visual</h2>
              <p className="mt-4 text-sm text-[#4C1D95] leading-relaxed max-w-xl">
                {teoriaData.identidadeVisual.conceitoLogo}
              </p>
            </div>
            
            {/* CAIXA DO LOGÓTIPO COM MISTURA DE CORES */}
            <div className="w-full md:w-[45%] flex justify-center items-center rounded-3xl bg-[#f4f1e9] p-12 border-2 border-[#6B23CA]/5 shadow-inner group overflow-hidden relative">
              {/* Brilho de fundo no hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF7A00]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 blur-xl"></div>
              
              <img 
                src="/logo-pharmamedia.png" 
                alt="Logótipo Oficial PharmaMedia" 
                // A magia acontece aqui com o mix-blend-multiply
                className="w-full max-w-[280px] h-auto object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply relative z-10" 
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {teoriaData.identidadeVisual.simbolismoCores.map((item, index) => {
              // Extração inteligente da cor e do texto
              const isPurple = item.cor.includes('#6B23CA');
              const isOrange = item.cor.includes('#FF7A00');
              const dotColor = isPurple ? '#6B23CA' : isOrange ? '#FF7A00' : '#f4f1e9';
              const colorName = item.cor.split(' (')[0];
              const hexCode = item.cor.match(/\((.*?)\)/)?.[1] || dotColor;

              return (
                <div key={index} className="group relative overflow-hidden rounded-2xl bg-[#f4f1e9] p-8 border-2 border-[#6B23CA]/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                  <div className="mb-5 flex items-center gap-4">
                    {/* A Amostra de Cor (Swatch) */}
                    <div 
                      className="h-12 w-12 shrink-0 rounded-full shadow-inner border border-black/10 transition-transform duration-500 group-hover:scale-125"
                      style={{ backgroundColor: dotColor }}
                    />
                    <div>
                      <span className="block font-black text-sm text-[#6B23CA] uppercase tracking-widest">{colorName}</span>
                      <span className="mt-1 inline-block rounded-md bg-white px-2 py-1 text-[10px] font-bold text-[#4C1D95] shadow-sm">
                        {hexCode}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-[#4C1D95]">{item.significado}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* 05. SWOT & TOWS (O LABORATÓRIO ESTRATÉGICO) */}
        <section className="mb-20">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FF7A00]">05. Estratégia de Mercado</p>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl text-[#6B23CA]">Matriz SWOT Dinâmica</h2>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 mb-10">
            
            {/* FORÇAS (INTERNO) */}
            <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm border-2 border-[#6B23CA]/5">
              <span className="absolute -right-4 -top-8 select-none text-[120px] font-black leading-none text-[#6B23CA]/5 transition-transform duration-500 group-hover:scale-110">S</span>
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6B23CA]/10 text-[#6B23CA]">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-xl font-black text-[#6B23CA] uppercase tracking-widest">Forças</h3>
                </div>
                <div className="space-y-3">
                  {teoriaData.swot.forcas.map((item, i) => {
                    const isSelected = selectedInternal === `S${i}`
                    return (
                      <button 
                        key={i} 
                        onClick={() => setSelectedInternal(isSelected ? null : `S${i}`)}
                        className={`w-full text-left flex gap-3 text-sm p-3 rounded-xl transition-all ${isSelected ? 'bg-[#FF7A00] text-white shadow-md -translate-y-1' : 'bg-[#f4f1e9]/50 text-[#4C1D95] hover:bg-[#FF7A00]/10'}`}
                      >
                        <span className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${isSelected ? 'bg-white/30' : 'bg-[#FF7A00]/20'}`}><div className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[#FF7A00]'}`}></div></span>
                        <span className="leading-relaxed">{item}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* FRAQUEZAS (INTERNO) */}
            <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm border-2 border-[#6B23CA]/5">
              <span className="absolute -right-4 -top-8 select-none text-[120px] font-black leading-none text-[#6B23CA]/5 transition-transform duration-500 group-hover:scale-110">W</span>
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6B23CA]/10 text-[#6B23CA]">
                    <Target size={24} />
                  </div>
                  <h3 className="text-xl font-black text-[#6B23CA] uppercase tracking-widest">Fraquezas</h3>
                </div>
                <div className="space-y-3">
                  {teoriaData.swot.fraquezas.map((item, i) => {
                    const isSelected = selectedInternal === `W${i}`
                    return (
                      <button 
                        key={i} 
                        onClick={() => setSelectedInternal(isSelected ? null : `W${i}`)}
                        className={`w-full text-left flex gap-3 text-sm p-3 rounded-xl transition-all ${isSelected ? 'bg-[#FF7A00] text-white shadow-md -translate-y-1' : 'bg-[#f4f1e9]/50 text-[#4C1D95] hover:bg-[#FF7A00]/10'}`}
                      >
                        <span className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${isSelected ? 'bg-white/30' : 'bg-[#FF7A00]/20'}`}><div className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[#FF7A00]'}`}></div></span>
                        <span className="leading-relaxed">{item}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* OPORTUNIDADES (EXTERNO) */}
            <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm border-2 border-[#6B23CA]/5">
              <span className="absolute -right-4 -top-8 select-none text-[120px] font-black leading-none text-[#6B23CA]/5 transition-transform duration-500 group-hover:scale-110">O</span>
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6B23CA]/10 text-[#6B23CA]">
                    <Lightbulb size={24} />
                  </div>
                  <h3 className="text-xl font-black text-[#6B23CA] uppercase tracking-widest">Oportunidades</h3>
                </div>
                <div className="space-y-3">
                  {teoriaData.swot.oportunidades.map((item, i) => {
                    const isSelected = selectedExternal === `O${i}`
                    return (
                      <button 
                        key={i} 
                        onClick={() => setSelectedExternal(isSelected ? null : `O${i}`)}
                        className={`w-full text-left flex gap-3 text-sm p-3 rounded-xl transition-all ${isSelected ? 'bg-[#FF7A00] text-white shadow-md -translate-y-1' : 'bg-[#f4f1e9]/50 text-[#4C1D95] hover:bg-[#FF7A00]/10'}`}
                      >
                        <span className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${isSelected ? 'bg-white/30' : 'bg-[#FF7A00]/20'}`}><div className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[#FF7A00]'}`}></div></span>
                        <span className="leading-relaxed">{item}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* AMEAÇAS (EXTERNO) */}
            <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm border-2 border-[#6B23CA]/5">
              <span className="absolute -right-4 -top-8 select-none text-[120px] font-black leading-none text-[#6B23CA]/5 transition-transform duration-500 group-hover:scale-110">T</span>
              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6B23CA]/10 text-[#6B23CA]">
                    <ShieldAlert size={24} />
                  </div>
                  <h3 className="text-xl font-black text-[#6B23CA] uppercase tracking-widest">Ameaças</h3>
                </div>
                <div className="space-y-3">
                  {teoriaData.swot.ameacas.map((item, i) => {
                    const isSelected = selectedExternal === `T${i}`
                    return (
                      <button 
                        key={i} 
                        onClick={() => setSelectedExternal(isSelected ? null : `T${i}`)}
                        className={`w-full text-left flex gap-3 text-sm p-3 rounded-xl transition-all ${isSelected ? 'bg-[#FF7A00] text-white shadow-md -translate-y-1' : 'bg-[#f4f1e9]/50 text-[#4C1D95] hover:bg-[#FF7A00]/10'}`}
                      >
                        <span className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${isSelected ? 'bg-white/30' : 'bg-[#FF7A00]/20'}`}><div className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[#FF7A00]'}`}></div></span>
                        <span className="leading-relaxed">{item}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* CÁLCULO DA MATRIZ TOWS */}
          <div className="rounded-[2.5rem] border-2 border-[#6B23CA]/20 bg-[#f4f1e9] p-8 md:p-12 transition-all duration-500 min-h-[200px] flex items-center justify-center relative overflow-hidden">
            {calculatedTows ? (
              <div className="relative z-10 animate-in zoom-in-95 fade-in duration-500 w-full">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                  <div className="shrink-0 rounded-full bg-[#6B23CA] h-24 w-24 flex items-center justify-center text-3xl font-black text-white shadow-lg shadow-[#6B23CA]/30">
                    {calculatedTowsKey}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#FF7A00] mb-1">{calculatedTows.formula}</p>
                    <h3 className="text-2xl font-black text-[#6B23CA] mb-3">{calculatedTows.tipo}</h3>
                    <p className="text-sm md:text-base leading-relaxed text-[#4C1D95] font-medium bg-white p-5 rounded-2xl shadow-sm border border-[#6B23CA]/10">
                      {calculatedTows.estrategia}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center relative z-10 opacity-60">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#6B23CA]/10 text-[#6B23CA] mb-4">
                  <Zap size={32} className="animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-[#6B23CA]">Motor Estratégico TOWS</h3>
                <p className="text-sm text-[#4C1D95] max-w-sm mx-auto mt-2">Para gerar o plano de ação cruzado, selecione acima 1 fator interno (Força/Fraqueza) e 1 fator externo (Oportunidade/Ameaça).</p>
              </div>
            )}
          </div>
        </section>

        {/* Transição */}
        <div className="flex justify-center pb-12 mt-12">
          <button
            onClick={handlePrepareSolution}
            disabled={isPreparing}
            className={`group relative overflow-hidden rounded-full border-4 border-white bg-[#FF7A00] px-12 py-5 text-center text-white transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF7A00]/40 ${
              isPreparing ? 'scale-105 cursor-wait' : 'hover:scale-105 hover:bg-[#E66E00]'
            }`}
          >
            {/* O "Líquido" da Solução a encher */}
            <div 
              className="absolute inset-y-0 left-0 bg-[#6B23CA] transition-all ease-linear"
              style={{ 
                width: isPreparing ? '100%' : '0%', 
                transitionDuration: isPreparing ? '5000ms' : '0ms' 
              }}
            />

            {/* Textos sobrepostos à animação */}
            <span className="relative z-10 flex flex-col items-center">
              <span className="flex items-center gap-2 text-2xl font-black drop-shadow-sm">
                {isPreparing ? 'A Preparar Solução...' : 'Preparar Solução'}
                {!isPreparing && <ArrowUpRight size={24} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
              </span>
              <span className="mt-1 text-xs font-bold uppercase tracking-widest opacity-90 drop-shadow-sm">
                {isPreparing ? 'Por favor, aguarde' : '(Agitar antes de apresentar)'}
              </span>
            </span>
          </button>
        </div>

      </div>
    </main>
  );
}