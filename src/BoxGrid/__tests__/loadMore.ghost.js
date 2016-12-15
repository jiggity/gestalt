/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

const selectors = {
  gridItem: '[class^="Grid__Grid__Item"]',
  staticItem: '.static',
};

describe('BoxGrid > Scrolls', () => {
  it('Loads more when it gets to the bottom of the viewport', async () => {
        // First load the page with javascript disabled to get the item position
    await ghost.open('http://localhost:3000/boxpacking', {
      viewportSize: {
        width: 1000,
        height: 1000,
      },
    });
    await ghost.script(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    let gridItems = await ghost.findElements(selectors.gridItem);
    assert.equal(gridItems.length, 20);

    await ghost.script(() => {
      window.scrollTo(0, window.scrollMaxY);
    });

    gridItems = await ghost.findElements(selectors.gridItem);
    assert.ok(gridItems.length >= 40);
  });
});