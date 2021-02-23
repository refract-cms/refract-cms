export interface Localization {
  languages: {
    name: string;
    fallback?: string;
  }[];
  defaultLanguage: string;
}
