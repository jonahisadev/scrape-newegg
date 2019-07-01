# Scrape NewEgg

This is a very simple and lightweight API for scraping NewEgg product
information. It has not been tested much, so use with caution.

## API

The API gets several things:

* Price
* Currency
* Image URL
* All specs

The specs are grouped by categories found on the website and the keys are
formatted in all lowercase with underscores replacing spaces.

Everything is then returned as a JSON object for ease of use.

## Example

```js
const scraper = require('scrape-newegg');

scraper.get("https://www.newegg.com/p/N82E16813157833", product => {
	console.log(product.name() + " is " + product.priceStr());
	console.log("Image URL: " + product.image_url);
});

// The ASRock X470 Master SLI/AC is 139.99 USD
// Image URL: https://c1.neweggimages.com/NeweggImage/ProductImageCompressAll1280/13-157-833-V09.jpg

```

## Bugs

You can use the GitHub issues or send me an [email](mailto:jonahisadev@gmail.com) and I'll take a look.