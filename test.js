const scraper = require('./main');

scraper.get("https://www.newegg.com/p/N82E16813157833", (prod) => {
	console.log("The " + prod.name() + " is " + prod.priceStr());
	console.log("Image: " + prod.image_url);
});