import RestaurantSource from '../../data/restaurant-source';
import {
  createRestaurantCardTemplate,
  failedLoad,
  spinnerLoading,
} from '../templates/template-creator';

const RestaurantList = {
  async render() {
    return `
    <div class="container">
      <h2>Explore Restaurant</h2>
      <div id="restaurants"></div>
      <div id="spinner-container"></div>
    </div>
    `;
  },

  async afterRender() {
    const restaurantContainer = document.querySelector('#restaurants');
    const spinnerContainer = document.querySelector('#spinner-container');

    spinnerContainer.innerHTML = spinnerLoading();
    try {
      const restaurants = await RestaurantSource.restaurantList();

      spinnerContainer.style.display = 'none';

      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML
          += createRestaurantCardTemplate(restaurant);
      });
    } catch (error) {
      console.log(error);
      spinnerContainer.style.display = 'none';
      restaurantContainer.style.display = 'block';
      restaurantContainer.style.alignItem = 'center';
      restaurantContainer.innerHTML = failedLoad();
    }
  },
};

export default RestaurantList;
