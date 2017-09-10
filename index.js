// import Path from 'path';
import Moment from 'moment';
import { URL } from 'url';
import * as readerScraper from 'reader-scraper';

// generate url
const d = new Date();
const twoDateAgo = Moment(new Date(d.setDate(d.getDate() - 2))).format('YYYY-MM-DD');
const params = {
  access_token: 'a538daf7104fd88118501cee739e412878dd9be2',
  q: `created:>${twoDateAgo}`,
  sort: 'stars',
  order: 'desc',
};
const query = Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');
const url = `https://api.github.com/search/repositories?${query}`;

// map function
const map = (result) => {
  if (result.total_count > 0) {
    const items = result.total_count > process.env.FETCH_LIMIT
      ? result.items.slice(0, process.env.FETCH_LIMIT) : result.items;

    return items.map((item) => {
      const postUrl = new URL(item.url);

      return {
        url: postUrl.href,
        title: item.description || item.full_name,
        content: '',
        image: item.owner.avatar_url,
        host: postUrl.hostname,
        path: postUrl.pathname,
      };
    });
  }
  return [];
};

// config
const config = {
  url,
  map,
  options: {
    method: 'GET',
    headers: {
      'User-Agent': 'Request-Promise',
    },
  },
};

// start scraper
readerScraper.init(config);
readerScraper.start();
