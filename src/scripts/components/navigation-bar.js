class Navbar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav class="container">
        <div class="logo-brand">
          <a href="#" aria-label="logo">MealMap</a>
        </div>
        <a href="#" id="menu-button"><i class="fa-solid fa-bars"></i></a>
        <ul id="drawer">
          <li class="menu-item"><a href="#/">Home</a></li>
          <li class="menu-item"><a href="#/favourites">Favourite</a></li>
          <li class="menu-item"><a href="https://www.linkedin.com/in/roni-taradipta-6b0151217">About Us</a></li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('navigation-bar', Navbar);
