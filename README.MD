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

function printProduct(prod) {
	console.log("The " + prod.name() + " is " + prod.priceStr());
	console.log("Image URL: " + prod.image_url);
	console.log("Rating: " + prod.rating);
}

// Full URL
scraper.get("https://www.newegg.com/p/N82E16819113499", (prod) => printProduct(prod));

// The AMD Ryzen 7 2700X is 306.38 USD
// Image URL: https://c1.neweggimages.com/ProductImageCompressAll1280/19-113-499-V01.jpg
// Rating: 5


// Product ID
scraper.get("N82E16814202237", (prod) => printProduct(prod));

// The SAPPHIRE 100385L is 79.99 USD
// Image URL: https://c1.neweggimages.com/ProductImageCompressAll1280/14-202-237-01.jpg
// Rating: 4
```

## Bugs

You can use the GitHub issues or send me an [email](mailto:jonahisadev@gmail.com?subject=Scrape%20NewEgg%20Bug) and I'll take a look.
