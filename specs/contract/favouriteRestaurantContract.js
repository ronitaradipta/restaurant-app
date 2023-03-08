/* eslint-disable no-undef */
const itActsAsFavoriteRestaurantModel = (favouriteRestaurant) => {
  it('should return the Restaurant that has been added', async () => {
    favouriteRestaurant.putRestaurant({ id: 1 });
    favouriteRestaurant.putRestaurant({ id: 2 });

    expect(await favouriteRestaurant.getRestaurant(1)).toEqual({ id: 1 });
    expect(await favouriteRestaurant.getRestaurant(2)).toEqual({ id: 2 });
    expect(await favouriteRestaurant.getRestaurant(3)).toEqual(undefined);
  });

  it('should refuse a Restaurant from being added if it does not have the correct property', async () => {
    favouriteRestaurant.putRestaurant({ aProperty: 'property' });

    expect(await favouriteRestaurant.getAllRestaurants()).toEqual([]);
  });

  it('can return all of the Restaurants that have been added', async () => {
    favouriteRestaurant.putRestaurant({ id: 1 });
    favouriteRestaurant.putRestaurant({ id: 2 });

    expect(await favouriteRestaurant.getAllRestaurants()).toEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  it('should remove favorite Restaurant', async () => {
    favouriteRestaurant.putRestaurant({ id: 1 });
    favouriteRestaurant.putRestaurant({ id: 2 });
    favouriteRestaurant.putRestaurant({ id: 3 });

    await favouriteRestaurant.deleteRestaurant(1);

    expect(await favouriteRestaurant.getAllRestaurants()).toEqual([
      { id: 2 },
      { id: 3 },
    ]);
  });

  it('should handle request to remove a Restaurant even though the Restaurant has not been added', async () => {
    favouriteRestaurant.putRestaurant({ id: 1 });
    favouriteRestaurant.putRestaurant({ id: 2 });
    favouriteRestaurant.putRestaurant({ id: 3 });

    await favouriteRestaurant.deleteRestaurant(4);

    expect(await favouriteRestaurant.getAllRestaurants()).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);
  });

  it('should be able to search for restaurants', async () => {
    favouriteRestaurant.putRestaurant({ id: 1, title: 'restaurant a' });
    favouriteRestaurant.putRestaurant({ id: 2, title: 'restaurant b' });
    favouriteRestaurant.putRestaurant({ id: 3, title: 'restaurant abc' });
    favouriteRestaurant.putRestaurant({
      id: 4,
      title: 'ini mah restaurant abcd',
    });
    expect(await favouriteRestaurant.searchRestaurants('restaurant a')).toEqual(
      [
        { id: 1, title: 'restaurant a' },
        { id: 3, title: 'restaurant abc' },
        { id: 4, title: 'ini mah restaurant abcd' },
      ]
    );
  });
};

export { itActsAsFavoriteRestaurantModel };
