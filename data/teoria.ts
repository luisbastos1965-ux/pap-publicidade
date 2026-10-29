export const teoriaData = {
  problemasMercado: [
    {
      id: "margens",
      titulo: "Esmagamento de Margens",
      descricao: "A rentabilidade na dispensa de medicamentos (MSRM) tem vindo a cair, exigindo uma aposta urgente em serviços clínicos e de conselho rentáveis.",
      isTarget: false
    },
    {
      id: "concorrencia",
      titulo: "Concorrência do Retalho",
      descricao: "As grandes superfícies, parafarmácias e o e-commerce roubaram a exclusividade no aconselhamento de saúde e bem-estar.",
      isTarget: false
    },
    {
      id: "recursos",
      titulo: "Falta de Tempo e Recursos",
      descricao: "Os farmacêuticos estão sobrecarregados ao balcão. Não há tempo, equipa dedicada, nem conhecimentos de design para criar campanhas de marketing estruturadas.",
      isTarget: true,
      solucaoPharmaMedia: "É exatamente aqui que entramos. A PharmaMedia entrega campanhas chave-na-mão para que o farmacêutico se foque apenas naquilo que faz melhor: cuidar do utente."
    },
    {
      id: "demografia",
      titulo: "Retenção do Público Jovem",
      descricao: "A farmácia ainda carrega o estigma de ser 'o sítio dos doentes', tendo dificuldade em comunicar literacia em saúde atrativa para o público jovem-adulto.",
      isTarget: false
    }
  ],
  
  fundamentacaoCientifica: [
    {
      autor: "Zhou et al., 2022",
      tema: "O Papel Comunitário",
      tese: "O verdadeiro valor da farmácia comunitária reside na sua proximidade e na capacidade única de transformar conselhos clínicos complexos em hábitos de saúde sustentados pela população."
    },
    {
      autor: "Houts et al., 2006",
      tema: "O Poder Visual na Saúde",
      tese: "Os utentes esquecem até 80% da informação médica verbalizada no balcão. O uso de campanhas visuais estruturadas aumenta a compreensão e a retenção da mensagem clínica em mais de 65%."
    },
    {
      autor: "FIP (Federação Internacional), 2023",
      tema: "A Transição do Setor",
      tese: "A modernização da farmácia exige a transição de um modelo centrado no produto (dispensa) para um modelo centrado no serviço e na literacia, onde a comunicação estratégica é vital."
    }
  ],
  
  manifestosOpcoes: [
    "Onde o rigor clínico encontra a criatividade.",
    "A saúde precisa de mais do que balcão: precisa de voz.",
    "Pequenas doses de comunicação. Grandes impactos na comunidade.",
    "Descomplicar a ciência para cuidar de quem importa."
  ],
  manifestoAtivo: "Onde o rigor clínico encontra a criatividade.",

  identidadeVisual: {
    conceitoLogo: "O logótipo da PharmaMedia nasce da fusão entre a precisão farmacêutica (a pílula) e a dinâmica editorial de uma agência de comunicação moderna.",
    simbolismoCores: [
      { cor: "Roxo Principal (#6B23CA)", significado: "Transmite autoridade, rigor científico, confiança e sofisticação institucional." },
      { cor: "Laranja de Ação (#FF7A00)", significado: "Representa energia, criatividade, inovação no marketing e proximidade humana." },
      { cor: "Creme de Fundo (#f4f1e9)", significado: "Garante um contraste visual suave, afastando-se do branco clínico frio e aproximando o utente de um ambiente acolhedor." }
    ]
  },
  
  swot: {
    forcas: [
      "Campanhas chave-na-mão prontas a implementar em 24h.",
      "Abordagem 360º (Físico, Digital e Clínico)."
    ],
    fraquezas: [
      "Agência em fase de lançamento (marca nova no mercado B2B).",
      "Recursos internos limitados para expansão geográfica simultânea."
    ],
    oportunidades: [
      "Crescimento da procura por serviços clínicos rentáveis nas farmácias.",
      "Aumento da necessidade de digitalização e presença nas redes sociais do setor."
    ],
    ameacas: [
      "Concorrência de grandes cadeias com departamentos de marketing internos.",
      "Restrições legais apertadas na publicidade de medicamentos (INFARMED)."
    ]
  },

  tows: {
    SO: {
      tipo: "Estratégia Ofensiva",
      formula: "Forças (S) + Oportunidades (O)",
      estrategia: "Utilizar a agilidade das nossas campanhas chave-na-mão (S) para captar rapidamente as farmácias que procuram rentabilizar novos serviços clínicos (O) mas não têm equipa de marketing."
    },
    ST: {
      tipo: "Estratégia Defensiva",
      formula: "Forças (S) + Ameaças (T)",
      estrategia: "Usar a nossa equipa multidisciplinar (S) para criar conteúdos que cumpram escrupulosamente as regras do INFARMED (T), transformando o rigor legal numa vantagem competitiva face à concorrência."
    },
    WO: {
      tipo: "Estratégia de Reforço",
      formula: "Fraquezas (W) + Oportunidades (O)",
      estrategia: "Aproveitar a urgência de digitalização do setor (O) para compensar o facto de sermos uma agência nova (W), apresentando um portefólio nativamente digital e altamente inovador."
    },
    WT: {
      tipo: "Estratégia de Sobrevivência",
      formula: "Fraquezas (W) + Ameaças (T)",
      estrategia: "Focar inicialmente num nicho local e controlado no Porto (W) para validar todos os processos legais rigorosos (T) antes de tentar uma expansão nacional precipitada."
    }
  }
};