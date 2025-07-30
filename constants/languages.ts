export const languages = [
  { value: 'en', label: 'English'  },
  { value: 'vi', label: 'Tiếng Việt' },
];

export const getLanguegeLabel = (lang: string): string => {
  const language = languages.find((l) => l.value === lang);
  return language ? language.label : 'Unknown Language';
}
