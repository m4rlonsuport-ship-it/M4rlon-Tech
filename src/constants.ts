export interface Service {
  id: string;
  title: string;
  category: 'Suporte Técnico' | 'Escritório Digital' | 'Entretenimento';
  description: string;
  icon: string;
  delivery: 'Domicílio ou Online' | 'Online / E-mail' | 'Retirada ou Entrega';
}

export const SERVICES: Service[] = [
  {
    id: 'formatacao',
    title: 'Formatação de PC/Notebook',
    category: 'Suporte Técnico',
    description: 'Instalação de Windows/Linux, drivers e programas essenciais.',
    icon: 'Monitor',
    delivery: 'Domicílio ou Online'
  },
  {
    id: 'limpeza',
    title: 'Limpeza Preventiva',
    category: 'Suporte Técnico',
    description: 'Remoção de poeira e troca de pasta térmica para evitar superaquecimento.',
    icon: 'Wind',
    delivery: 'Domicílio ou Online'
  },
  {
    id: 'impressoras',
    title: 'Manutenção de Impressoras',
    category: 'Suporte Técnico',
    description: 'Reparo e configuração de impressoras jato de tinta e laser.',
    icon: 'Printer',
    delivery: 'Domicílio ou Online'
  },
  {
    id: 'digitacao',
    title: 'Digitação e Formatação',
    category: 'Escritório Digital',
    description: 'Trabalhos acadêmicos, documentos e textos em geral.',
    icon: 'FileText',
    delivery: 'Online / E-mail'
  },
  {
    id: 'curriculo',
    title: 'Currículos Profissionais',
    category: 'Escritório Digital',
    description: 'Criação de currículos modernos e otimizados para o mercado.',
    icon: 'UserRound',
    delivery: 'Online / E-mail'
  },
  {
    id: 'musicas',
    title: 'Gravação de Músicas',
    category: 'Entretenimento',
    description: 'Sua playlist favorita em Pendrive ou Cartão de Memória.',
    icon: 'Music',
    delivery: 'Retirada ou Entrega'
  },
  {
    id: 'filmes',
    title: 'Filmes e Séries',
    category: 'Entretenimento',
    description: 'Os melhores lançamentos gravados em Pendrive ou HD Externo.',
    icon: 'Film',
    delivery: 'Retirada ou Entrega'
  }
];
