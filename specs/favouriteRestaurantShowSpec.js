import FavouriteRestaurantIdb from '../src/scripts/data/favourite-restaurant-idb';
import FavouriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favourite-restaurant-search-view';
import FavouriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favourite-restaurant-show-presenter';

/* eslint-disable no-undef */
describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavouriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should ask for the favorite restaurants', () => {
      const favouriteRestaurants = spyOnAllFunctions(FavouriteRestaurantIdb);
      new FavouriteRestaurantShowPresenter({
        view,
        favouriteRestaurants,
      });
      expect(favouriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurants have been liked', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(
            document.querySelectorAll('.restaurant-item__not__found').length
          ).toEqual(1);
          done();
        });

      const favouriteRestaurants = spyOnAllFunctions(FavouriteRestaurantIdb);
      favouriteRestaurants.getAllRestaurants.and.returnValues([]);

      new FavouriteRestaurantShowPresenter({
        view,
        favouriteRestaurants,
      });
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.card-item').length).toEqual(2);
          done();
        });
      const favouriteRestaurants = spyOnAllFunctions(
        FavouriteRestaurantIdb,
        false
      );
      favouriteRestaurants.getAllRestaurants.and.returnValues([
        {
          id: 11,
          name: 'A',
          rating: 3,
          description: 'Sebuah restaurant A',
        },
        {
          id: 22,
          name: 'B',
          rating: 4,
          description: 'Sebuah restaurant B',
        },
      ]);
      new FavouriteRestaurantShowPresenter({
        view,
        favouriteRestaurants,
      });
    });
  });
});
