/* eslint-disable no-undef */
import FavouriteRestaurantIdb from '../src/scripts/data/favourite-restaurant-idb';
import FavouriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favourite-restaurant-search-presenter';
import FavouriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favourite-restaurant-search-view';

describe('Searching restaurants', () => {
  let presenter;
  let favouriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavouriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favouriteRestaurants = spyOnAllFunctions(FavouriteRestaurantIdb);
    presenter = new FavouriteRestaurantSearchPresenter({
      favouriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('when query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('restaurant a');

      const queryElement = document.getElementById('query');
      queryElement.value = 'restaurant a';
      queryElement.dispatchEvent(new Event('change'));

      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for liked Restaurants', () => {
      searchRestaurants('restaurant a');

      expect(favouriteRestaurants.searchRestaurants).toHaveBeenCalledWith(
        'restaurant a'
      );
    });

    it('should show the found restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1, name: 'Satu' }]);
      expect(
        document.querySelectorAll('.restaurant__title').item(0).textContent
      ).toEqual('Satu');
    });

    it('should show - when the restaurant returned does not contain a title', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantTitles =
            document.querySelectorAll('.restaurant__title');
          expect(restaurantTitles.item(0).textContent).toEqual('-');

          done();
        });

      favouriteRestaurants.searchRestaurants
        .withArgs('restaurant a')
        .and.returnValues([{ id: 444 }]);

      searchRestaurants('restaurant a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchRestaurants('    ');
      expect(favouriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(
            document.querySelectorAll('.restaurant-item__not__found').length
          ).toEqual(1);
          done();
        });

      favouriteRestaurants.searchRestaurants
        .withArgs('restaurant a')
        .and.returnValues([]);

      searchRestaurants('restaurant a');
    });

    it('should not show any restaurant', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant').length).toEqual(0);
          done();
        });
      favouriteRestaurants.searchRestaurants
        .withArgs('restaurant a')
        .and.returnValues([]);
      searchRestaurants('restaurant a');
    });
  });
});
