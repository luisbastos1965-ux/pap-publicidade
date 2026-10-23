'use client'

import { useState } from 'react'
import { Beaker, Grid, Mic, Search } from 'lucide-react'

interface GoogleSearchProps {
  onSearchSubmit: () => void;
}

export function GoogleSearch({ onSearchSubmit }: GoogleSearchProps) {
  const [searchQuery, setSearchQuery] = useState('preciso de uma campanha para a farmácia')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearchSubmit()
  }

  return (
    <main className="flex min-h-screen flex-col justify-between bg-white text-[#202124] select-none">
      
      {/* Topo Realista do Google */}
      <header className="flex items-center justify-end gap-4 p-4 text-sm">
        <span className="cursor-pointer text-black/80 hover:underline">Gmail</span>
        <span className="cursor-pointer text-black/80 hover:underline">Imagens</span>
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-black/5">
          <Grid size={20} className="text-[#5f6368]" />
        </div>
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#6B23CA] font-bold text-white shadow-sm">
          P
        </div>
      </header>

      {/* Corpo da Pesquisa */}
      <div className="flex flex-col items-center justify-center px-4 -mt-16">
        
        {/* GOOGLE DOODLE COM VÁRIAS CÁPSULAS A INTERAGIR COM AS LETRAS */}
        <div className="mb-12 text-center cursor-pointer group" onClick={handleSubmit}>
          <div className="relative inline-flex items-center justify-center px-12 py-8">
            
            {/* CÁPSULAS FLUTUANTES À VOLTA E SOBRE A PALAVRA */}
            <div className="absolute -top-4 left-4 flex h-5 w-12 rotate-[-25deg] items-center overflow-hidden rounded-full border-2 border-[#6B23CA] bg-white shadow-sm animate-pulse">
              <div className="h-full w-1/2 bg-[#FF7A00]" />
              <div className="h-full w-1/2 bg-[#f4f1e9]" />
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#6B23CA] -translate-x-1/2" />
            </div>

            <div className="absolute top-2 left-1/3 flex h-4 w-10 rotate-[15deg] items-center overflow-hidden rounded-full border-2 border-[#6B23CA] bg-white shadow-sm">
              <div className="h-full w-1/2 bg-[#FF7A00]" />
              <div className="h-full w-1/2 bg-[#f4f1e9]" />
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#6B23CA] -translate-x-1/2" />
            </div>

            <div className="absolute -top-3 right-12 flex h-7 w-16 -rotate-[18deg] items-center overflow-hidden rounded-full border-2 border-[#6B23CA] bg-white shadow-md">
              <div className="h-full w-1/2 bg-[#FF7A00]" />
              <div className="h-full w-1/2 bg-[#f4f1e9]" />
              <div className="absolute inset-y-0 left-1/2 w-[1.5px] bg-[#6B23CA] -translate-x-1/2" />
            </div>

            <div className="absolute bottom-1 left-2 flex h-5 w-12 rotate-[35deg] items-center overflow-hidden rounded-full border-2 border-[#6B23CA] bg-white shadow-sm">
              <div className="h-full w-1/2 bg-[#FF7A00]" />
              <div className="h-full w-1/2 bg-[#f4f1e9]" />
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#6B23CA] -translate-x-1/2" />
            </div>

            {/* PALAVRA GOOGLE */}
            <div className="flex items-baseline text-[5.5rem] font-black tracking-tight md:text-[7rem] font-sans relative">
              <span className="text-[#6B23CA] transition-transform group-hover:-translate-y-1">G</span>
              <span className="text-[#FF7A00] transition-transform group-hover:-translate-y-1">o</span>
              <span className="text-[#6B23CA] transition-transform group-hover:-translate-y-1">o</span>
              <span className="text-[#FF7A00] transition-transform group-hover:-translate-y-1">g</span>
              <span className="text-[#6B23CA] transition-transform group-hover:-translate-y-1">l</span>
              <span className="relative inline-block text-[#FF7A00] transition-transform group-hover:-translate-y-1">
                e
              </span>
            </div>

          </div>
        </div>

        {/* Barra de Pesquisa Realista */}
        <form onSubmit={handleSubmit} className="relative mb-8 w-full max-w-2xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9aa0a6]" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-[#dfe1e5] bg-white py-4 pl-14 pr-24 text-base shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-1 focus:ring-[#6B23CA]"
          />
          <div className="absolute right-5 top-1/2 flex -translate-y-1/2 items-center gap-3">
            <Mic size={20} className="cursor-pointer text-[#4285f4]" />
            <Beaker size={20} className="cursor-pointer text-[#FF7A00]" />
          </div>
        </form>

        <div className="mb-12 flex justify-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-[#f8f9fa] px-4 py-2.5 text-sm font-medium text-[#3c4043] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm"
          >
            Pesquisa Google
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-[#f8f9fa] px-4 py-2.5 text-sm font-medium text-[#3c4043] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-sm"
          >
            Estou com sorte
          </button>
        </div>

        {/* Resultado Patrocinado da Agência */}
        <div className="w-full max-w-2xl rounded-2xl border border-[#dadce0] p-6 shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer text-left" onClick={handleSubmit}>
          <div className="flex items-center gap-2 text-xs text-[#202124] mb-1">
            <span className="rounded bg-[#f1f3f4] px-2 py-0.5 font-bold text-[#202124]">Anúncio</span>
            <span>https://www.pharmamedia.pt</span>
          </div>
          <h3 className="text-xl text-[#1a0dab] font-medium hover:underline mb-1">
            PharmaMedia — Agência B2B de Literacia em Saúde
          </h3>
          <p className="text-sm text-[#4d5156] leading-relaxed">
            Campanhas de saúde chave-na-mão para farmácias comunitárias. Onde o rigor clínico encontra a criatividade.
          </p>
        </div>
      </div>

      {/* Rodapé Oficial (Falso Google) */}
      <footer className="w-full bg-[#f2f2f2] text-[15px] text-[#70757a]">
        <div className="border-b border-[#dadce0] px-8 py-3">
          Portugal
        </div>
        
        {/* NOVA ZONA: BARRA DE PARCEIROS INSTITUCIONAIS PAP */}
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

    </main>
  );
}