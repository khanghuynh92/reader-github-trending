import Xray from 'x-ray';
import { URL } from 'url';

import upload from './Upload';

const x = Xray();

const crawler = () => {
  x('https://medium.com/dailyjs/archive/', '.streamItem .postArticle', [{
    title: '.section-inner h3',
    description: '.section-inner p',
    url: '.postArticle-readMore .button@href',
    image: 'figure img@src',
  }])
  .limit(process.env.FETCH_LIMIT)((err, result) => {
    if (err) {
      console.log(err);
    } else {
      const posts = result.map(({ title, description, url, image }) => {
        const myUrl = new URL(url);

        return {
          url: myUrl.href,
          title,
          description,
          image,
          host: myUrl.hostname,
          path: myUrl.pathname,
        };
      });

      upload(posts);
    }
  });
};

export default crawler;
