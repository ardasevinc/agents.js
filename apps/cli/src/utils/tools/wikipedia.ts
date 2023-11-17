import axios from 'axios';

const WIKIPEDIA_ENDPOINT = 'https://en.wikipedia.org/w/api.php';

export const search = async (searchTerm: string) => {
  const params = {
    action: 'query',
    list: 'search',
    srsearch: searchTerm,
    format: 'json',
    srlimit: 10,
  };

  try {
    const res = await axios.get(WIKIPEDIA_ENDPOINT, { params });
    // console.log(JSON.stringify(res.data, null, 2));
    const results = res.data.query.search.map((result: any) => ({
      title: result.title,
      snippet: result.snippet,
      url: getURL(result.title),
    }));
    const resultsWithExtract = await Promise.all(
      results.map(async (result) => ({
        ...result,
        extract: await getExtract(result.title),
      })),
    );
    return resultsWithExtract;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getExtract = async (title: string) => {
  const params = {
    action: 'query',
    prop: 'extracts',
    exintro: '',
    explaintext: '',
    titles: title,
    format: 'json',
  };

  try {
    const res = await axios.get(WIKIPEDIA_ENDPOINT, { params });
    // console.log(JSON.stringify(res.data, null, 2));
    const pages = res.data.query.pages;
    const pageId = Object.keys(pages)[0];
    return pages[pageId].extract;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getURL = (title: string) => {
  return `https://en.wikipedia.org/wiki/${title.replace(/ /g, '_')}`;
};
