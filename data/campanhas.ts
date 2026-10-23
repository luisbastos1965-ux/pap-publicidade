export const campanhasData = [
  { 
    id: '01', 
    mes: 'JAN', 
    tema: 'Saúde Mental',
    tomComunicacao: 'Prova Social (Testemunhos)',
    publicoAlvo: 'População em geral (todas as faixas etárias), com especial ênfase em estudantes (época de exames) e jovens adultos focados no equilíbrio mental.',
    localAcao: 'Escola Secundária / Universidade e Farmácia.',
    packFisico: [
      'S1: Cartaz de montra interativo (QR Code que remete para vídeos de superação e linhas SOS).',
      'S2: Autocolantes de espelho nos lavabos e zonas de espera da farmácia ("Você importa").',
      'S3: Mensagem de apoio impressa no rodapé de todos os talões de compra do mês.',
      'S4: Uso de crachás temáticos pelo staff ("Precisa de falar? Nós ouvimos.").'
    ],
    packDigital: [
      'Sondagem anónima: "Escala de humor: como se sente neste início de ano?".',
      'Reel: "5 Sinais silenciosos de que o stress está a afetar o seu corpo."',
      'Carrossel: "Rotina matinal anti-stress passo-a-passo."',
      'IGTV/Live: "Mitos sobre a medicação para dormir." com o Diretor Técnico.'
    ],
    packClinico: [
      "'Caixa Anti-Stress' de balcão: Distribuição gratuita de amostras de chás relaxantes.",
      "Escala visual de emoções no balcão para iniciar abordagem clínica.",
      "Bolas anti-stress personalizadas e cartões da Linha SNS 24."
    ],
    extensaoComunidade: "Workshop prático de 'Gestão de Ansiedade e Burnout' dinamizado numa Escola Secundária ou Universidade local.",
    roi: "Escoamento rápido de suplementos naturais, indutores de sono e fitoterapia. Aumento da confiança e fidelização do utente.",
    pitch: "O arranque do ano e a época de exames trazem ansiedade e a 'Blue Monday'. Mostre que a sua farmácia não vende só caixas, é empática e um porto seguro.",
    cor: 'bg-[#FF7A00]', 
    textoCor: 'text-white',
    corTematicaHex: '#10B981' // Verde (Saúde Mental)
  },
  { 
    id: '02', 
    mes: 'FEV', 
    tema: 'Higiene Oral',
    tomComunicacao: 'Humorístico e Educativo',
    publicoAlvo: 'Crianças (1º Ciclo), Encarregados de Educação e Terceira Idade (utentes de próteses).',
    localAcao: 'Lar de Idosos e Farmácia (Balcão e Bastidores).',
    packFisico: [
      "S1: Decoração da montra 'Mês do Sorriso' com dentes gigantes em 3D.",
      "S2: Folhetos passo-a-passo sobre manutenção de próteses dentárias.",
      "S3: Autocolantes no chão a guiar os utentes até ao linear dentário.",
      "S4: Sacos de farmácia carimbados com a 'Checklist de Escovagem'."
    ],
    packDigital: [
      'Quiz Mito ou Verdade: "Sangrar das gengivas durante a escovagem é normal?".',
      'Reel: "Expectativa vs Realidade: Como passar o fio dentário corretamente."',
      'Carrossel: "O mito da escova cheia explicado visualmente."',
      'Vídeo: Farmacêutico explica passo-a-passo como limpar próteses.'
    ],
    packClinico: [
      "Pastilhas reveladoras de placa bacteriana para crianças testarem a eficácia.",
      "Oferta de ampulhetas de banho de 2 minutos para garantir o tempo correto.",
      "Jogo de tabuleiro infantil 'O Monstro da Cárie' no balcão."
    ],
    extensaoComunidade: "Ação Dupla: Turmas do 1º Ciclo visitam a Farmácia para jogar; Farmacêutico desloca-se a um Lar de Idosos para ensinar a cuidar das próteses.",
    roi: "Aumento exponencial nas vendas de elixires, fixadores de prótese, escovas e pastas pediátricas.",
    pitch: "Se entretermos as crianças no balcão, os pais compram com calma. E ao irmos ao Lar, garantimos a fidelização da terceira idade nos fixadores de prótese.",
    cor: 'bg-[#9B4DCA]', 
    textoCor: 'text-white',
    corTematicaHex: '#06B6D4' // Ciano (Higiene)
  },
  { id: '03', mes: 'MAR', tema: 'Saúde da Mulher', cor: 'bg-[#FFA726]', textoCor: 'text-[#6B23CA]', corTematicaHex: '#F59E0B' }, // Amarelo (Endometriose)
  { id: '04', mes: 'ABR', tema: 'Prevenção de Alergias', cor: 'bg-[#6B23CA]', textoCor: 'text-white', corTematicaHex: '#84CC16' }, // Lima (Pólen)
  { id: '05', mes: 'MAI', tema: 'Saúde do Coração', cor: 'bg-[#9B4DCA]', textoCor: 'text-white', corTematicaHex: '#EF4444' }, // Vermelho (Coração)
  { id: '06', mes: 'JUN', tema: 'Prevenção da Obesidade', cor: 'bg-[#FF7A00]', textoCor: 'text-white', corTematicaHex: '#14B8A6' }, // Teal (Movimento)
  { id: '07', mes: 'JUL', tema: 'Cancro da Pele', cor: 'bg-[#6B23CA]', textoCor: 'text-white', corTematicaHex: '#FBBF24' }, // Âmbar (Sol)
  { id: '08', mes: 'AGO', tema: 'Farmácia de Viagem', cor: 'bg-[#FFA726]', textoCor: 'text-[#6B23CA]', corTematicaHex: '#22C55E' }, // Verde (Primeiros Socorros)
  { id: '09', mes: 'SET', tema: 'Regresso às Aulas', cor: 'bg-[#6B23CA]', textoCor: 'text-white', corTematicaHex: '#3B82F6' }, // Azul (Pediatria)
  { id: '10', mes: 'OUT', tema: 'Cancro da Mama', cor: 'bg-[#FFA726]', textoCor: 'text-[#6B23CA]', corTematicaHex: '#EC4899' }, // Rosa (Outubro Rosa)
  { id: '11', mes: 'NOV', tema: 'Prevenção da Diabetes', cor: 'bg-[#9B4DCA]', textoCor: 'text-white', corTematicaHex: '#2563EB' }, // Azul (Novembro Azul)
  { id: '12', mes: 'DEZ', tema: 'Vacinação e Inverno', cor: 'bg-[#FF7A00]', textoCor: 'text-white', corTematicaHex: '#0EA5E9' } // Azul Gelo (Inverno)
];