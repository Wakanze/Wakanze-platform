import type { Supporter } from './types.ts'

// Fictitious supporters for the mockup. Names and channels are invented.
export const supporters: Supporter[] = [
  {
    slug: 'ana-kiluanje',
    name: 'Ana Kiluanje',
    role: { en: 'Historian and video storyteller', pt: 'Historiadora e contadora de histórias em vídeo' },
    bio: {
      en: 'Turns colonial-era archives into short, sourced video stories about Angola.',
      pt: 'Transforma arquivos da era colonial em pequenas histórias em vídeo, com fontes, sobre Angola.',
    },
    topic: 'history',
    country: 'Angola',
    links: [
      { network: 'instagram', url: 'https://example.com/ana-kiluanje/instagram' },
      { network: 'youtube', url: 'https://example.com/ana-kiluanje/youtube' },
    ],
    tone: 'flame',
  },
  {
    slug: 'djibril-sousa',
    name: 'Djibril Sousa',
    role: { en: 'Music producer', pt: 'Produtor musical' },
    bio: {
      en: 'Mixes Angolan semba with electronic music and records live sessions from Lisbon.',
      pt: 'Mistura semba angolano com música eletrónica e grava sessões ao vivo a partir de Lisboa.',
    },
    topic: 'music',
    country: 'Portugal',
    links: [
      { network: 'tiktok', url: 'https://example.com/djibril-sousa/tiktok' },
      { network: 'instagram', url: 'https://example.com/djibril-sousa/instagram' },
    ],
    tone: 'gold',
  },
  {
    slug: 'efua-santos',
    name: 'Efua Santos',
    role: { en: 'Business writer', pt: 'Escritora de negócios' },
    bio: {
      en: 'Writes a weekly newsletter on trade and small business between Africa and Europe.',
      pt: 'Escreve uma newsletter semanal sobre comércio e pequenos negócios entre África e a Europa.',
    },
    topic: 'business',
    country: 'Ghana',
    links: [{ network: 'website', url: 'https://example.com/efua-santos/newsletter' }],
    tone: 'ink',
  },
  {
    slug: 'malik-ferreira',
    name: 'Malik Ferreira',
    role: { en: 'Language teacher', pt: 'Professor de línguas' },
    bio: {
      en: 'Teaches Kimbundu and Umbundu through short daily lessons for families.',
      pt: 'Ensina kimbundu e umbundu através de pequenas lições diárias para famílias.',
    },
    topic: 'language',
    country: 'Angola',
    links: [
      { network: 'youtube', url: 'https://example.com/malik-ferreira/youtube' },
      { network: 'tiktok', url: 'https://example.com/malik-ferreira/tiktok' },
    ],
    tone: 'ink',
  },
  {
    slug: 'yaa-monteiro',
    name: 'Yaa Monteiro',
    role: { en: 'Documentary filmmaker', pt: 'Realizadora de documentários' },
    bio: {
      en: 'Follows diaspora families returning to their parents’ home towns.',
      pt: 'Acompanha famílias da diáspora no regresso às terras dos pais.',
    },
    topic: 'film',
    country: 'Brazil',
    links: [
      { network: 'instagram', url: 'https://example.com/yaa-monteiro/instagram' },
      { network: 'youtube', url: 'https://example.com/yaa-monteiro/youtube' },
    ],
    tone: 'flame',
  },
  {
    slug: 'kwame-baptista',
    name: 'Kwame Baptista',
    role: { en: 'Interviewee and podcast host', pt: 'Entrevistado e apresentador de podcast' },
    bio: {
      en: 'Talks with elders about the music, food and festivals they grew up with.',
      pt: 'Conversa com os mais velhos sobre a música, a comida e as festas com que cresceram.',
    },
    topic: 'culture',
    country: 'Cape Verde',
    links: [
      { network: 'instagram', url: 'https://example.com/kwame-baptista/instagram' },
      { network: 'facebook', url: 'https://example.com/kwame-baptista/facebook' },
    ],
    tone: 'gold',
  },
]
