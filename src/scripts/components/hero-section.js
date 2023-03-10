class HeroSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="hero-section">
        <picture>
          <source media="(min-width: 601px)" srcset="./images/hero-image_2-large.webp" type="image/webp">
          <source media="(max-width: 600px)" srcset="./images/hero-image_2-small.webp" type="image/webp">
          <source media="(min-width: 601px)" srcset="./images/hero-image_2-large.jpg" type="image/jpeg">
          <source media="(max-width: 600px)" srcset="./images/hero-image_2-small.jpg" type="image/jpeg">
          <img src="./images/hero-image_2-large.jpg" alt="hero image">
        </picture>
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
