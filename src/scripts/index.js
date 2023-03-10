import 'regenerator-runtime'; /* for async await transpile */
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// styles
import '../styles/main.css';
import '../styles/navbar.css';
import '../styles/hero.css';
import '../styles/footer.css';
import '../styles/responsive.css';

// components
import './components/navigation-bar';
import './components/hero-section';
import './components/footer-custom';
import App from './views/App';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.querySelector('#menu-button'),
  drawer: document.querySelector('#drawer'),
  header: document.querySelector('header'),
  content: document.querySelector('#main-section'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
