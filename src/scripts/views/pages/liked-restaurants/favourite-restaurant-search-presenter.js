class FavouriteRestaurantSearchPresenter {
  constructor({ favouriteRestaurants, view }) {
    this._view = view;
    this._favouriteRestaurants = favouriteRestaurants;
    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestaurants(latestQuery);
    });
  }

  async _searchRestaurants(latestQuery) {
    this._latestQuery = latestQuery.trim();

    let foundRestaurants;
    if (this.latestQuery.length > 0) {
      foundRestaurants = await this._favouriteRestaurants.searchRestaurants(
        this.latestQuery
      );
    } else {
      foundRestaurants = await this._favouriteRestaurants.getAllRestaurants();
    }

    this._showFoundRestaurants(foundRestaurants);
  }

  _showFoundRestaurants(restaurants) {
    this._view.showFavouriteRestaurants(restaurants);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavouriteRestaurantSearchPresenter;
