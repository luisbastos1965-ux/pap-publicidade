import { useState } from 'react'
import { X, Target, TrendingUp, Sparkles, Boxes, Activity, HeartPulse, MessageCircleHeart, Camera, LayoutTemplate, Smartphone, ZoomIn } from 'lucide-react'

// =========================================================================
// COMPONENTE PRINCIPAL: MODAL DA CAMPANHA (VERSÃO AGÊNCIA PREMIUM)
// =========================================================================
interface CampanhaModalProps {
  campanha: any;
  onClose: () => void;
}

export function CampanhaModal({ campanha, onClose }: CampanhaModalProps) {
  // Estado para as Abas (Qual o pacote selecionado)
  const [activeTab, setActiveTab] = useState<'fisico' | 'digital' | 'clinica'>('fisico')
  
  // Estado para o Toggle de Visualização (Mockup vs Real)
  const [viewMode, setViewMode] = useState<'design' | 'terreno'>('design')

  // Estados para controlar a seleção interativa
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState<number>(2);
  const [selectedClinicaIndex, setSelectedClinicaIndex] = useState<number>(0);

  // ✨ NOVO: Estado para controlar o Lightbox (Imagem ampliada ao clicar)
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!campanha) return null;

  // Dados estruturados do calendário de janeiro para o Pack Digital
  const postsJaneiro: Record<number, { tipo: string; desc: string; semana: string }> = {
    2: { semana: "Semana 1", tipo: "Story", desc: 'Sondagem anónima: "Escala de humor: como se sente neste início de ano?"' },
    5: { semana: "Semana 1", tipo: "Reel", desc: '"5 Sinais silenciosos de que o stress está a afetar o seu corpo." (Com convite para visita à farmácia)' },
    9: { semana: "Semana 2", tipo: "Carrossel", desc: '"Rotina matinal anti-stress passo-a-passo: 4 hábitos para acalmar a mente."' },
    12: { semana: "Semana 2", tipo: "Story", desc: 'Foto/Vídeo do staff a organizar os kits de fitoterapia/chás no linear.' },
    16: { semana: "Semana 3", tipo: "IGTV/Live", desc: '"Mitos sobre a medicação para dormir." Breve conversa do Diretor Técnico.' },
    19: { semana: "Semana 3", tipo: "Story", desc: 'Foto de uma chávena de chá. "Sabia que a passiflora ajuda a induzir o sono? Deslize para ler mais."' },
    23: { semana: "Semana 4", tipo: "Post", desc: 'Imagem dos suplementos naturais e chás em destaque. "O nosso Top 3 para uma noite tranquila."' },
    27: { semana: "Semana 4", tipo: "Story", desc: "Registo fotográfico da 'Caixa Anti-Stress' no balcão da farmácia a ser entregue a um utente." }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#6B23CA]/90 p-4 md:p-6 backdrop-blur-lg transition-all animate-in fade-in duration-300">
        <div className="relative flex h-[95vh] md:h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-[2.5rem] bg-[#f4f1e9] shadow-[0_30px_60px_rgba(0,0,0,0.4)] animate-in zoom-in-95 duration-500">
          
          {/* CABEÇALHO COMPACTO E FOCADO NO TEMA */}
          <div className={`flex shrink-0 items-center justify-between px-8 py-8 md:px-12 md:py-10 ${campanha.cor} ${campanha.textoCor} relative overflow-hidden`}>
            <div className="absolute top-0 right-0 opacity-10 scale-150 -translate-y-1/4 translate-x-1/4 pointer-events-none">
              <HeartPulse size={400} strokeWidth={1} />
            </div>
            
            <div className="relative z-10 max-w-4xl">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none drop-shadow-md">
                {campanha.tema}
              </h2>
            </div>
            
            <button onClick={onClose} className="relative z-10 rounded-full bg-black/10 p-3 transition-all hover:bg-black/20 hover:scale-105 hover:rotate-90">
              <X size={24} />
            </button>
          </div>

          {/* CORPO DO MODAL */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 text-[#6B23CA] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            <div className="mx-auto flex max-w-6xl flex-col gap-10">

              {/* SECÇÃO 1: O RESUMO EXECUTIVO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-both" style={{ animationDelay: '100ms' }}>
                
                <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-black/5 shadow-sm flex flex-col gap-3 transition-all hover:shadow-md hover:border-black/10">
                  <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-[#FF7A00]">
                    <Target size={16} strokeWidth={2.5} /> Local de Ação
                  </p>
                  <p className="text-[0.95rem] text-[#4C1D95] leading-relaxed italic">
                    {campanha.localAcao}
                  </p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-black/5 shadow-sm flex flex-col gap-3 transition-all hover:shadow-md hover:border-black/10">
                  <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-[#FF7A00]">
                    <HeartPulse size={16} strokeWidth={2.5} /> Público-Alvo
                  </p>
                  <p className="text-[0.95rem] text-[#4C1D95] leading-relaxed italic">
                    {campanha.publicoAlvo}
                  </p>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-black/5 shadow-sm flex flex-col gap-3 transition-all hover:shadow-md hover:border-black/10">
                  <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-[#FF7A00]">
                    <TrendingUp size={16} strokeWidth={2.5} /> Retorno (ROI)
                  </p>
                  <p className="text-[0.95rem] text-[#4C1D95] leading-relaxed italic">
                    {campanha.roi}
                  </p>
                </div>

              </div>

              {/* SECÇÃO 2: O PITCH DE VENDAS */}
              <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#6B23CA] to-[#4C1D95] p-8 md:p-12 text-[#f4f1e9] shadow-[0_15px_40px_rgba(107,35,202,0.2)] overflow-hidden group animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-both" style={{ animationDelay: '200ms' }}>
                <div className="absolute -top-6 -right-4 text-[12rem] md:text-[16rem] leading-none font-serif text-white opacity-[0.03] pointer-events-none group-hover:scale-110 group-hover:opacity-[0.05] transition-all duration-1000">
                  &rdquo;
                </div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none transition-transform duration-1000 group-hover:scale-110"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                  <div className="flex h-14 w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-[1.2rem] bg-[#FF7A00] text-white shadow-[0_10px_30px_rgba(255,122,0,0.3)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-6">
                    <MessageCircleHeart size={28} strokeWidth={2.5} className="md:w-8 md:h-8" />
                  </div>
                  <div className="flex flex-col gap-2 md:gap-3 mt-1">
                    <p className="text-[11px] md:text-xs font-black uppercase tracking-[.2em] text-[#FF7A00]">
                      O Pitch da Farmácia
                    </p>
                    <p className="text-xl md:text-2xl lg:text-[1.7rem] font-serif italic leading-[1.4] text-white/95 drop-shadow-sm">
                      &ldquo;{campanha.pitch}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* SECÇÃO 3: OS ENTREGÁVEIS (Navegação por Abas Estilo Pasta) */}
              <div className="flex flex-col animate-in slide-in-from-bottom-8 fade-in duration-700 fill-mode-both" style={{ animationDelay: '300ms' }}>
                
                {/* BOTÕES DAS ABAS */}
                <div className="flex flex-wrap gap-2 px-6 md:px-10 relative z-10 translate-y-[2px]">
                  <button
                    onClick={() => setActiveTab('fisico')}
                    className={`flex items-center gap-2 md:gap-3 px-5 md:px-8 py-4 rounded-t-3xl border-x-2 border-t-2 transition-all duration-300 ${
                      activeTab === 'fisico' 
                        ? 'bg-white border-black/5 border-b-transparent shadow-[0_-5px_10px_rgba(0,0,0,0.02)]' 
                        : 'bg-black/5 border-transparent text-[#6B23CA]/50 hover:bg-black/10 hover:text-[#6B23CA]/80'
                    }`}
                    style={activeTab === 'fisico' ? { borderTopColor: campanha.corTematicaHex, borderTopWidth: '4px' } : {}}
                  >
                    <Boxes size={20} strokeWidth={2.5} style={{ color: activeTab === 'fisico' ? campanha.corTematicaHex : '' }} />
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest" style={{ color: activeTab === 'fisico' ? campanha.corTematicaHex : '' }}>
                      Pack Físico
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('digital')}
                    className={`flex items-center gap-2 md:gap-3 px-5 md:px-8 py-4 rounded-t-3xl border-x-2 border-t-2 transition-all duration-300 ${
                      activeTab === 'digital' 
                        ? 'bg-white border-black/5 border-b-transparent shadow-[0_-5px_10px_rgba(0,0,0,0.02)]' 
                        : 'bg-black/5 border-transparent text-[#6B23CA]/50 hover:bg-black/10 hover:text-[#6B23CA]/80'
                    }`}
                    style={activeTab === 'digital' ? { borderTopColor: campanha.corTematicaHex, borderTopWidth: '4px' } : {}}
                  >
                    <Sparkles size={20} strokeWidth={2.5} style={{ color: activeTab === 'digital' ? campanha.corTematicaHex : '' }} />
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest" style={{ color: activeTab === 'digital' ? campanha.corTematicaHex : '' }}>
                      Pack Digital
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('clinica')}
                    className={`flex items-center gap-2 md:gap-3 px-5 md:px-8 py-4 rounded-t-3xl border-x-2 border-t-2 transition-all duration-300 ${
                      activeTab === 'clinica' 
                        ? 'bg-white border-black/5 border-b-transparent shadow-[0_-5px_10px_rgba(0,0,0,0.02)]' 
                        : 'bg-[#FF7A00]/5 border-transparent text-[#FF7A00]/50 hover:bg-[#FF7A00]/15 hover:text-[#FF7A00]/80'
                    }`}
                    style={activeTab === 'clinica' ? { borderTopColor: '#FF7A00', borderTopWidth: '4px' } : {}}
                  >
                    <HeartPulse size={20} strokeWidth={2.5} style={{ color: activeTab === 'clinica' ? '#FF7A00' : '' }} />
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest" style={{ color: activeTab === 'clinica' ? '#FF7A00' : '' }}>
                      Clínica <span className="hidden md:inline">& Comunidade</span>
                    </span>
                  </button>
                </div>

                {/* ÁREA DE CONTEÚDO DA ABA ATIVA */}
                <div className="rounded-[2.5rem] bg-white p-8 md:p-10 shadow-sm border-2 border-black/5 relative z-0 min-h-[400px]">
                  <div className="grid gap-10 md:grid-cols-[1fr_1.5fr] items-start">
                    
                    {/* COLUNA ESQUERDA */}
                    <div className="flex flex-col pt-2 animate-in fade-in zoom-in-95 duration-500">
                      
                      {/* 1. PACK FÍSICO */}
                      {activeTab === 'fisico' && (
                        <div className="space-y-4">
                          {campanha.packFisico?.map((item: string, index: number) => {
                            const partes = item.replace(/^S(\d):?\s*/i, '').trim();
                            const semanaNum = index + 1;
                            const isSelected = selectedWeek === semanaNum;

                            return (
                              <div 
                                key={index} 
                                onClick={() => setSelectedWeek(semanaNum)}
                                className={`group flex flex-col gap-1.5 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                                  isSelected 
                                    ? 'bg-white shadow-md scale-[1.02]' 
                                    : 'bg-black/[0.02] border-black/5 hover:bg-white hover:border-black/10'
                                }`}
                                style={isSelected ? { borderColor: campanha.corTematicaHex, borderWidth: '2px' } : {}}
                              >
                                <div className="flex items-center justify-between">
                                  <span 
                                    className="text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full text-white shadow-sm"
                                    style={{ backgroundColor: campanha.corTematicaHex }}
                                  >
                                    Semana {semanaNum}
                                  </span>
                                </div>
                                <p className="text-sm font-medium text-[#4C1D95] leading-relaxed italic">
                                  {partes}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* 2. PACK DIGITAL (CALENDÁRIO DE JANEIRO) */}
                      {activeTab === 'digital' && (
                        <div className="flex flex-col gap-6">
                          
                          <div className="bg-black/[0.02] border border-black/5 rounded-3xl p-5">
                            <div className="grid grid-cols-7 gap-1 text-center mb-3 pt-1">
                              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((d, i) => (
                                <span key={i} className="text-[10px] font-bold uppercase text-black/40">{d}</span>
                              ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1.5">
                              {[...Array(3)].map((_, i) => (
                                <div key={`empty-${i}`} className="h-9"></div>
                              ))}

                              {[...Array(31)].map((_, i) => {
                                const dia = i + 1;
                                const temPost = postsJaneiro[dia] !== undefined;
                                const isSelected = selectedDay === dia;

                                return (
                                  <button
                                    key={dia}
                                    onClick={() => temPost && setSelectedDay(dia)}
                                    disabled={!temPost}
                                    className={`relative h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                      isSelected 
                                        ? 'bg-[#6B23CA] text-white shadow-md scale-105 z-10' 
                                        : temPost 
                                          ? 'bg-white border-2 text-[#4C1D95] hover:scale-105 shadow-sm cursor-pointer' 
                                          : 'bg-transparent text-black/20 cursor-default'
                                    }`}
                                    style={temPost && !isSelected ? { borderColor: campanha.corTematicaHex } : {}}
                                  >
                                    {dia}
                                    {temPost && !isSelected && (
                                      <span 
                                        className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-pulse shadow-sm"
                                        style={{ backgroundColor: campanha.corTematicaHex }}
                                      />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {postsJaneiro[selectedDay] && (
                            <div 
                              className="p-5 rounded-2xl bg-white border-2 shadow-md animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col gap-3 relative overflow-hidden"
                              style={{ borderColor: campanha.corTematicaHex }}
                            >
                              <div className="absolute top-0 right-0 w-2 h-full" style={{ backgroundColor: campanha.corTematicaHex }} />
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/5 text-[#6B23CA]">
                                  Dia {selectedDay}
                                </span>
                                <span 
                                  className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full text-white shadow-sm"
                                  style={{ backgroundColor: campanha.corTematicaHex }}
                                >
                                  {postsJaneiro[selectedDay].tipo}
                                </span>
                              </div>
                              <p className="text-sm font-medium text-[#4C1D95] leading-relaxed italic">
                                &ldquo;{postsJaneiro[selectedDay].desc}&rdquo;
                              </p>
                            </div>
                          )}

                        </div>
                      )}

                      {/* 3. CLÍNICA & COMUNIDADE (PAINEL INTERATIVO DINÂMICO) */}
                      {activeTab === 'clinica' && (
                        <div className="flex flex-col gap-4">
                          
                          <div className="space-y-3">
                            {campanha.packClinico?.map((item: string, index: number) => {
                              const isSelected = selectedClinicaIndex === index;

                              return (
                                <div
                                  key={index}
                                  onClick={() => setSelectedClinicaIndex(index)}
                                  className={`group p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col gap-1.5 ${
                                    isSelected 
                                      ? 'bg-white shadow-md scale-[1.02]' 
                                      : 'bg-black/[0.02] border-black/5 hover:bg-white hover:border-black/10'
                                  }`}
                                  style={isSelected ? { borderColor: '#FF7A00', borderWidth: '2px' } : {}}
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FF7A00]/10 text-[#FF7A00]">
                                      Ação de Balcão 0{index + 1}
                                    </span>
                                  </div>
                                  <p className="text-sm font-medium text-[#4C1D95] leading-relaxed italic">
                                    &ldquo;{item}&rdquo;
                                  </p>
                                </div>
                              );
                            })}
                          </div>

                          {campanha.extensaoComunidade && (() => {
                            const extensaoIndex = (campanha.packClinico?.length || 0);
                            const isSelected = selectedClinicaIndex === extensaoIndex;

                            return (
                              <div
                                onClick={() => setSelectedClinicaIndex(extensaoIndex)}
                                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                                  isSelected 
                                    ? 'bg-white shadow-md scale-[1.02]' 
                                    : 'border-[#FF7A00]/20 bg-[#FF7A00]/5 hover:bg-[#FF7A00]/10'
                                }`}
                                style={isSelected ? { borderColor: '#FF7A00', borderWidth: '2px' } : {}}
                              >
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF7A00]"></div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="flex items-center gap-2 font-black text-[#FF7A00] uppercase tracking-widest text-[10px]">
                                    <Activity size={14} /> Extensão à Comunidade
                                  </span>
                                </div>
                                <p className="text-sm font-medium text-[#4C1D95] leading-relaxed italic">
                                  &ldquo;{campanha.extensaoComunidade}&rdquo;
                                </p>
                              </div>
                            );
                          })()}

                        </div>
                      )}

                    </div>

                    {/* COLUNA DIREITA (Galeria com Toggle + Suporte a Vertical/Horizontal + Lightbox) */}
                    <div className="flex flex-col gap-4">
                      
                      {/* O Interruptor Mágico (Segmented Control) */}
                      <div className="flex justify-end">
                        <div className="flex bg-black/5 p-1 rounded-[2rem]">
                          <button
                            onClick={() => setViewMode('design')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-[1.5rem] text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                              viewMode === 'design' 
                                ? 'bg-white shadow-sm text-[#6B23CA]' 
                                : 'text-black/40 hover:text-black/70'
                            }`}
                          >
                            <LayoutTemplate size={14} strokeWidth={2.5} />
                            Mockup
                          </button>
                          <button
                            onClick={() => setViewMode('terreno')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-[1.5rem] text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                              viewMode === 'terreno' 
                                ? 'bg-[#FF7A00] shadow-[0_4px_12px_rgba(255,122,0,0.3)] text-white scale-[1.02]' 
                                : 'text-black/40 hover:text-black/70'
                            }`}
                          >
                            <Camera size={14} strokeWidth={2.5} />
                            Real
                          </button>
                        </div>
                      </div>

                      {/* CAIXA DE IMAGEM ADAPTADA PARA VERTICAL / HORIZONTAL + LIGHTBOX */}
                      <div 
                        onClick={() => setLightboxOpen(true)}
                        className={`group relative flex min-h-[420px] w-full flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed transition-all duration-500 overflow-hidden p-6 text-center cursor-pointer ${
                          viewMode === 'design'
                            ? 'border-[#6B23CA]/20 bg-[#6B23CA]/5 text-[#6B23CA]/60 hover:border-[#6B23CA]/40'
                            : 'border-[#FF7A00]/30 bg-[#FF7A00]/5 text-[#FF7A00]/60 hover:border-[#FF7A00]/50'
                        }`}
                      >
                        {/* Indicador de Zoom ao passar o rato */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 text-white p-2 rounded-full backdrop-blur-sm">
                          <ZoomIn size={18} />
                        </div>

                        {/* NOTA SOBRE IMAGENS: 
                            Se colocares uma imagem real (ex: <img src="..." className="w-full h-full object-contain max-h-[400px]" />), 
                            a propriedade 'object-contain' garante que tanto fotos VERTICAIS como HORIZONTAIS cabem na perfeição sem cortes.
                        */}
                        
                        {viewMode === 'design' && (
                          <div className="flex flex-col items-center gap-3 animate-in zoom-in-95 fade-in duration-300">
                            <Smartphone size={48} strokeWidth={1.5} />
                            <div>
                              <p className="text-xs font-black uppercase tracking-widest text-[#6B23CA]">
                                Mockup {activeTab === 'digital' ? `• Dia ${selectedDay}` : activeTab === 'fisico' ? `• Semana ${selectedWeek}` : activeTab === 'clinica' ? `• Intervenção ${selectedClinicaIndex + 1}` : ''}
                              </p>
                              <span className="text-[10px] opacity-70">
                                (Clica para ampliar o design vertical/horizontal)
                              </span>
                            </div>
                          </div>
                        )}

                        {viewMode === 'terreno' && (
                          <div className="flex flex-col items-center gap-3 animate-in zoom-in-95 fade-in duration-300">
                            <Camera size={48} strokeWidth={1.5} />
                            <div>
                              <p className="text-xs font-black uppercase tracking-widest text-[#FF7A00]">
                                Execução Real {activeTab === 'digital' ? `• Dia ${selectedDay}` : activeTab === 'fisico' ? `• Semana ${selectedWeek}` : activeTab === 'clinica' ? `• Intervenção ${selectedClinicaIndex + 1}` : ''}
                              </p>
                              <span className="text-[10px] opacity-70">
                                (Clica para ampliar a fotografia no terreno)
                              </span>
                            </div>
                          </div>
                        )}
                        
                      </div>

                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ✨ LIGHTBOX: MODAL DE ECRÃ INTEIRO PARA VER A FOTO EM GRANDE */}
      {lightboxOpen && (
        <div 
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10 backdrop-blur-md animate-in fade-in duration-300 cursor-zoom-out"
        >
          <button 
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 hover:scale-110"
          >
            <X size={28} />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/40 p-2 shadow-2xl"
          >
            {/* Aqui dentro podes colocar a tag <img> real quando tiveres os ficheiros. 
                Usar 'object-contain' garante que imagens verticais altas e horizontais largas aparecem inteiras. */}
            <div className="text-center text-white/70 py-20">
              <p className="text-sm font-bold uppercase tracking-widest mb-2">[ Pré-visualização Ampliada ]</p>
              <p className="text-xs opacity-60">Substitui este bloco pela tua tag <code className="bg-white/10 px-2 py-1 rounded">&lt;img src="..." className="max-h-[85vh] object-contain rounded-lg" /&gt;</code></p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}