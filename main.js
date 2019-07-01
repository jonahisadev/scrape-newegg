// ----------------------------------------------------
//                    NewEgg Scraper
//               (c) 2019 Jonah Alligood
// ----------------------------------------------------
const request = require('request');
const $ = require('cheerio');

function convert_key(key) {
	return key.replace(/\s/gi, "_").toLowerCase();
}

module.exports.get = (url, cb) => {
	request(url, (err, res, body) => {
		var html = $.load(body);
		var json = {
			price: 0.0,
			currency: "",
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

		// Price
		html("div[itemtype='//schema.org/Offer']").children().map((i, el) => {
			el = $(el);
			const prop = el.attr("itemprop");
			const data = el.attr("content");
			if (prop == "price") {
				json.price = parseFloat(data);
			} else if (prop == "priceCurrency") {
				json.currency = data;
			}
		});

		// Image URL
		json.image_url += html("span.mainSlide").attr("imgzoompic");

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

		cb(json);
	});
};

module.exports.name = (data) => {
	return data.name();
};

module.exports.priceStr = (data) => {
	return data.priceStr();
}