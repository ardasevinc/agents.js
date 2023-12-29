import { dictionaryDefinition } from 'duck-duck-scrape';

export const dictionary = async (query: string) => {
  const dictionaryResults = await dictionaryDefinition(query);

  return dictionaryResults;
};
