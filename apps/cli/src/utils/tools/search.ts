import { search, SafeSearchType } from 'duck-duck-scrape';

export const duckduckgo = async (query: string) => {
  const searchResults = await search(query, {
    safeSearch: SafeSearchType.MODERATE,
  });

  if (searchResults.noResults) {
    return [];
  }

  return searchResults.results.map((result) => {
    delete result.bang;
    delete result.rawDescription;
    delete result.icon;
    return result;
  });
};
