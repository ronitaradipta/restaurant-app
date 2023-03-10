/* eslint-disable no-undef */
const assert = require('assert');

Feature('Search Favourite Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favourites');
});

Scenario('searching restaurants', async ({ I }) => {
  I.see(
    'Tidak ada restaurant untuk ditampilkan',
    '.restaurant-item__not__found'
  );

  I.amOnPage('/');
  I.waitForElement('.card-item a', 10);
  I.seeElement('.card-item a');

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.card-item a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.restaurant-title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favourites');
  I.seeElement('#query');

  const searchQuery = titles[1].substring(1, 3);
  const matchingRestaurants = titles.filter(
    (title) => title.indexOf(searchQuery) !== -1
  );

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements(
    '.card-item'
  );
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

  matchingRestaurants.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(
      locate('.restaurant__title').at(index + 1)
    );
    assert.strictEqual(title, visibleTitle);
  });
});
