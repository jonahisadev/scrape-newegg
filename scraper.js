// ----------------------------------------------------
//                    NewEgg Scraper
//               (c) 2019 Jonah Alligood
// ----------------------------------------------------
const request = require('request');
const $ = require('cheerio');
const util = require('util');

function convert_key(key) {
	return key.replace(/\s/gi, "_").replace(/-/gi, "_").toLowerCase();
}

function extract_id(url) {
	return /https:\/\/www\.newegg\.com\/p\/(.*)/g.exec(url)[1];
}

module.exports.get = (options, cb) => {
	var url;
	if (typeof(options) === 'string')
		url = options;
	else
		url = options.url;

	if (!url.startsWith('https://'))
		url = "https://www.newegg.com/p/" + url;

	var req_params = {
		url: url
	}

	if (options.hasOwnProperty("headers")) {
		req_params['headers'] = options.headers;
	}
	if (options.hasOwnProperty("proxy")) {
		req_params['proxy'] = options.proxy;
	}
	if (options.hasOwnProperty("timeout")) {
		req_params['timeout'] = options.timeout;
	}

	request(req_params, (err, res, body) => {
		if (err) {
			cb(err, null);
			return;
		}

		var html = $.load(body);
		var json = {
			id: extract_id(url),
			price: 0.0,
			currency: "",
			rating: 0,
			image_url: "https:",
			specs: {},
			name: () => {
				if (json.specs.model.hasOwnProperty("name")) {
					return json.specs.model.name;
				}
				var name = "";
				name += json.specs.model.brand + " ";
				if (json.specs.model.hasOwnProperty('series'))
					name += json.specs.model.series + " ";
				name += json.specs.model.model;
				return name;
			},
			priceStr: () => {
				return json.price + " " + json.currency;
			}
		};

		// Price and Currency 
		html("body").find('script[type="application/ld+json"]').each((i, el) => {
			const data = el.children[0].data;
			const price_regex = /\"price\":\"(.*?)\"?\"/g.exec(data);
			const currency_regex = /\"priceCurrency\":\"(.*?)\"?\"/g.exec(data);
			
			if (price_regex == null) return;
			json.price = parseFloat(price_regex[1]);
			json.currency = currency_regex[1];
		});

		// Image URL
		json.image_url += html("span.mainSlide")
			.attr("imgzoompic");

		// Specs
		html("div#Specs").children("fieldset").map((i, fieldset) => {
			const category = convert_key($(fieldset.children[0]).text());
			json.specs[category] = {};
			$(fieldset).children('dl').map((i, dl) => {
				const key = convert_key($(dl.children[0]).text());
				const val = $(dl.children[1]).text().toString();
				json.specs[category][key] = val;
			});
		});

		// Rating
		json.rating = parseInt(html("div[itemprop='aggregateRating']").
			find("span[itemprop='ratingValue']").
			attr("content"));
			
		if (json.price == 0) cb("No price found", null);

		cb(null, json);
	});
};

module.exports.get_async = async (url) => {
	const get = util.promisify(module.exports.get);
	return get(url);
};

module.exports.name = (data) => {
	return data.name();
};

module.exports.priceStr = (data) => {
	return data.priceStr();
}