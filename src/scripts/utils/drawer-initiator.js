const DrawerInitiator = {
  init({ button, drawer, content }) {
    let isLargeScreen = window.matchMedia('(min-width: 630px)').matches;

    button.addEventListener('click', () => {
      this._toggleDrawer(drawer);
    });

    drawer.addEventListener('click', (event) => {
      if (!isLargeScreen && event.target.tagName === 'A') {
        this._toggleDrawer(drawer);
      }
    });

    content.addEventListener('click', () => {
      if (!isLargeScreen) {
        this._closeDrawer(drawer);
      }
    });

    new ResizeObserver(() => {
      isLargeScreen = window.matchMedia('(min-width: 630px)').matches;
    }).observe(document.body);
  },

  _toggleDrawer(drawer) {
    const { style } = drawer;
    style.display = style.display === 'flex' ? 'none' : 'flex';
  },

  _closeDrawer(drawer) {
    const { style } = drawer;
    style.display = 'none';
  },
};

export default DrawerInitiator;
