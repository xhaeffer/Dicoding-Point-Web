const DrawerInitiator = {
  init({ button, drawer, content }) {
    const mediaQuery = window.matchMedia('(min-width: 630px)');
    const menuLinks = drawer.querySelectorAll('a');

    button.addEventListener('click', () => {
      this._toggleDrawer(drawer);
    });

    menuLinks.forEach((menuLink) => {
      menuLink.addEventListener('click', () => {
        if (mediaQuery.matches) {
          return;
        }

        this._closeDrawer(drawer);
      });
    });

    content.addEventListener('click', () => {
      if (mediaQuery.matches) {
        return;
      }

      this._closeDrawer(drawer);
    });
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
