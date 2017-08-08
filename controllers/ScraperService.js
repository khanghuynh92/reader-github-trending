import crawlerData from '../helpers/Crawler';
import fetchData from '../helpers/Fetch';

export const fetch = async (req, res) => {
  if (process.env.FETCH_TYPE === 'api') {
    fetchData();
  } else {
    crawlerData();
  }

  res.json({
    message: 'Done',
  });
};

export const health = (req, res) => {
  res.json({
    message: 'Done',
  });
};
