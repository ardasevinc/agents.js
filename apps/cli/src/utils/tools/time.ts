import { time } from 'duck-duck-scrape';

export const getTime = async (query: string) => {
  const timeResults = await time(query);

  const shortTimeResults = timeResults.locations
    ?.map((location) => {
      delete location.timechanges;
      return location;
    })
    .slice(0, 4);

  return JSON.stringify(shortTimeResults, null, 2);
};
