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
      presenter._showFoundRestaurants([{ id: 1, title: 'Satu' }]);
      expect(
        document.querySelectorAll('.restaurant__title').item(0).textContent
      ).toEqual('Satu');
    });

    it('should show the title of the found restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1, title: 'Satu' }]);
      expect(
        document.querySelectorAll('.restaurant__title').item(0).textContent
      ).toEqual('Satu');
      presenter._showFoundRestaurants([
        { id: 1, title: 'Satu' },
        { id: 2, title: 'Dua' },
      ]);
      const restaurantTitles = document.querySelectorAll('.restaurant__title');
      expect(restaurantTitles.item(0).textContent).toEqual('Satu');
      expect(restaurantTitles.item(1).textContent).toEqual('Dua');
    });

    it('should show - for found restaurant without title', () => {
      presenter._showFoundRestaurants([{ id: 1 }]);
      expect(
        document.querySelectorAll('.restaurant__title').item(0).textContent
      ).toEqual('-');
    });

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length).toEqual(3);
          done();
        });

      favouriteRestaurants.searchRestaurants
        .withArgs('restaurant a')
        .and.returnValues([
          { id: 111, title: 'restaurant abc' },
          { id: 222, title: 'ada juga restaurant abcde' },
          { id: 333, title: 'ini juga boleh restaurant a' },
        ]);

      searchRestaurants('restaurant a');
    });

    it('should show the name of the restaurants found by Favorite restaurants', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          const restaurantTitles =
            document.querySelectorAll('.restaurant__title');
          expect(restaurantTitles.item(0).textContent).toEqual(
            'restaurant abc'
          );
          expect(restaurantTitles.item(1).textContent).toEqual(
            'ada juga restaurant abcde'
          );
          expect(restaurantTitles.item(2).textContent).toEqual(
            'ini juga boleh restaurant a'
          );

          done();
        });

      favouriteRestaurants.searchRestaurants
        .withArgs('restaurant a')
        .and.returnValues([
          { id: 111, title: 'restaurant abc' },
          { id: 222, title: 'ada juga restaurant abcde' },
          { id: 333, title: 'ini juga boleh restaurant a' },
        ]);

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
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(
            document.querySelectorAll('.restaurants__not__found').length
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
        .getElementById('restaurant-search-container')
        .addEventListener('restaurants:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant').length).toEqual(0);
          done();
        });
      favouriteRestaurants.searchRestaurants
        .withArgs('film a')
        .and.returnValues([]);
      searchRestaurants('film a');
    });
  });
});
