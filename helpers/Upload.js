import Fs from 'fs';
import Fetch from 'node-fetch';

const upload = async (posts) => {
  const scraper = JSON.parse(Fs.readFileSync('./scraper.json', 'utf8'));
  if (scraper.id) {
    try {
      await Fetch(`${process.env.SCRAPER_ADMIN_URL}/upload`, {
        headers: {
          'Content-Type': 'application/json',
          'scraper-id': scraper.id,
        },
        method: 'POST',
        body: JSON.stringify(posts),
      });
      console.log('Upload successfully!');
    } catch (err) {
      console.log(err);
    }
  }
};

export default upload;
