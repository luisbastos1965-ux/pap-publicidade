'use client'

import { useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowUpRight, Beaker, Boxes, ChevronRight, HeartPulse, Sparkles } from 'lucide-react'

const months = [
  ['JAN', 'Saúde Mental', '01'],
  ['FEV', 'Higiene Oral', '02'],
  ['MAR', 'Saúde da Mulher', '03'],
  ['ABR', 'Prevenção de Alergias', '04'],
  ['MAI', 'Saúde do Coração', '05'],
  ['JUN', 'Prevenção da Obesidade', '06'],
  ['JUL', 'Cancro da Pele', '07'],
  ['AGO', 'Farmácia de Viagem', '08'],
  ['SET', 'Regresso às Aulas', '09'],
  ['OUT', 'Cancro da Mama', '10'],
  ['NOV', 'Prevenção da Diabetes', '11'],
  ['DEZ', 'Vacinação e Inverno', '12'],
]

const pillars = [
  { icon: Sparkles, number: '01', title: 'Publicidade', text: 'Campanhas que param o scroll e tornam a literacia em saúde impossível de ignorar.' },
  { icon: Boxes, number: '02', title: 'Pack clínico', text: 'Materiais claros, rigorosos e prontos para a equipa aplicar no balcão.' },
  { icon: HeartPulse, number: '03', title: 'Comunidade', text: 'Extensões que levam a conversa para escolas, famílias e território local.' },
]

