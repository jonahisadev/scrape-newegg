# Scrape NewEgg API Docs

## Know the API

The Scrap NewEgg API is a simple and lightweight scraper that pulls
pertinent information from NewEgg product pages. It came as the result
of wanting a NewEgg Product API for a personal project and not finding
anything useful. This API will be helpful to you if you want a product's:

* Current price
* Rating (out of 5)
* Main image URL
* Specs

It currently does **NOT** support scraping any other information, though
it has some helper functions to simplify things such as finding the
simple product name from the specs.

If you would like to add features that don't drastically change the 
current functionality of the API, I will welcome any and all pull
requests, though understand that I am still working heavily on this
project and adding new features as I need them.

## Include the API

First install the package:
```
npm i scrape-newegg
```

Then include it in your project
```js
const scraper = require('scrape-newegg');
```

## Use the API

The API uses the callback method to give you the information you're
looking for. An example call would look like such:

```js
scraper.get("https://www.newegg.com/p/N82E16834155074", product => {
	console.log(product.name());
});
```

The above code calls the scraper API to get a product, and in a callback,
returns a JSON object representing the product. The callback logs the
name of the product returned.

## Understand the API

The API really only has one useful function, which is:

```js
scraper.get("url", product => {
	...
});
```

This call is asynchronous because of the underlying libraries also
requiring asynchrony. There are plans to add promise and/or await
based functions as well.

Returned in the callback is a product JSON object, whose members (though self-explanatory) are as follows:

* **price**: A floating point representation of the product's price
* **currency**: A string representing the currency
* **rating**: An integer representing the product's rating out of 5
* **image_url**: A URL to the product's main image
* **specs**: ALL of the product's specs are here. The specs are broken
down by category as seen on the NewEgg website. Each key/value pair
as seen on the website is in their respective parent object in the
JSON representation, where each key is converted to all lowercase
with underscores replacing spaces. For example, the "Processors Type"
key would be converted to "processors_type" and retrieved by calling
product.specs.model.processors_type.
* **name()**: A helper function that constructs the products name
* **priceStr()**: A helper function that constructs the products price
and currency (ex: "149.99 USD")

Here is some example output:
```json
{
  price: 149.99,
  currency: 'USD',
  rating: 5,
  image_url: 'https://c1.neweggimages.com/NeweggImage/ProductImageCompressAll1280/19-113-496-V01.jpg',
  specs: {
    model: {
      brand: 'AMD',
      processors_type: 'Desktop',
      series: 'Ryzen 5',
      name: 'AMD Ryzen 5 2600',
      model: 'YD2600BBAFBOX'
    },
    details: {
      cpu_socket_type: 'Socket AM4',
      core_name: 'Pinnacle Ridge',
      '#_of_cores': '6-Core',
      '#_of_threads': '12',
      operating_frequency: '3.4 GHz',
      max_turbo_frequency: '3.9 GHz',
      l1_cache: '576KB',
      l2_cache: '3MB',
      l3_cache: '16MB',
      manufacturing_tech: '12nm',
      '64-bit_support': 'Yes',
      'hyper-threading_support': 'Yes',
      memory_types: 'DDR4 2933',
      memory_channel: '2',
      pci_express_revision: '3.0',
      max_number_of_pci_express_lanes: '16',
      thermal_design_power: '65W',
      cooling_device: 'Heatsink and fan included'
    }
  },
  name: [Function: name],
  priceStr: [Function: priceStr]
}
```

## Hate the API

If this document doesn't make sense to you, and you're pulling your hair
out, don't keep pulling your hair out, that's not good for you. Shoot
me an [email](mailto:jonahisadev@gmail.com?subject=Hate%20the%20API)
and I'll do my best to explain it better!

If you disagree with how this API is constructed, I'm sorry. I will
not fundamentally change it or accept PR's that fundamentally change it.

## Love the API

If you love this API, please give it a star and/or tell a friend who
might also like it!