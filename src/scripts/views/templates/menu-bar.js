class MenuBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.getStyle();
    shadow.appendChild(style);

    const menu = document.createElement('div');
    menu.className = 'menu';
    menu.innerHTML = this.render();
    shadow.appendChild(menu);
  }

  render() {
    return `
      <div class="menu-bar">
        <a href="#/explore-us" class="logo"> 
          <img src="./images/logo.png" width="75" alt="Point! Logo" />
        </a>        
        <button class="hamburger" id="hamburger" aria-label="Toggle Navigation">
          ☰
        </button>
      </div>
      <ul class="menu-list" id="menu-list" aria-label="Main Navigation">
        <li><a href="#">Home</a></li>
        <li><a href="#/favorite">Favorite</a></li>
        <li><a href="https://github.com/xhaeffer">About Us</a></li>
      </ul>
    `;
  }

  getStyle() {
    return `
      .menu {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 3%;
        left: 50%;
        width: 90%;
        transform: translateX(-50%);
        border-radius: 30px;
        background-color: #028446;
        z-index: 10;
      }
        
      .menu > .menu-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
        
      .menu > .menu-bar > .logo {
        display: flex;
        margin-left: 10px;
      }
        
      .menu > .menu-bar > .hamburger {
        padding-bottom: 5px;
        padding-right: 25px;
        font-size: 2rem;
        color: white;
        background-color: transparent;
        border: none;
        cursor: pointer;
      }
        
      .menu > .menu-list {
        display: none;
        flex-direction: column;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0;
      }
        
      .menu >.menu-list > li > a {
        display: block;
        padding: 15px 20px;
        font-size: 22px;
        color: #ffffff;
        text-decoration: none;
      }
        
      .menu > .menu-list > li > a:hover {
        background-color: #f2f2f2;
        color: #028446;
      }

      @media screen and (min-width: 630px) {
        .menu {
          flex-direction: row;
        }
      
        .menu > .menu-bar > .hamburger {
          display: none;
        }
        
        .menu > .menu-list {
          display: flex;
          flex-direction: row;
          margin-left: 30px;
          gap: 15px;
        }
      
        .menu >.menu-list > li > a {
          font-size: 17px;
        }
      }
    `;
  }
}

customElements.define('menu-bar', MenuBar);
