/* eslint-disable no-undef */
import { itActsAsFavoriteRestaurantModel } from './contract/favouriteRestaurantContract';
import FavoriteRestaurantIdb from '../src/scripts/data/favourite-restaurant-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestaurantIdb.getAllRestaurants()).forEach(
      async (Restaurant) => {
        await FavoriteRestaurantIdb.deleteRestaurant(Restaurant.id);
      }
    );
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});
