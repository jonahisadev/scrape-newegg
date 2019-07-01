const scraper = require('./main');

scraper.get("https://www.newegg.com/p/N82E16819113499", (prod) => {
	console.log(JSON.stringify(prod, null, 4));
});