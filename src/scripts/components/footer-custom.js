class FooterCustom extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    
    <hr>
    <p>CopyrightÂ© 2023 - Roni Taradipta</p>`;
  }
}

customElements.define('footer-custom', FooterCustom);
