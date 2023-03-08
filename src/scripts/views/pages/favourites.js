import FavouriteRestaurantIdb from '../../data/favourite-restaurant-idb';
import {
  createRestaurantCardTemplate,
  spinnerLoading,
} from '../templates/template-creator';

const Favourites = {
  async render() {
    return `
      <div class="container">
      <h2>Your Favourite Restaurants</h2>
      <div id="restaurants"></div>
      <div id="spinner-container"></div>
    </div>
    `;
  },

  async afterRender() {
    const spinnerContainer = document.querySelector('#spinner-container');
    spinnerContainer.innerHTML = spinnerLoading();

    const restaurants = await FavouriteRestaurantIdb.getAllRestaurants();
    const restaurantContainer = document.querySelector('#restaurants');

    if (restaurants.length === 0) {
      spinnerContainer.style.display = 'none';
      restaurantContainer.style.display = 'block';
      restaurantContainer.style.alignItem = 'center';
      restaurantContainer.innerHTML = '<p>You don\'t have a list of favorite restaurants yet</p>';
    } else {
      spinnerContainer.style.display = 'none';
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML
          += createRestaurantCardTemplate(restaurant);
      });
    }
  },
};

export default Favourites;
