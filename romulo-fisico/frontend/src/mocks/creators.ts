import type { Creator } from './types.ts'

// Fictitious creators for the mockup. Names and channels are invented.
export const creators: Creator[] = [
  {
    slug: 'ana-kiluanje',
    name: 'Ana Kiluanje',
    bio: {
      en: 'Historian who turns colonial-era archives into short, sourced video stories.',
      pt: 'Historiadora que transforma arquivos da era colonial em pequenas histórias em vídeo, com fontes.',
    },
    topic: 'history',
    links: [
      { label: 'YouTube', url: 'https://example.com/ana-kiluanje/youtube' },
      { label: 'Instagram', url: 'https://example.com/ana-kiluanje/instagram' },
    ],
    tone: 'clay',
  },
  {
    slug: 'djibril-sousa',
    name: 'Djibril Sousa',
    bio: {
      en: 'Producer mixing Angolan semba with electronic music, recording live from Lisbon.',
      pt: 'Produtor que mistura semba angolano com música eletrónica, a gravar ao vivo a partir de Lisboa.',
    },
    topic: 'music',
    links: [
      { label: 'Spotify', url: 'https://example.com/djibril-sousa/spotify' },
      { label: 'TikTok', url: 'https://example.com/djibril-sousa/tiktok' },
    ],
    tone: 'ochre',
  },
  {
    slug: 'efua-santos',
    name: 'Efua Santos',
    bio: {
      en: 'Writes a weekly newsletter on trade and small business between Africa and Europe.',
      pt: 'Escreve uma newsletter semanal sobre comércio e pequenos negócios entre África e a Europa.',
    },
    topic: 'business',
    links: [{ label: 'Newsletter', url: 'https://example.com/efua-santos/newsletter' }],
    tone: 'forest',
  },
  {
    slug: 'malik-ferreira',
    name: 'Malik Ferreira',
    bio: {
      en: 'Teaches Kimbundu and Umbundu through short daily lessons for families.',
      pt: 'Ensina kimbundu e umbundu através de pequenas lições diárias para famílias.',
    },
    topic: 'language',
    links: [
      { label: 'YouTube', url: 'https://example.com/malik-ferreira/youtube' },
      { label: 'Podcast', url: 'https://example.com/malik-ferreira/podcast' },
    ],
    tone: 'forest',
  },
  {
    slug: 'yaa-monteiro',
    name: 'Yaa Monteiro',
    bio: {
      en: 'Documentary filmmaker following diaspora families returning to their parents’ towns.',
      pt: 'Realizadora de documentários que acompanha famílias da diáspora no regresso às terras dos pais.',
    },
    topic: 'film',
    links: [{ label: 'Vimeo', url: 'https://example.com/yaa-monteiro/vimeo' }],
    tone: 'clay',
  },
  {
    slug: 'kwame-baptista',
    name: 'Kwame Baptista',
    bio: {
      en: 'Podcast host interviewing elders about the music they grew up with.',
      pt: 'Apresentador de podcast que entrevista os mais velhos sobre a música com que cresceram.',
    },
    topic: 'music',
    links: [{ label: 'Podcast', url: 'https://example.com/kwame-baptista/podcast' }],
    tone: 'ochre',
  },
]
