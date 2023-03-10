import FavouriteRestaurantIdb from '../../data/favourite-restaurant-idb';
import FavouriteRestaurantSearchPresenter from './liked-restaurants/favourite-restaurant-search-presenter';
import FavouriteRestaurantSearchView from './liked-restaurants/favourite-restaurant-search-view';
import FavouriteRestaurantShowPresenter from './liked-restaurants/favourite-restaurant-show-presenter';

const view = new FavouriteRestaurantSearchView();

const Favourites = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavouriteRestaurantShowPresenter({
      view,
      favouriteRestaurants: FavouriteRestaurantIdb,
    });
    new FavouriteRestaurantSearchPresenter({
      view,
      favouriteRestaurants: FavouriteRestaurantIdb,
    });
  },
};

export default Favourites;
