import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';

import swRegister from './utils/sw-register';
import App from './views/app';

import './views/templates/menu-bar';
import './views/templates/slideshow';
import './views/templates/restaurant-list';
import './views/templates/restaurant-info';
import './views/templates/my-footer';

const menuBar = document.querySelector('menu-bar');

const app = new App({
  button: menuBar.querySelector('#hamburger'),
  drawer: menuBar.querySelector('#menu-list'),
  content: document.querySelector('#main'),
  skipLink: document.querySelector('#skipLink'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
