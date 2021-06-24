## weather-forecaster

> **weather-forecaster** is a NPM module that will allow you to easily access the current and detailed weather conditions of any city in any country that you prefer!

[![package-image]][package-url]  [![install-image]][install-url]
[![NPM] [npm-image]][npm-url]

## Installation
```batch
npm install weather-forecaster
```
## Properties

| Field | Type | Unit | Description |
|:--------|:-------|:-----------|:-------|
| date | object | | The date that the observation pertains (both numeric and long date formats) |
| location | string | | Name of the location (City, Country)|
| location_woeid | integer | | [Where On Earth ID](https://en.wikipedia.org/wiki/WOEID) |
| humidity_percentage | integer | percentage | |
| weather_state | string | | Name of the weather state |
| weather_state_iconURL | string | | Icon of the weather state (SVG format) |
| air_pressure_hPa | float | hPa | |
| wind_speed | object | kmh, mph | |
| wind_direction | string | [compass point](https://en.wikipedia.org/wiki/Points_of_the_compass#Compass_points) | Compass point of the wind direction |
| temp_celcius | object | centigrade | |
| temp_fahrenheit | object | fahrenheit | |
| visibility_range | object | km, miles | Measure of the distance which the weather state can be clearly discerned |

## Usage
  
> Since this package's structure is asynchronous you have to use "async-await" or ".then()" structures when using the module.

Example usages with this structures are given below.

- **Getting all the data with IIFE:**
```js
const weather_forecast = require("weather-forecaster");


(async () => {

    const data = await weather_forecast("san francisco");

    // your code..

    console.log(data);

})();
```

- **Getting all the data with .then():**
```js
const weather_forecast = require("weather-forecaster");


weather_forecast("istanbul").then(data => {

    // your code..

    console.log(data);

});
```

- **Getting all the data with async-await:**
```js
const weather_forecast = require("weather-forecaster");


async function myWeatherData(query) {

    const data = await weather_forecast(query);

    // your code..

    console.log(data);

};

myWeatherData("new york");
```

- **Destructuring & getting specific data:**
```js
const weather_forecast = require("weather-forecaster");


async function myWeatherData(query) {

    const data = await weather_forecast(query);

    /*
    this destructuring assignment will allow us to use 
    these parts of the data without using the data.<name> format
    */
    const { weather_state, temp_celcius } = data;

    // in this case the expected outputs will be the same

    //                                  example outputs:
    console.log(weather_state);      // Light Cloud
    console.log(data.weather_state); // Light Cloud


    /*
    we can do that destructuring assignment once again with
    the parts that we already destructured
    */
    const { lowest, highest, current } = temp_celcius;

    const first_array = [
        lowest,
        highest,
        current
    ];

    const second_array = [
        temp_celcius.lowest,
        temp_celcius.highest,
        temp_celcius.current
    ];

    const third_array = [
        data.temp_celcius.lowest,
        data.temp_celcius.highest,
        data.temp_celcius.current
    ];

    // in this case the expected outputs will be the same

    //                            example outputs:
    console.log(first_array);  // [ 15.2, 23.2, 23.5 ]
    console.log(second_array); // [ 15.2, 23.2, 23.5 ]
    console.log(third_array);  // [ 15.2, 23.2, 23.5 ]

};

myWeatherData("new york");
```

## License

> Licensed under The MIT License (MIT). 
> For the full copyright and license information,
> please view the [LICENSE](https://github.com/berkayfazlioglu/weather-forecaster/blob/master/LICENSE) file.

[package-url]: http://npmjs.org/package/weather-forecaster
[package-image]: https://badge.fury.io/js/weather-forecaster.svg

[install-url]: https://packagephobia.com/result?p=weather-forecaster
[install-image]: https://packagephobia.com/badge?p=weather-forecaster

[npm-url]: https://nodei.co/npm/weather-forecaster/
[npm-image]: https://nodei.co/npm/weather-forecaster.png?downloads=true&downloadRank=true&stars=false