import {
  createRestaurantCardTemplate,
  spinnerLoading,
} from '../../templates/template-creator';

class FavouriteRestaurantSearchView {
  getTemplate() {
    return `
      <div class="container">
      <h2 class="content__heading">Your Favourite Restaurant</h2>
        <input id="query" type="text" placeholder="Search...">
        <div id="restaurants" class="restaurants">
        </div>
        <div id="spinner-container"></div>
      </div>
    `;
  }

  showFavouriteRestaurants(restaurants = []) {
    let html;
    const spinnerContainer = document.querySelector('#spinner-container');
    spinnerContainer.innerHTML = spinnerLoading();

    if (restaurants.length) {
      spinnerContainer.style.display = 'none';
      html = restaurants.reduce(
        (carry, restaurant) =>
          carry.concat(createRestaurantCardTemplate(restaurant)),
        ''
      );
    } else {
      spinnerContainer.style.display = 'none';
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;

    document
      .getElementById('restaurants')
      .dispatchEvent(new Event('restaurants:updated'));
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="restaurant-item__not__found">Tidak ada restaurant untuk ditampilkan</div>';
  }
}

export default FavouriteRestaurantSearchView;
