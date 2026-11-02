import type { WakanzeEvent } from './types.ts'

// Fictitious events for the mockup. Registration links point to example.com.
export const events: WakanzeEvent[] = [
  {
    slug: 'luanda-heritage-walk',
    title: { en: 'Heritage walk: the old city of Luanda', pt: 'Caminhada de património: a cidade antiga de Luanda' },
    description: {
      en: 'A guided walk through the historic centre, with stories from the people who live there.',
      pt: 'Uma caminhada guiada pelo centro histórico, com histórias de quem lá vive.',
    },
    startsAt: '2026-11-21T09:00:00',
    city: 'Luanda',
    country: 'Angola',
    region: 'africa',
    registrationUrl: 'https://example.com/register/luanda-heritage-walk',
    tone: 'clay',
  },
  {
    slug: 'online-family-history',
    title: { en: 'Workshop: start your family history', pt: 'Workshop: comece a história da sua família' },
    description: {
      en: 'Ninety minutes, online, with practical steps to collect and keep family memory.',
      pt: 'Noventa minutos, online, com passos práticos para recolher e guardar a memória de família.',
    },
    startsAt: '2026-11-28T18:00:00',
    city: null,
    country: null,
    region: 'online',
    registrationUrl: 'https://example.com/register/family-history',
    tone: 'forest',
  },
  {
    slug: 'lisbon-creators-meetup',
    title: { en: 'Creators meetup in Lisbon', pt: 'Encontro de criadores em Lisboa' },
    description: {
      en: 'An evening for writers, musicians and filmmakers to meet, show work and find collaborators.',
      pt: 'Uma noite para escritores, músicos e realizadores se conhecerem, mostrarem trabalho e encontrarem parceiros.',
    },
    startsAt: '2026-12-05T19:00:00',
    city: 'Lisbon',
    country: 'Portugal',
    region: 'europe',
    registrationUrl: 'https://example.com/register/lisbon-creators',
    tone: 'ochre',
  },
  {
    slug: 'salvador-music-night',
    title: { en: 'Music night: Atlantic rhythms', pt: 'Noite de música: ritmos do Atlântico' },
    description: {
      en: 'Live sets connecting semba, samba de roda and afrobeat.',
      pt: 'Atuações ao vivo a ligar semba, samba de roda e afrobeat.',
    },
    startsAt: '2027-01-16T20:00:00',
    city: 'Salvador',
    country: 'Brazil',
    region: 'americas',
    registrationUrl: null,
    tone: 'clay',
  },
  {
    slug: 'online-founders-talk',
    title: { en: 'Talk: building between two markets', pt: 'Conversa: construir entre dois mercados' },
    description: {
      en: 'Diaspora founders answer questions about trade, hiring and funding across continents.',
      pt: 'Fundadores da diáspora respondem a perguntas sobre comércio, contratação e financiamento entre continentes.',
    },
    startsAt: '2027-02-04T17:00:00',
    city: null,
    country: null,
    region: 'online',
    registrationUrl: 'https://example.com/register/founders-talk',
    tone: 'forest',
  },
  {
    slug: 'johannesburg-circle',
    title: { en: 'Open circle in Johannesburg', pt: 'Círculo aberto em Joanesburgo' },
    description: {
      en: 'Meet people who want to start a local Wakanze circle in the city.',
      pt: 'Conheça quem quer começar um círculo local da Wakanze na cidade.',
    },
    startsAt: '2027-03-13T15:00:00',
    city: 'Johannesburg',
    country: 'South Africa',
    region: 'africa',
    registrationUrl: 'https://example.com/register/joburg-circle',
    tone: 'ochre',
  },
]
