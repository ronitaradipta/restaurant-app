import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';

class App {
  constructor({
    button, drawer, header, content,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._header = header;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      header: this._header,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    const mainSection = document.querySelector('#main-section');
    const skipLinkElement = document.querySelector('.skip-link');
    window.scroll(0, 0);
    document.querySelector('.beforeSkip').focus();
    skipLinkElement.addEventListener('click', (event) => {
      event.preventDefault();
      mainSection.scrollIntoView({ behavior: 'smooth' });
      skipLinkElement.blur();
    });
  }
}

export default App;
