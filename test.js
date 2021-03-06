const scraper = require('./scraper');
const fake = require('fake-useragent');

function printProduct(prod) {
	console.log("Item: " + prod.id);
	console.log("The " + prod.name() + " is " + prod.priceStr());
	console.log("Image URL: " + prod.image_url);
	// console.log("Rating: " + prod.rating);
}

(async () => {
	await scraper.get_async('N82E16819113496').then(prod => {
		printProduct(prod);
	}).catch(err => {
		console.log("ERROR: ");
		console.log(err);
	});
})();