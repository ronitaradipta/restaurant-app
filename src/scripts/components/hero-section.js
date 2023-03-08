class HeroSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="hero-section">
        <div class="hero-section__content">
          <h1>Discover Deliciousness</h1>
          <p>
            with MealMap - your ultimate dining companion. Find the best
            restaurants, read reviews, and plan your next culinary adventure.
            Download MealMap today and start exploring your city's dining scene
            like never before!
          </p>
          <a href="#main-section">Explore Now</a>
        </div>
      </div>`;
  }
}

customElements.define('hero-section', HeroSection);
