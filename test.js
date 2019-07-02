const scraper = require('./main');

function printProduct(prod) {
	console.log("The " + prod.name() + " is " + prod.priceStr());
	console.log("Image URL: " + prod.image_url);
	console.log("Rating: " + prod.rating);
}

// Full URL
scraper.get("https://www.newegg.com/p/N82E16819113499", (prod) => printProduct(prod));

// Product ID
scraper.get("N82E16814202237", (prod) => printProduct(prod));