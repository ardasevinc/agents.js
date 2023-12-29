import { forecast } from 'duck-duck-scrape';

export const weather = async (query: string) => {
  const weatherResults = await forecast(query);

  delete weatherResults?.hourly;

  return weatherResults;
};

console.log(await weather('izmir'));
