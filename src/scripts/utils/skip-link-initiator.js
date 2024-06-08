const SkipLinkInitiator = {
  init({ content, skipLink }) {
    if (content && skipLink) {
      this._content = content;
      this._skipLink = skipLink;
      this._attachEventListener();
    }
  },

  _attachEventListener() {
    this._skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      this._content.setAttribute('tabindex', '-1');
      this._content.focus();
      this._content.removeAttribute('tabindex');
      this._content.scrollIntoView({ behavior: 'smooth' });
    });
  },
};

export default SkipLinkInitiator;
