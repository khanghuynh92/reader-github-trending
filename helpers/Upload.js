import Fetch from 'node-fetch';

const upload = async (posts) => {
  try {
    await Fetch(`${process.env.SCRAPER_ADMIN_URL}/upload`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(posts),
    });
    console.log('Upload successfully!');
  } catch (err) {
    console.log(err);
  }
};

export default upload;
