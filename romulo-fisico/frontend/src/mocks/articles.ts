import type { Article } from './types.ts'

// Fictitious content for the mockup. Authors and stories are invented.
export const articles: Article[] = [
  {
    slug: 'routes-of-memory',
    title: {
      en: 'Routes of memory: tracing family stories across the Atlantic',
      pt: 'Rotas da memória: seguir histórias de família através do Atlântico',
    },
    excerpt: {
      en: 'How three families in Luanda, Salvador and Lisbon rebuilt a shared story from letters, recipes and songs.',
      pt: 'Como três famílias em Luanda, Salvador e Lisboa reconstruíram uma história comum a partir de cartas, receitas e canções.',
    },
    body: [
      {
        en: 'Family memory often survives in the smallest things: a recipe written on the back of an envelope, a song only the grandparents still know, a surname that changed spelling on every border.',
        pt: 'A memória de família sobrevive muitas vezes nas coisas mais pequenas: uma receita escrita nas costas de um envelope, uma canção que só os avós ainda sabem, um apelido que mudou de grafia em cada fronteira.',
      },
      {
        en: 'Over two years, three families compared what each of them had kept. Piece by piece, the fragments started to line up into one route across the ocean.',
        pt: 'Durante dois anos, três famílias compararam o que cada uma tinha guardado. Peça a peça, os fragmentos começaram a alinhar-se numa só rota através do oceano.',
      },
      {
        en: 'Their method is simple and anyone can start it: write down what you have, ask the oldest person you know, and share it with someone on the other side.',
        pt: 'O método é simples e qualquer pessoa o pode começar: registar o que tem, perguntar à pessoa mais velha que conhece e partilhar com alguém do outro lado.',
      },
    ],
    category: 'history',
    author: 'Nzinga Tavares',
    publishedAt: '2026-10-28',
    readMinutes: 6,
    tone: 'clay',
  },
  {
    slug: 'kizomba-to-amapiano',
    title: {
      en: 'From kizomba to amapiano: a decade of music that travels',
      pt: 'Da kizomba ao amapiano: uma década de música que viaja',
    },
    excerpt: {
      en: 'Dance floors in Paris, Johannesburg and São Paulo now share a playlist. What changed, and who is behind it?',
      pt: 'As pistas de Paris, Joanesburgo e São Paulo partilham hoje uma playlist. O que mudou, e quem está por trás?',
    },
    body: [
      {
        en: 'Ten years ago, most African genres travelled through a handful of radio stations. Today a track can move from a bedroom studio to three continents in a week.',
        pt: 'Há dez anos, a maior parte dos géneros africanos viajava através de meia dúzia de rádios. Hoje uma faixa passa de um estúdio caseiro para três continentes numa semana.',
      },
      {
        en: 'The producers we spoke to agree on one thing: the audience in the diaspora is no longer waiting to be told what to listen to.',
        pt: 'Os produtores com quem falámos concordam numa coisa: o público da diáspora já não espera que lhe digam o que ouvir.',
      },
    ],
    category: 'culture',
    author: 'Kofi Mendes',
    publishedAt: '2026-10-21',
    readMinutes: 5,
    tone: 'ochre',
  },
  {
    slug: 'starting-a-local-circle',
    title: {
      en: 'Starting a local circle: what the first ten members taught us',
      pt: 'Começar um círculo local: o que aprendemos com os primeiros dez membros',
    },
    excerpt: {
      en: 'A small group in Rotterdam meets once a month. Their notes are a practical guide for anyone who wants to start one.',
      pt: 'Um pequeno grupo em Roterdão reúne-se uma vez por mês. As notas deles são um guia prático para quem quer começar um.',
    },
    body: [
      {
        en: 'The group started with a shared meal and one question: what would make this city feel more like home?',
        pt: 'O grupo começou com uma refeição partilhada e uma pergunta: o que faria esta cidade parecer-se mais com casa?',
      },
      {
        en: 'Ten members later, they have a rotating host, a simple sign-up sheet and a rule that every meeting ends with one concrete next step.',
        pt: 'Dez membros depois, têm um anfitrião rotativo, uma folha de inscrição simples e a regra de que cada encontro termina com um próximo passo concreto.',
      },
    ],
    category: 'community',
    author: 'Amara Diallo',
    publishedAt: '2026-10-14',
    readMinutes: 4,
    tone: 'forest',
  },
  {
    slug: 'diaspora-founders',
    title: {
      en: 'Diaspora founders building between two markets',
      pt: 'Fundadores da diáspora a construir entre dois mercados',
    },
    excerpt: {
      en: 'Four entrepreneurs explain how they use their double belonging as an advantage, not an obstacle.',
      pt: 'Quatro empreendedores explicam como usam a dupla pertença como vantagem, e não como obstáculo.',
    },
    body: [
      {
        en: 'Knowing two markets means knowing two sets of rules, two sets of customers and, often, two sets of doubts.',
        pt: 'Conhecer dois mercados é conhecer dois conjuntos de regras, dois tipos de clientes e, muitas vezes, dois tipos de dúvidas.',
      },
      {
        en: 'The founders we met turned that into a bridge: sourcing in one place, selling in another, and hiring across both.',
        pt: 'Os fundadores que conhecemos transformaram isso numa ponte: compram num lado, vendem no outro e contratam nos dois.',
      },
    ],
    category: 'opportunity',
    author: 'Tunde Carvalho',
    publishedAt: '2026-10-07',
    readMinutes: 7,
    tone: 'forest',
  },
  {
    slug: 'languages-at-home',
    title: {
      en: 'Keeping languages alive at home',
      pt: 'Manter as línguas vivas em casa',
    },
    excerpt: {
      en: 'Kimbundu, Yoruba, Wolof: parents share small habits that keep a heritage language in daily life.',
      pt: 'Kimbundu, iorubá, wolof: pais partilham pequenos hábitos que mantêm uma língua de herança no dia a dia.',
    },
    body: [
      {
        en: 'None of the parents we interviewed are teachers. What they have in common is consistency: a few words every day, at the same moments.',
        pt: 'Nenhum dos pais que entrevistámos é professor. O que têm em comum é a constância: algumas palavras todos os dias, nos mesmos momentos.',
      },
    ],
    category: 'culture',
    author: 'Nzinga Tavares',
    publishedAt: '2026-09-30',
    readMinutes: 4,
    tone: 'ochre',
  },
  {
    slug: 'archives-open-doors',
    title: {
      en: 'When archives open their doors',
      pt: 'Quando os arquivos abrem as portas',
    },
    excerpt: {
      en: 'Digitised records are changing who gets to tell African history. A short guide to where to start looking.',
      pt: 'Os registos digitalizados estão a mudar quem conta a história africana. Um guia curto para saber por onde começar.',
    },
    body: [
      {
        en: 'Many records that once required a trip abroad are now a search away. Knowing which archive holds what is the first step.',
        pt: 'Muitos registos que antes obrigavam a uma viagem ao estrangeiro estão hoje à distância de uma pesquisa. Saber que arquivo guarda o quê é o primeiro passo.',
      },
    ],
    category: 'history',
    author: 'Amara Diallo',
    publishedAt: '2026-09-23',
    readMinutes: 5,
    tone: 'clay',
  },
]

/** Reverse-chronological feed (CMS-3). */
export const articleFeed = [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
