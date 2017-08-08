import MiddelwaresWrapper from '../helpers/RouteMiddlewaresWrapper';
import * as Scraper from './ScraperService';

export const fetch = process.env.NODE_ENV === 'mock' ? (req, res) => {
  res.json({
    message: 'Done',
  });
} : MiddelwaresWrapper(Scraper.fetch);

export const health = process.env.NODE_ENV === 'mock' ? (req, res) => {
  res.json({
    message: 'Done',
  });
} : MiddelwaresWrapper(Scraper.health);