export function KapsulaHome() {
  const [selectedMonth, setSelectedMonth] = useState<(typeof months)[number] | null>(null)

  if (selectedMonth) {
    const [month, title, number] = selectedMonth
    return (
      <main className="min-h-screen bg-[#f4f1e9] text-[#173c3b]">
        <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-6 md:px-10 lg:px-16">
          <button onClick={() => setSelectedMonth(null)} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] transition-colors hover:text-[#e8694e]"><ArrowLeft size={16} /> Voltar ao lookbook</button>
          <span className="text-xl font-black tracking-[-0.08em]">KÁPSULA<span className="ml-1 inline-block h-2 w-2 rounded-full bg-[#e8694e]" /></span>
        </nav>
        <section className="mx-auto grid min-h-[calc(100vh-88px)] max-w-[1400px] items-center gap-12 px-6 pb-20 pt-10 md:px-10 lg:grid-cols-[.85fr_1.15fr] lg:px-16">
          <div className="relative flex min-h-[430px] items-center justify-center rounded-2xl bg-[#173c3b] p-8 text-[#f4f1e9] md:min-h-[560px]">
            <span className="absolute left-8 top-8 text-xs font-bold tracking-[.2em] text-[#d7dfbd]">{month} / {number}</span>
            <div className="max-w-sm rotate-[-5deg] rounded-[48%_52%_42%_58%] border-2 border-[#173c3b] bg-[#e8694e] p-10 text-[#173c3b] shadow-[14px_18px_0_#d7dfbd] md:p-14"><p className="text-xs font-bold uppercase tracking-[.18em]">Campanha Kápsula</p><h1 className="mt-16 text-6xl font-black leading-[.82] tracking-[-.08em] md:text-8xl">{title}</h1><p className="mt-8 text-sm font-bold uppercase tracking-[.12em]">Pharma × people</p></div>
          </div>
          <div className="max-w-2xl"><p className="mb-6 text-xs font-bold uppercase tracking-[.2em] text-[#e8694e]">Cápsula {number} / 12</p><h1 className="text-6xl font-black leading-[.88] tracking-[-.08em] md:text-8xl">{title}</h1><p className="mt-8 max-w-lg text-lg leading-relaxed text-[#315958]">Uma campanha editorial pensada para transformar uma conversa clínica importante numa experiência simples, humana e memorável no balcão.</p><div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-[#173c3b]/15 sm:grid-cols-3"><div className="bg-[#d7dfbd] p-5"><p className="text-xs font-bold uppercase tracking-wider">01</p><p className="mt-10 font-bold">Cartaz de balcão</p></div><div className="bg-[#d7d0c3] p-5"><p className="text-xs font-bold uppercase tracking-wider">02</p><p className="mt-10 font-bold">Kit para equipa</p></div><div className="bg-[#e8694e] p-5"><p className="text-xs font-bold uppercase tracking-wider">03</p><p className="mt-10 font-bold">Conteúdo social</p></div></div><button onClick={() => setSelectedMonth(null)} className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#173c3b] px-6 py-4 text-sm font-bold text-[#f4f1e9] transition-transform hover:-translate-y-1">Ver outros meses <ArrowUpRight size={17} /></button></div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f1e9] text-[#173c3b]">
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-6 md:px-10 lg:px-16">
        <a href="#top" className="flex items-center gap-2 text-xl font-black tracking-[-0.08em]" aria-label="Kápsula — início">
          KÁPSULA<span className="ml-1 inline-block h-2 w-2 rounded-full bg-[#e8694e]" />
        </a>
        <div className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.16em] md:flex">
          <a href="#metodo" className="transition-colors hover:text-[#e8694e]">Método</a>
          <a href="#lookbook" className="transition-colors hover:text-[#e8694e]">Lookbook</a>
          <a href="#contacto" className="rounded-full bg-[#173c3b] px-5 py-3 text-[#f4f1e9] transition-transform hover:-translate-y-0.5">Agendar pitch</a>
        </div>
      </nav>

      <section id="top" className="relative mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-[1400px] items-center gap-12 px-6 pb-16 pt-8 md:px-10 lg:grid-cols-[1.02fr_.98fr] lg:px-16 lg:pb-24">
        <div className="relative z-10 max-w-3xl">
          <p className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e8694e]"><span className="h-px w-8 bg-[#e8694e]" /> Agência B2B de literacia em saúde</p>
          <h1 className="text-[clamp(4rem,9vw,9.4rem)] font-black leading-[.82] tracking-[-0.09em] text-[#173c3b]">Rigor que<br /><span className="text-[#e8694e]">ganha vida.</span></h1>
          <p className="mt-10 max-w-md text-lg leading-relaxed text-[#315958] md:text-xl">Campanhas de saúde <em className="font-serif">chave-na-mão</em> para farmácias que querem comunicar melhor, cuidar mais e crescer com propósito.</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#lookbook" className="group inline-flex items-center gap-3 rounded-full bg-[#e8694e] px-6 py-4 text-sm font-bold text-white transition-all hover:gap-5 hover:bg-[#d8583f]">Explorar campanhas <ArrowUpRight size={17} /></a>
            <a href="#metodo" className="inline-flex items-center gap-2 px-3 py-4 text-sm font-bold text-[#173c3b]">Conhecer o método <ChevronRight size={17} /></a>
          </div>
        </div>

        <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-[580px]">
          <div className="absolute inset-[12%] rounded-full border border-[#173c3b]/15" />
          <div className="absolute inset-[22%] rounded-full border border-[#173c3b]/10" />
          <div className="absolute h-[68%] w-[68%] rotate-[-14deg] rounded-[45%_55%_48%_52%] bg-[#d7dfbd] shadow-[20px_30px_0_#173c3b]" />
          <div className="relative z-10 flex h-64 w-48 rotate-[12deg] flex-col justify-between rounded-[48%_52%_42%_58%] border-2 border-[#173c3b] bg-[#f4f1e9] p-6 shadow-[12px_16px_0_#e8694e] md:h-80 md:w-60 md:p-8">
            <div className="flex items-start justify-between"><Beaker size={28} /><span className="text-[10px] font-bold uppercase tracking-widest">K / 01</span></div>
            <div><p className="text-[clamp(2.5rem,5vw,4.8rem)] font-black leading-[.8] tracking-[-0.09em]">Pílula<br /><span className="font-serif font-normal italic">de</span><br />ideias</p><p className="mt-5 text-[10px] font-bold uppercase tracking-[.16em]">Pharma × people</p></div>
          </div>
          <div className="absolute right-[4%] top-[8%] rotate-12 rounded-full border border-[#173c3b] px-4 py-2 text-[10px] font-bold uppercase tracking-[.18em]">Playbook 2027</div>
          <div className="absolute bottom-[9%] left-[3%] -rotate-6 rounded-full bg-[#173c3b] px-5 py-3 text-xs font-bold text-[#f4f1e9]">12 temas. 1 ano inteiro.</div>
        </div>
        <a href="#metodo" className="absolute bottom-8 left-6 hidden items-center gap-3 text-xs font-bold uppercase tracking-[.18em] md:flex lg:left-16"><ArrowDown size={15} /> fazer scroll</a>
      </section>

      <section id="metodo" className="bg-[#173c3b] px-6 py-24 text-[#f4f1e9] md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1400px]"><div className="mb-16 max-w-xl"><p className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-[#e8694e]">O método Kápsula</p><h2 className="text-5xl font-black leading-[.9] tracking-[-.07em] md:text-7xl">Pequenas doses.<br /><span className="font-serif font-normal italic text-[#d7dfbd]">Grande impacto.</span></h2></div><div className="grid gap-px overflow-hidden rounded-2xl bg-[#f4f1e9]/20 md:grid-cols-3">{pillars.map(({ icon: Icon, number, title, text }) => <article key={number} className="bg-[#173c3b] p-8 md:p-10"><div className="mb-16 flex items-start justify-between"><Icon size={30} strokeWidth={1.5} /><span className="text-sm text-[#d7dfbd]/60">{number}</span></div><h3 className="mb-4 text-2xl font-bold">{title}</h3><p className="max-w-xs leading-relaxed text-[#d7dfbd]/75">{text}</p></article>)}</div></div>
      </section>

      <section id="lookbook" className="px-6 py-24 md:px-10 lg:px-16 lg:py-32"><div className="mx-auto max-w-[1400px]"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-[#e8694e]">Lookbook anual</p><h2 className="max-w-2xl text-5xl font-black leading-[.9] tracking-[-.07em] md:text-7xl">Um ano de<br /><span className="font-serif font-normal italic">boas conversas.</span></h2></div><p className="max-w-xs text-sm leading-relaxed text-[#315958]">Uma cápsula editorial por mês. Clique numa campanha para descobrir o pack completo.</p></div><div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{months.map(([month, title, number], index) => <button key={month} type="button" onClick={() => setSelectedMonth([month, title, number])} className={`group flex min-h-44 flex-col justify-between rounded-xl p-5 text-left transition-all hover:-translate-y-1 hover:shadow-xl ${index % 4 === 0 ? 'bg-[#e8694e] text-white' : index % 4 === 1 ? 'bg-[#d7dfbd]' : index % 4 === 2 ? 'bg-[#d7d0c3]' : 'bg-[#173c3b] text-[#f4f1e9]'}`}><span className="flex justify-between text-xs font-bold tracking-[.16em]"><span>{month}</span><span>/{number}</span></span><span className="text-xl font-bold leading-none tracking-tight">{title}</span><span className="text-xs font-bold uppercase tracking-[.12em] opacity-60">Ver cápsula <ArrowUpRight className="inline" size={14} /></span></button>)}</div></div></section>

      <section id="contacto" className="bg-[#e8694e] px-6 py-24 text-[#173c3b] md:px-10 lg:px-16 lg:py-32"><div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-12 md:flex-row md:items-end"><div><p className="mb-5 text-xs font-bold uppercase tracking-[.2em]">Para farmácias com visão</p><h2 className="max-w-3xl text-5xl font-black leading-[.86] tracking-[-.08em] md:text-8xl">Vamos pôr a<br /><span className="font-serif font-normal italic">saúde a falar?</span></h2></div><a href="mailto:ola@kapsula.pt" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#173c3b] px-7 py-5 text-sm font-bold text-[#f4f1e9] transition-transform hover:-translate-y-1">Agendar um pitch <ArrowUpRight size={18} /></a></div></section>
      <footer className="flex flex-col justify-between gap-4 bg-[#e8694e] px-6 pb-8 text-xs font-bold uppercase tracking-[.16em] md:flex-row md:px-16"><span>KÁPSULA © 2027</span><span>Onde o rigor clínico encontra a criatividade.</span></footer>
    </main>
  )
}
