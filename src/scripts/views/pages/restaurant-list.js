import RestaurantSource from '../../data/restaurant-source';
import {
  createRestaurantCardTemplate,
  failedLoad,
  skeletonLoading,
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
    restaurantContainer.innerHTML = skeletonLoading(6);

    try {
      const restaurants = await RestaurantSource.restaurantList();

      restaurantContainer.innerHTML = '';

      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML +=
          createRestaurantCardTemplate(restaurant);
      });
    } catch (error) {
      console.log(error);
      restaurantContainer.style.display = 'block';
      restaurantContainer.style.alignItem = 'center';
      restaurantContainer.innerHTML = failedLoad();
    }
  },
};

export default RestaurantList;
