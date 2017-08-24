import Moment from 'moment';
import Fetch from 'node-fetch';
import { URL } from 'url';

import upload from './Upload';

const fetch = async () => {
  try {
    const d = new Date();
    const twoDateAgo = Moment(new Date(d.setDate(d.getDate() - 2))).format('YYYY-MM-DD');

    const params = {
      access_token: process.env.GITHUB_TOKEN,
      q: `language:javascript created:>${twoDateAgo}`,
      sort: 'stars',
      order: 'desc',
    };

    const query = Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');
    const response = await Fetch(`https://api.github.com/search/repositories?${query}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Request-Promise',
      },
    });

    const result = await response.json();

    if (result.total_count > 0) {
      const items = result.total_count > process.env.FETCH_LIMIT
        ? result.items.slice(0, process.env.FETCH_LIMIT) : result.items;
      const posts = items.map((item) => {
        const url = new URL(item.url);

        return {
          url: url.href,
          title: item.full_name,
          description: item.description,
          image: item.owner.avatar_url,
          host: url.hostname,
          path: url.pathname,
        };
      });

      upload(posts);
    }
  } catch (err) {
    console.log(err);
  }
};

export default fetch;
