const scraper = require('./scraper');

function printProduct(prod) {
	console.log("The " + prod.name() + " is " + prod.priceStr());
	console.log("Image URL: " + prod.image_url);
	console.log("Rating: " + prod.rating);
}

(async () => {
	// Full URL
	await scraper.get_async("https://www.newegg.com/p/N82E16819113499").then(prod => {
		printProduct(prod);
	}).catch(err => {
		console.log("ERROR: ");
		console.log(err);
	});

	// Product ID
	await scraper.get_async("N82E16820147673").then(prod => {
		printProduct(prod);
	}).catch(err => {
		console.log("ERROR: ");
		console.log(err);
	});
})();