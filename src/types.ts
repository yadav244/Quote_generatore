export type QuoteTone = 'inspirational' | 'humorous' | 'serious' | 'philosophical' | 'brutalist';

export interface Quote {
  text: string;
  author: string;
  context?: string;
}
