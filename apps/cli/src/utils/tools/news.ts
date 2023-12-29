import { searchNews } from 'duck-duck-scrape';

export const news = async (query: string) => {
  const newsResults = await searchNews(query);

  if (newsResults.noResults) {
    return [];
  }

  return newsResults.results.map((result) => {
    result.date = new Date(result.date * 1000);
    return result;
  });
};
