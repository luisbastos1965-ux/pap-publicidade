'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight, BookOpen, CheckCircle2, Quote, Zap, Target, Lightbulb, ShieldAlert, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'
import { teoriaData } from '../data/teoria'

interface TeoriaProps {
  onGoToApp: () => void;
  onGoToGoogle: () => void;
}

export function TeoriaPap({ onGoToApp, onGoToGoogle }: TeoriaProps) {
  // Estado de Navegação (Typeform Style)
  const [step, setStep] = useState(1)
  const totalSteps = 6
  const [coresDesbloqueadas, setCoresDesbloqueadas] = useState<string[]>([]);

  // Estados de Conteúdo
  const [manifestoSelecionado, setManifestoSelecionado] = useState(teoriaData.manifestoAtivo)
  const [pilaresManifesto, setPilaresManifesto] = useState<string[]>([])
  const [displayedSlogan, setDisplayedSlogan] = useState("") // <-- ADICIONADO AQUI
  const [problemaSelecionado, setProblemaSelecionado] = useState<string | null>(null)
  
  // O "Motor" Inteligente de Evolução e Apagamento Parcial
  useEffect(() => {
    let text = "";
    
    if (pilaresManifesto.length === 0) text = "";
    else if (pilaresManifesto.length === 3) {
      text = "Levamos a saúde mais longe, aproximamos a farmácia de todos!";
    }
    else if (pilaresManifesto.length === 1) {
      if (pilaresManifesto.includes('saude')) text = "Levamos a saúde mais perto de todos.";
      if (pilaresManifesto.includes('alcance')) text = "Levamos a farmácia mais longe.";
      if (pilaresManifesto.includes('proximidade')) text = "Aproximamos a farmácia de todos.";
    }
    else if (pilaresManifesto.length === 2) {
      if (pilaresManifesto.includes('saude') && pilaresManifesto.includes('alcance')) {
        text = "Levamos a saúde mais longe e a todos.";
      }
      if (pilaresManifesto.includes('saude') && pilaresManifesto.includes('proximidade')) {
        text = "Levamos a saúde, aproximando a farmácia de todos.";
      }
      if (pilaresManifesto.includes('alcance') && pilaresManifesto.includes('proximidade')) {
        text = "Levamos a farmácia mais longe, aproximando-a de todos.";
      }
    }

    if (!text) {
      setDisplayedSlogan("");
      return;
    }
    
    // Efeito de escrita e apagamento progressivo fluido
    let currentText = displayedSlogan;
    let i = currentText.length;
    
    // Primeiro, retira letras se o texto atual for maior que o desejado (simula o apagar)
    const backspaceInterval = setInterval(() => {
      if (currentText.length > 0 && text.startsWith(currentText) === false) {
        currentText = currentText.slice(0, -1);
        setDisplayedSlogan(currentText);
      } else {
        clearInterval(backspaceInterval);
        
        // Depois, escreve as novas letras até atingir o texto final
        let targetLength = currentText.length;
        const typeInterval = setInterval(() => {
          if (targetLength < text.length) {
            targetLength++;
            setDisplayedSlogan(text.substring(0, targetLength));
          } else {
            clearInterval(typeInterval);
          }
        }, 25);
      }
    }, 20);

    return () => {
      clearInterval(backspaceInterval);
    };
  }, [pilaresManifesto]);
  
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
    setTimeout(() => onGoToApp(), 3000); // <-- Reduzido para 2.5s (Tempo perfeito!)
  };

  return (
    <main className="min-h-screen bg-[#f4f1e9] text-[#6B23CA] flex flex-col relative overflow-hidden">
      
      {/* BARRA DE PROGRESSO & CABEÇALHO FIXO */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-[#6B23CA]/10 sticky top-0 z-50">
        {/* Barra de progresso ultra-fina no topo */}
        <div className="absolute top-0 left-0 w-full bg-[#f4f1e9]/50 h-[3px]">
          <div 
            className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FFA726] transition-all duration-700 ease-out shadow-[0_0_10px_#FF7A00]/50"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Container ocupando a largura total */}
        <div className="flex w-full items-center justify-between px-6 md:px-12 lg:px-16 py-4 mt-1">
          <div className="flex items-center gap-4">
            {/* Botão de Voltar em formato circular */}
            <button 
              onClick={onGoToGoogle} 
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6B23CA]/5 text-[#6B23CA] hover:bg-[#FF7A00] hover:text-white transition-all duration-300"
              title="Voltar ao Google"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <div className="flex flex-col">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF7A00] mb-0.5">PharmaMedia</p>
              <h1 className="text-sm font-bold tracking-wide text-[#6B23CA]">Estratégia & Fundamentação</h1>
            </div>
          </div>
          
          {/* Indicador de Progresso: Apenas Cápsulas 3D Aesthetic */}
          <div className="flex items-center gap-2 md:gap-3 pr-2">
            {Array.from({ length: totalSteps }).map((_, i) => {
              const isActive = i < step;
              return (
                <div 
                  key={i}
                  // FORMATO MAIS GORDINHO (w-7 h-3.5), INCLINADO (-rotate-20) e com SOMBRAS REAIS
                  className={`relative w-[24px] h-[12px] md:w-[28px] md:h-[14px] rounded-full flex overflow-hidden shadow-[inset_0_-3px_4px_rgba(0,0,0,0.25)] transition-all duration-500 transform origin-center
                    ${isActive ? '-rotate-[20deg] scale-110 drop-shadow-md' : 'rotate-0 scale-90 opacity-20 grayscale hover:scale-95 hover:opacity-40'}
                  `}
                >
                  {/* Metade Esquerda (Roxo) */}
                  <div className="w-1/2 h-full bg-gradient-to-br from-[#873bea] via-[#6B23CA] to-[#45118a]"></div>
                  {/* Metade Direita (Laranja) */}
                  <div className="w-1/2 h-full bg-gradient-to-br from-[#ffa34d] via-[#FF7A00] to-[#cc6200]"></div>
                  
                  {/* Vinco Central */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/30 -translate-x-1/2"></div>
                  
                  {/* Brilho 3D (Glare) Superior muito mais pronunciado */}
                  <div className="absolute top-[1px] left-[8%] right-[8%] h-[4px] rounded-full bg-gradient-to-b from-white/90 to-transparent blur-[0.5px]"></div>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* ÁREA DE CONTEÚDO */}
      {/* O limite passou para 1400px para permitir cartões bem mais largos */}
      <div className="flex-1 w-full mx-auto max-w-[1400px] px-6 md:px-12 py-6 md:py-8 flex flex-col justify-center">
        
        <div key={step} className="animate-in fade-in slide-in-from-right-8 duration-500 w-full">

          {/* PASSO 1: DIAGNÓSTICO */}
          {step === 1 && (
            <section className="w-full flex flex-col items-center justify-center">
              
              <div className="mb-10 md:mb-14 text-center px-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#6B23CA]">
                  Dores da Farmácia em Portugal
                </h2>
              </div>

              {/* Grelha larga */}
              <div className="grid gap-6 md:gap-10 md:grid-cols-3 w-full mx-auto">
                {/* Reordenamos o array "on the fly" para que a "Falta de Tempo" fique no meio */}
                {[
                  teoriaData.problemasMercado[0], 
                  teoriaData.problemasMercado[2], 
                  teoriaData.problemasMercado[1]
                ].map((prob) => {
                  const isSelected = problemaSelecionado === prob.id;
                  const hasSelection = problemaSelecionado !== null;
                  const isDimmed = hasSelection && !isSelected;

                  return (
                    <button
                      key={prob.id}
                      onClick={() => setProblemaSelecionado(prob.id)}
                      className={`relative p-8 md:p-10 text-left rounded-3xl transition-all duration-500 flex flex-col justify-start min-h-[280px] group outline-none
                        ${isSelected 
                          // Mudança para o tema Laranja quando selecionado
                          ? 'border-[3px] border-[#FF7A00] bg-[#FF7A00]/5 shadow-[0_10px_25px_rgba(255,122,0,0.15)] -translate-y-2' 
                          : 'border-2 border-[#6B23CA]/10 bg-white hover:border-[#6B23CA]/30 hover:shadow-[0_10px_20px_rgba(107,35,202,0.08)] hover:-translate-y-1'
                        }
                        ${isDimmed ? 'opacity-40 grayscale-[30%]' : 'opacity-100'}
                      `}
                    >
                      {isSelected && (
                        <div className="absolute top-6 right-6 md:top-8 md:right-8">
                          {/* Ícone de Check a Laranja */}
                          <CheckCircle2 className="text-[#FF7A00] animate-in zoom-in duration-300" size={28} strokeWidth={2.5} />
                        </div>
                      )}

                      {/* Título: Fica Laranja quando selecionado */}
                      <h3 className={`text-2xl md:text-3xl font-black mb-3 md:mb-5 leading-tight transition-colors duration-300 ${isSelected ? 'text-[#FF7A00] pr-8' : 'text-[#6B23CA]'}`}>
                        {prob.titulo}
                      </h3>
                      
                      {/* Descrição: Fica com um tom de laranja muito escuro/castanho para garantir a leitura */}
                      <p className={`text-base md:text-lg leading-relaxed transition-colors duration-300 ${isSelected ? 'text-[#9a4900] font-medium' : 'text-[#4C1D95]/65'}`}>
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
            <section className="w-full flex flex-col items-center justify-center">
              
              <div className="mb-10 md:mb-14 text-center px-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#6B23CA]">
                  Ciência por Trás da Agência
                </h2>
              </div>

              {/* Grelha de 3 Colunas: Design limpo, sem ícones e alinhado ao topo */}
              <div className="grid gap-6 md:gap-8 md:grid-cols-3 w-full max-w-[1400px] mx-auto">
                {teoriaData.fundamentacaoCientifica.map((item, index) => {
                  const isExpanded = autoresAtivos.includes(index);
                  
                  // Limpa automaticamente o texto entre parênteses para manter a grelha perfeitamente alinhada
                  const autorLimpo = item.autor.replace(" (Federação Internacional)", "");
                  
                  return (
                    <button
                      key={index}
                      onClick={() => toggleAutor(index)}
                      className={`relative p-8 md:p-10 text-left rounded-3xl transition-all duration-500 flex flex-col justify-start h-full group outline-none
                        ${isExpanded 
                          ? 'border-[3px] border-[#FF7A00] bg-white shadow-[0_15px_30px_rgba(255,122,0,0.12)] -translate-y-2' 
                          : 'border-2 border-[#6B23CA]/10 bg-white hover:border-[#6B23CA]/30 hover:shadow-[0_10px_20px_rgba(107,35,202,0.06)] hover:-translate-y-1'
                        }
                      `}
                    >
                      {/* Topo do Cartão: Categoria (Kicker) e Seta */}
                      <div className="flex justify-between items-start w-full mb-4 md:mb-5">
                        <p className={`text-[10px] md:text-xs font-black uppercase tracking-[0.25em] transition-colors duration-300 mt-1 ${isExpanded ? 'text-[#FF7A00]/90' : 'text-[#6B23CA]/50'}`}>
                          {item.tema}
                        </p>
                        <ChevronRight className={`transition-transform duration-500 w-7 h-7 -mt-1 shrink-0 ${isExpanded ? 'rotate-90 text-[#FF7A00]' : 'text-[#6B23CA]/30 group-hover:text-[#6B23CA]/50'}`} />
                      </div>
                      
                      {/* Autor (com o nome encurtado dinamicamente) */}
                      <div className="w-full">
                        <h4 className={`text-2xl md:text-3xl font-black transition-colors duration-300 leading-tight ${isExpanded ? 'text-[#FF7A00]' : 'text-[#6B23CA]'}`}>
                          {autorLimpo}
                        </h4>
                      </div>
                      
                      {/* Caixa da Citação (Agora em Itálico) */}
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out w-full ${isExpanded ? 'max-h-[400px] opacity-100 mt-6 md:mt-8' : 'max-h-0 opacity-0'}`}>
                        <p className="italic text-sm md:text-base leading-relaxed text-[#9a4900] border-l-4 border-[#FF7A00] pl-4 md:pl-5 py-2 md:py-3 bg-[#FF7A00]/5 rounded-r-2xl">
                          &ldquo;{item.tese}&rdquo;
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>
          )}

          {/* PASSO 3: BRANDING VISUAL (Logótipo e Cores) */}
          {step === 3 && (
            <section className="w-full flex flex-col items-center justify-center">
              
              <div className="mb-8 md:mb-12 text-center px-4 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#6B23CA]">
                  Anatomia da Marca
                </h2>
              </div>

              {/* Grelha Lado a Lado */}
              <div className="grid gap-6 md:gap-8 md:grid-cols-12 w-full max-w-[1300px] mx-auto items-stretch">
                
                {/* ESQUERDA: Logótipo Dinâmico Maximizados */}
                <div className="md:col-span-5 flex justify-center items-center rounded-[2.5rem] bg-[#f4f1e9] p-6 border-2 border-[#6B23CA]/5 shadow-inner group overflow-hidden relative h-full min-h-[320px]">
                  
                  {/* Brilho de fundo (Acende quando as 3 cores estão na memória) */}
                  <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF7A00]/20 via-transparent to-transparent transition-opacity duration-[1500ms] blur-2xl ${
                    coresDesbloqueadas.length === 3 ? 'opacity-100' : 'opacity-0'
                  }`}></div>

                  <img 
                    src="/logo-pharmamedia.png" 
                    alt="Logótipo Oficial PharmaMedia" 
                    // Removido o max-w-280px e adicionado w-[85%] max-w-[450px] para esticar a imagem
                    className={`w-[85%] max-w-[450px] h-auto object-contain transition-all duration-[1500ms] ease-in-out mix-blend-multiply relative z-10
                      ${coresDesbloqueadas.length === 3
                        ? 'saturate-100 opacity-100 scale-105' 
                        : 'saturate-0 opacity-30 scale-95'
                      }
                    `} 
                  />
                </div>

                {/* DIREITA: Cartões de Cor Interativos */}
                <div className="md:col-span-7 flex flex-col justify-between gap-4 h-full">
                  {[
                    teoriaData.identidadeVisual.simbolismoCores[2],
                    teoriaData.identidadeVisual.simbolismoCores[0],
                    teoriaData.identidadeVisual.simbolismoCores[1]
                  ].map((item, index) => {
                    const isPurple = item.cor.includes('#6B23CA');
                    const isOrange = item.cor.includes('#FF7A00');
                    const dotColor = isPurple ? '#6B23CA' : isOrange ? '#FF7A00' : '#f4f1e9';
                    const colorName = item.cor.split(' (')[0];
                    const hexCode = item.cor.match(/\((.*?)\)/)?.[1] || dotColor;

                    const isUnlocked = coresDesbloqueadas.includes(colorName);
                    
                    const activeBorderColor = isPurple 
                      ? 'border-[#6B23CA] shadow-[0_10px_25px_rgba(107,35,202,0.15)]' 
                      : isOrange 
                        ? 'border-[#FF7A00] shadow-[0_10px_25px_rgba(255,122,0,0.15)]'
                        : 'border-[#dcd5c4] shadow-[0_10px_25px_rgba(0,0,0,0.08)]'; 

                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setCoresDesbloqueadas(prev => 
                            prev.includes(colorName) 
                              ? prev.filter(c => c !== colorName) 
                              : [...prev, colorName]
                          )
                        }}
                        className={`group relative overflow-hidden text-left rounded-3xl p-5 md:p-7 border-2 transition-all duration-500 flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 flex-1 outline-none cursor-pointer
                          ${isUnlocked
                            ? `bg-white ${activeBorderColor} -translate-y-1`
                            : 'bg-gray-50/40 border-gray-200/60 opacity-60 hover:opacity-100 hover:border-[#6B23CA]/30 grayscale-[30%] hover:grayscale-0'
                          }
                        `}
                      >
                        <div className="flex items-center gap-4 shrink-0 sm:w-[220px]">
                          <div 
                            className={`h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-full shadow-inner border border-black/5 transition-transform duration-500
                              ${isUnlocked ? 'scale-110' : 'group-hover:scale-110'}
                            `}
                            style={{ backgroundColor: dotColor }}
                          />
                          <div className="flex flex-col">
                            <span className={`font-black text-sm uppercase tracking-widest leading-tight transition-colors duration-500 ${isUnlocked ? 'text-[#6B23CA]' : 'text-gray-500'}`}>
                              {colorName}
                            </span>
                            <span className={`mt-1.5 inline-block rounded-md px-2.5 py-0.5 text-[10px] font-bold font-mono w-max border transition-colors duration-500
                              ${isUnlocked ? 'bg-[#6B23CA]/5 text-[#6B23CA] border-[#6B23CA]/10' : 'bg-gray-200 text-gray-500 border-transparent'}
                            `}>
                              {hexCode}
                            </span>
                          </div>
                        </div>
                        
                        <div className={`flex-1 sm:border-l-2 sm:pl-6 transition-colors duration-500 ${isUnlocked ? 'sm:border-[#6B23CA]/15' : 'sm:border-gray-200'}`}>
                          <p className={`text-[13px] md:text-sm leading-relaxed font-medium transition-colors duration-500
                            ${isUnlocked ? 'text-[#4C1D95]/85' : 'text-gray-400'}
                          `}>
                            {item.significado}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
                
              </div>
            </section>
          )}

          {/* PASSO 4: A VOZ DA MARCA (Slogan Dinâmico) */}
          {step === 4 && (
            <section className="w-full flex flex-col items-center justify-center">
              
              <div className="mb-8 md:mb-12 text-center px-4 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#6B23CA]">
                  Voz da Marca
                </h2>
              </div>

              {/* Grelha Lado a Lado (9 Colunas para o slogan monumental, 3 para os cartões compactos) */}
              <div className="grid gap-6 md:gap-8 md:grid-cols-12 w-full max-w-[1350px] mx-auto items-stretch min-h-[380px]">
                
                {/* ESQUERDA: O Editor Inteligente (9 Colunas - Fonte Monumental) */}
                <div className={`md:col-span-9 rounded-[2.5rem] p-8 md:p-14 shadow-[0_20px_40px_rgba(107,35,202,0.2)] relative overflow-hidden flex flex-col justify-center h-full transition-colors duration-1000
                  ${pilaresManifesto.length === 3 ? 'bg-[#FF7A00]' : 'bg-[#6B23CA]'}
                `}>
                  <Quote size={200} className="absolute -top-12 -right-12 text-white/5 rotate-12 pointer-events-none" />
                  
                  <div className="relative z-10 w-full text-center flex flex-col items-center justify-center min-h-[180px]">
                    {/* Fonte ainda maior: text-[3.6rem] em grandes ecrãs */}
                    <p className="text-3xl md:text-5xl lg:text-[3.6rem] font-black font-serif italic text-white leading-[1.2] drop-shadow-md transition-all duration-500">
                      {displayedSlogan.length > 0 && <>&ldquo;</>}
                      {displayedSlogan}
                      {displayedSlogan.length > 0 && <>&rdquo;</>}
                      <span className="animate-pulse text-white/80 ml-1 font-light">|</span>
                    </p>
                  </div>
                </div>

                {/* DIREITA: Os 3 Pilares Estratégicos (3 Colunas - Compactos e Equilibrados) */}
                <div className="md:col-span-3 flex flex-col justify-between gap-3.5 h-full">
                  {[
                    { id: 'saude', titulo: 'Foco na Saúde' },
                    { id: 'alcance', titulo: 'Visão & Alcance' },
                    { id: 'proximidade', titulo: 'Proximidade' }
                  ].map((pilar, index) => {
                    const isSelected = pilaresManifesto.includes(pilar.id);
                    
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setPilaresManifesto(prev => 
                            prev.includes(pilar.id) 
                              ? prev.filter(p => p !== pilar.id) 
                              : [...prev, pilar.id]
                          )
                        }}
                        className={`text-left px-5 py-4 rounded-3xl transition-all duration-500 flex items-center justify-between min-h-[70px] md:min-h-[80px] group outline-none relative overflow-hidden flex-1
                          ${isSelected 
                            ? 'border-[3px] border-[#FF7A00] bg-white shadow-[0_10px_25px_rgba(255,122,0,0.15)] -translate-x-1' 
                            : 'border-2 border-[#6B23CA]/15 bg-white shadow-sm hover:border-[#6B23CA]/40 hover:shadow-md hover:-translate-x-1'
                          }
                        `}
                      >
                        {isSelected && (
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF7A00]"></div>
                        )}
                        
                        <div className="pl-1 pr-3 text-left">
                          <span className={`block font-black text-xs md:text-sm uppercase tracking-wider transition-colors duration-300 ${isSelected ? 'text-[#FF7A00]' : 'text-[#6B23CA]'}`}>
                            {pilar.titulo}
                          </span>
                        </div>

                        {/* Indicador de Ação */}
                        <div className={`shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                          isSelected 
                            ? 'border-[#FF7A00] bg-[#FF7A00]' 
                            : 'border-[#6B23CA]/20 bg-transparent group-hover:border-[#6B23CA]/50'
                        }`}>
                          {isSelected ? (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-[#6B23CA]/40 font-black text-lg leading-none -mt-[2px] group-hover:text-[#6B23CA]/70">+</span>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

              </div>
            </section>
          )}

          {/* PASSO 5: SWOT & TOWS (Cockpit Sem Scroll Vertical e Título a Respirar) */}
          {step === 5 && (
            <section className="w-full flex flex-col items-center justify-center">
              
              {/* Título com Margem Restaurada para Respirar */}
              <div className="mb-6 md:mb-8 text-center px-4 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#6B23CA]">
                  SWOT & TOWS
                </h2>
              </div>

              {/* Grelha Principal: Gaps reduzidos para encolher a altura total */}
              <div className="grid gap-4 md:gap-5 md:grid-cols-12 w-full max-w-[1450px] mx-auto items-stretch">
                
                {/* ESQUERDA: Grelha 2x2 da SWOT */}
                <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
                  
                  {/* FORÇAS */}
                  <div 
                    onClick={() => setSelectedInternalBlock(selectedInternalBlock === 'S' ? null : 'S')}
                    className={`flex flex-col group relative overflow-hidden rounded-[2rem] bg-white p-4 md:p-5 shadow-sm border-2 transition-all duration-300 h-full justify-between cursor-pointer outline-none
                      ${selectedInternalBlock === 'S' ? 'border-[#FF7A00] bg-[#FF7A00]/[0.02] shadow-[0_10px_25px_rgba(255,122,0,0.15)] -translate-y-1' : 'border-[#6B23CA]/10 hover:border-[#6B23CA]/30 hover:shadow-md'}
                    `}
                  >
                    <span className={`absolute -right-2 -top-6 select-none text-[80px] font-black leading-none transition-transform duration-500 group-hover:scale-105 pointer-events-none ${selectedInternalBlock === 'S' ? 'text-[#FF7A00]/10' : 'text-[#6B23CA]/10'}`}>S</span>
                    
                    <div>
                      <div className="mb-2 md:mb-3 flex w-full items-center relative z-10">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${selectedInternalBlock === 'S' ? 'bg-[#FF7A00] text-white' : 'bg-[#6B23CA]/10 text-[#6B23CA]'}`}>
                            <Zap size={18} />
                          </div>
                          <h3 className="text-sm md:text-base font-black text-[#6B23CA] uppercase tracking-wider">Forças</h3>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-auto relative z-10">
                      {teoriaData.swot.forcas.map((item, i) => (
                        <div
                          key={i}
                          className={`w-full text-left flex items-center text-xs md:text-[13px] p-2 md:p-2.5 rounded-xl transition-all min-h-[48px] font-medium italic
                            ${selectedInternalBlock === 'S' ? 'bg-[#FF7A00] text-white shadow-sm' : 'bg-[#f4f1e9]/60 text-[#4C1D95]'}
                          `}
                        >
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* OPORTUNIDADES */}
                  <div 
                    onClick={() => setSelectedExternalBlock(selectedExternalBlock === 'O' ? null : 'O')}
                    className={`flex flex-col group relative overflow-hidden rounded-[2rem] bg-white p-4 md:p-5 shadow-sm border-2 transition-all duration-300 h-full justify-between cursor-pointer outline-none
                      ${selectedExternalBlock === 'O' ? 'border-[#FF7A00] bg-[#FF7A00]/[0.02] shadow-[0_10px_25px_rgba(255,122,0,0.15)] -translate-y-1' : 'border-[#6B23CA]/10 hover:border-[#6B23CA]/30 hover:shadow-md'}
                    `}
                  >
                    <span className={`absolute -right-2 -top-6 select-none text-[80px] font-black leading-none transition-transform duration-500 group-hover:scale-105 pointer-events-none ${selectedExternalBlock === 'O' ? 'text-[#FF7A00]/10' : 'text-[#6B23CA]/10'}`}>O</span>
                    
                    <div>
                      <div className="mb-2 md:mb-3 flex w-full items-center relative z-10">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${selectedExternalBlock === 'O' ? 'bg-[#FF7A00] text-white' : 'bg-[#6B23CA]/10 text-[#6B23CA]'}`}>
                            <Lightbulb size={18} />
                          </div>
                          <h3 className="text-sm md:text-base font-black text-[#6B23CA] uppercase tracking-wider">Oportunidades</h3>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-auto relative z-10">
                      {teoriaData.swot.oportunidades.map((item, i) => (
                        <div
                          key={i}
                          className={`w-full text-left flex items-center text-xs md:text-[13px] p-2 md:p-2.5 rounded-xl transition-all min-h-[48px] font-medium italic
                            ${selectedExternalBlock === 'O' ? 'bg-[#FF7A00] text-white shadow-sm' : 'bg-[#f4f1e9]/60 text-[#4C1D95]'}
                          `}
                        >
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FRAQUEZAS */}
                  <div 
                    onClick={() => setSelectedInternalBlock(selectedInternalBlock === 'W' ? null : 'W')}
                    className={`flex flex-col group relative overflow-hidden rounded-[2rem] bg-white p-4 md:p-5 shadow-sm border-2 transition-all duration-300 h-full justify-between cursor-pointer outline-none
                      ${selectedInternalBlock === 'W' ? 'border-[#FF7A00] bg-[#FF7A00]/[0.02] shadow-[0_10px_25px_rgba(255,122,0,0.15)] -translate-y-1' : 'border-[#6B23CA]/10 hover:border-[#6B23CA]/30 hover:shadow-md'}
                    `}
                  >
                    <span className={`absolute -right-2 -top-6 select-none text-[80px] font-black leading-none transition-transform duration-500 group-hover:scale-105 pointer-events-none ${selectedInternalBlock === 'W' ? 'text-[#FF7A00]/10' : 'text-[#6B23CA]/10'}`}>W</span>
                    
                    <div>
                      <div className="mb-2 md:mb-3 flex w-full items-center relative z-10">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${selectedInternalBlock === 'W' ? 'bg-[#FF7A00] text-white' : 'bg-[#6B23CA]/10 text-[#6B23CA]'}`}>
                            <Target size={18} />
                          </div>
                          <h3 className="text-sm md:text-base font-black text-[#6B23CA] uppercase tracking-wider">Fraquezas</h3>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-auto relative z-10">
                      {teoriaData.swot.fraquezas.map((item, i) => (
                        <div
                          key={i}
                          className={`w-full text-left flex items-center text-xs md:text-[13px] p-2 md:p-2.5 rounded-xl transition-all min-h-[48px] font-medium italic
                            ${selectedInternalBlock === 'W' ? 'bg-[#FF7A00] text-white shadow-sm' : 'bg-[#f4f1e9]/60 text-[#4C1D95]'}
                          `}
                        >
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AMEAÇAS */}
                  <div 
                    onClick={() => setSelectedExternalBlock(selectedExternalBlock === 'T' ? null : 'T')}
                    className={`flex flex-col group relative overflow-hidden rounded-[2rem] bg-white p-4 md:p-5 shadow-sm border-2 transition-all duration-300 h-full justify-between cursor-pointer outline-none
                      ${selectedExternalBlock === 'T' ? 'border-[#FF7A00] bg-[#FF7A00]/[0.02] shadow-[0_10px_25px_rgba(255,122,0,0.15)] -translate-y-1' : 'border-[#6B23CA]/10 hover:border-[#6B23CA]/30 hover:shadow-md'}
                    `}
                  >
                    <span className={`absolute -right-2 -top-6 select-none text-[80px] font-black leading-none transition-transform duration-500 group-hover:scale-105 pointer-events-none ${selectedExternalBlock === 'T' ? 'text-[#FF7A00]/10' : 'text-[#6B23CA]/10'}`}>T</span>
                    
                    <div>
                      <div className="mb-2 md:mb-3 flex w-full items-center relative z-10">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${selectedExternalBlock === 'T' ? 'bg-[#FF7A00] text-white' : 'bg-[#6B23CA]/10 text-[#6B23CA]'}`}>
                            <ShieldAlert size={18} />
                          </div>
                          <h3 className="text-sm md:text-base font-black text-[#6B23CA] uppercase tracking-wider">Ameaças</h3>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-auto relative z-10">
                      {teoriaData.swot.ameacas.map((item, i) => (
                        <div
                          key={i}
                          className={`w-full text-left flex items-center text-xs md:text-[13px] p-2 md:p-2.5 rounded-xl transition-all min-h-[48px] font-medium italic
                            ${selectedExternalBlock === 'T' ? 'bg-[#FF7A00] text-white shadow-sm' : 'bg-[#f4f1e9]/60 text-[#4C1D95]'}
                          `}
                        >
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* DIREITA: PAINEL TOWS */}
                <div className="md:col-span-5 flex flex-col h-full">
                  <div className="rounded-[2.5rem] border-2 border-[#6B23CA]/20 bg-white p-5 md:p-6 transition-all duration-500 flex flex-col justify-between shadow-xl relative overflow-hidden flex-1 h-full min-h-[350px]">
                    
                    {calculatedTows ? (
                      <div className="relative z-10 animate-in zoom-in-95 fade-in duration-500 w-full flex flex-col h-full justify-between">
                        
                        <div className="flex items-center border-b border-[#6B23CA]/10 pb-4">
                          <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-[#6B23CA] h-12 w-12 flex items-center justify-center text-lg font-black text-white shadow-md shrink-0">
                              {calculatedTowsKey}
                            </div>
                            <div>
                              <h3 className="text-lg md:text-xl font-black text-[#6B23CA] leading-tight">{calculatedTows.tipo}</h3>
                            </div>
                          </div>
                        </div>

                        <div className="my-auto py-4">
                          <p className="text-sm md:text-base lg:text-lg leading-relaxed text-[#6B23CA] font-bold italic tracking-wide">
                            {calculatedTows.estrategia}
                          </p>
                        </div>

                        <div className="pt-1"></div>

                      </div>
                    ) : (
                      <div className="text-center opacity-70 flex flex-col items-center justify-center p-4 my-auto h-full">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#6B23CA]/10 text-[#6B23CA] mb-3">
                          <Zap size={28} className="animate-pulse" />
                        </div>
                        <h3 className="text-base md:text-lg font-black text-[#6B23CA]">Motor Estratégico TOWS</h3>
                        <p className="text-xs md:text-[13px] text-[#4C1D95] max-w-xs mx-auto mt-2 font-medium leading-relaxed">
                          Clique num cartão Interno e num cartão Externo para gerar a estratégia cruzada em direto.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </section>
          )}

          {/* PASSO 6: O CLÍMAX (Checklist e Botão com Fill Animation) */}
          {step === 6 && (
            <section className="w-full flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in-95 duration-700 px-4">
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#6B23CA] mb-12 md:mb-14 text-center drop-shadow-sm">
                Diagnóstico Concluído
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 w-full max-w-4xl mb-16 md:mb-20">
                {[
                  { text: "Fundamentação Validada", icon: <CheckCircle2 size={26} strokeWidth={2.5} /> },
                  { text: "Identidade Consolidada", icon: <CheckCircle2 size={26} strokeWidth={2.5} /> },
                  { text: "Estratégia Gerada", icon: <CheckCircle2 size={26} strokeWidth={2.5} /> }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="flex flex-col items-center text-center gap-4 bg-white px-6 py-8 md:py-10 rounded-[2rem] border-2 border-[#6B23CA]/5 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-[#6B23CA]/15 hover:-translate-y-2 group"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div className="text-[#FF7A00] bg-[#f4f1e9] p-4 rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#FF7A00] group-hover:text-white">
                      {item.icon}
                    </div>
                    <span className="text-sm md:text-base font-black text-[#6B23CA] tracking-widest uppercase leading-snug">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Botão com Barra de Progresso Interna (Fill Animation) */}
              <button 
                onClick={handlePrepareSolution}
                disabled={isPreparing}
                className={`group relative flex flex-col items-center justify-center px-10 md:px-16 py-6 md:py-7 rounded-[3rem] bg-[#FF7A00] text-white shadow-[0_15px_30px_rgba(255,122,0,0.25)] transition-all duration-300 border-[6px] border-white outline-none w-auto max-w-fit overflow-hidden
                  ${isPreparing ? 'scale-105 shadow-[0_20px_45px_rgba(255,122,0,0.4)] cursor-wait' : 'hover:scale-105 hover:shadow-[0_20px_45px_rgba(255,122,0,0.4)]'}
                `}
              >
                {/* A animação de preenchimento a Roxo (3 segundos) */}
                <div 
                  className="absolute top-0 left-0 h-full bg-[#6B23CA] transition-all ease-linear"
                  style={{ 
                    width: isPreparing ? '100%' : '0%', 
                    transitionDuration: isPreparing ? '3000ms' : '0ms' 
                  }}
                />

                {/* CONTEÚDO (O z-10 garante que o texto fica por cima da onda roxa) */}
                <div className="relative z-10 flex flex-col items-center transition-all duration-300">
                  <div className="flex items-center justify-center mb-1.5 md:mb-2">
                    <span className="text-3xl md:text-4xl lg:text-5xl font-black tracking-wide whitespace-nowrap">
                      {isPreparing ? 'A Formular...' : 'Preparar Solução'}
                    </span>
                  </div>
                  <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.25em] whitespace-nowrap
                    ${isPreparing ? 'opacity-100 animate-pulse' : 'opacity-90 group-hover:animate-pulse text-white/90'}
                  `}>
                    {isPreparing ? 'A ativar plataforma PharmaMedia...' : '(Agitar antes de apresentar)'}
                  </span>
                </div>
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