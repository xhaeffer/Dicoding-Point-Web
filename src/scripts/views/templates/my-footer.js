class MyFooter extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = this.getStyle();
    shadow.appendChild(style);

    const myFooter = document.createElement('div');
    myFooter.className = 'my-footer';
    myFooter.innerHTML = this.render();
    shadow.appendChild(myFooter);
  }

  render() {
    return `
      <a href="#" class="logo"> 
        <img src="./images/logo.png" width="85" alt="Point! Logo" />
      </a>  
      <div class="copyright">
        <p>&copy; 2024 - Point!</p>
        <p>Hak cipta dilindungi undang-undang.</p>
      </div>
    `;
  }

  getStyle() {
    return `
      .my-footer {
        display: flex;
        flex-direction: column;
        padding: 5px;
        background-color: #028446;
        align-items: center;
        text-align: center;
        line-height: 1.0;
        font-size: 18px;
        color: white;
      }
    `;
  }
}

customElements.define('my-footer', MyFooter);
