/* Based on the template in Web Starter Kit :
https://github.com/google/web-starter-kit/blob/master/app/index.html
*/
import chromeFavicon from '../images/portfolio-rebalancer-logo-192px.png';
import appleFavicon from '../images/portfolio-rebalancer-logo-152px.png';
import msFavicon from '../images/portfolio-rebalancer-logo-144px.png';
import favicon from '../images/favicon.png';
import { isDev } from '../config/app';

const metaAssets = () => {
  return [
    {
      charset: 'utf-8'
    },
    {
      name: 'description',
      content: 'Portfolio rebalancing tool'
    },
    {
      'http-equiv': 'X-UA-Compatible',
      content: 'IE=edge'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: 'msapplication-tap-highlight',
      content: 'no'
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes'
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black'
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'reactGo'
    },
    {
      name: 'msapplication-TileImage',
      content: msFavicon
    },
    {
      name: 'msapplication-TileColor',
      content: '#3372DF'
    }
  ];
};

const linkAssets = () => {
  const links = [
    {
      rel: 'icon',
      href: favicon
    },
    {
      rel: 'icon',
      sizes: '192x192',
      href: chromeFavicon
    },
    {
      rel: 'apple-touch-icon',
      sizes: '152x152',
      href: appleFavicon
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed',
      type: 'text/css'
    },
    {
      rel: 'stylesheet',
      href: '/assets/styles/main.css'
    }
  ];
  return isDev() ? links.filter( l => l.rel !== 'stylesheet' ) : links;
};

export const title = 'Portfolio Rebalancer';
export const meta = metaAssets();
export const link = linkAssets();
