import DrawerInitiator from '../utils/drawer-initiator';
import SkipLinkInitiator from '../utils/skip-link-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    button,
    drawer,
    content,
    skipLink,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._skipLink = skipLink;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
    SkipLinkInitiator.init({
      content: this._content,
      skipLink: this._skipLink,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    this._content.innerHTML = await page.render();
    await page.afterRender();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export default App;
