class FavouriteRestaurantShowPresenter {
  constructor({ view, favouriteRestaurants }) {
    this._view = view;
    this._favouriteRestaurants = favouriteRestaurants;

    this._showFavouriteRestaurants();
  }

  async _showFavouriteRestaurants() {
    const restaurants = await this._favouriteRestaurants.getAllRestaurants();
    this._displayRestaurants(restaurants);
  }

  _displayRestaurants(restaurants) {
    this._view.showFavouriteRestaurants(restaurants);
  }
}

export default FavouriteRestaurantShowPresenter;
