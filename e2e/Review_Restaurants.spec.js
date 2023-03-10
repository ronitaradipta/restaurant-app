/* eslint-disable no-undef */
const assert = require('assert');

Feature('Review Restaurants');

Scenario('Submitting a customer review with alert', async ({ I }) => {
  // Navigate to restaurant detail page
  I.amOnPage('/');
  I.waitForElement('.card-item a', 10);
  I.seeElement('.card-item a');
  I.click(locate('.card-item a').first());

  // Fill out review form and submit
  const name = 'Johan Doe';
  const review = 'Testing review';
  I.seeElement('#review-form');
  I.fillField('#name', name);
  I.fillField('#review', review);
  I.click('#submit-button');

  // Check that the alert appears and click OK
  I.acceptPopup();
  I.wait(1);

  // Check that the review was added and the page was refreshed
  I.seeElement('.review-item');
  const newReview = locate('.review-item').last();
  const elementName = newReview.find('.review-name');
  const elementReview = newReview.find('.review-body p');
  const submittedName = await I.grabTextFrom(elementName);
  const submittedReview = await I.grabTextFrom(elementReview);
  assert.strictEqual(submittedName, name);
  assert.strictEqual(submittedReview, review);
});
