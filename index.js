const fetch = require("node-fetch");
const { func, convert } = require("./util");
String.prototype.func = func;
String.prototype.convert = convert;

module.exports = async (answer) => {

    const query = encodeURI(answer.func());

    const location_url = `https://www.metaweather.com/api/location/search/?query=${query}`;

    const location_res = await fetch(location_url, { method: "GET" });

    const location_data = (await location_res.json());

    if (location_data.length < 1) return new TypeError("Couldn't find any cities with the given query!");

    const _id = location_data[0].woeid;

    const url = `https://www.metaweather.com/api/location/${_id}`;

    const response = await fetch(url, { method: "GET" });

    const data = (await response.json());

    if (data.detail == "Not found.") return
    new TypeError(`Couldn't find any data for the given city: ${location_data[0].title}!`);

    const { consolidated_weather, title, woeid, parent } = data;

    const {
        applicable_date,
        weather_state_name,
        the_temp,
        min_temp,
        max_temp,
        humidity,
        weather_state_abbr,
        wind_direction_compass,
        wind_speed,
        air_pressure,
        visibility,
    }
        = consolidated_weather[0];

    const direction_names = {
        N: "North",
        S: "South",
        E: "East",
        W: "West",
        NE: "Northeast",
        SE: "Southeast",
        NW: "Northwest",
        SW: "Southwest",
        NNE: "North-Northeast",
        NNW: "North-Northwest",
        SSE: "South-Southeast",
        SSW: "South-Southwest",
        ENE: "East-Northeast",
        ESE: "East-Southeast",
        WNW: "West-Northwest",
        WSW: "West-Southwest"
    };

    const date_options = { year: "numeric", month: "long", day: "numeric" };

    const date_ = new Date(applicable_date);
    const tr_numeric = date_.toLocaleDateString("tr-TR");
    const en_numeric = date_.toLocaleDateString("en-EN");
    const tr_long = date_.toLocaleDateString("tr-TR", date_options);
    const en_long = date_.toLocaleDateString("en-EN", date_options);

    const locale_date = {
        en: {
            numeric: en_numeric,
            long: en_long
        },
        tr: {
            numeric: tr_numeric,
            long: tr_long
        }
    };

    const location = `${title}, ${parent.title}`;
    const location_id = woeid;

    const moisture = parseInt(humidity);

    const state_name = weather_state_name;
    const state_iconURL = `https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg`;

    const pressure = Number(air_pressure.toFixed(1));

    const windspeed = {
        kmh: Number((wind_speed * 1.609344).toFixed(1)),
        mph: Number(wind_speed.toFixed(1))
    };

    const direction_name = direction_names[wind_direction_compass];

    const temp = the_temp.toFixed(1);
    const mintemp = min_temp.toFixed(1);
    const maxtemp = max_temp.toFixed(1);

    const celcius = {
        current: Number(temp),
        lowest: Number(mintemp),
        highest: Number(maxtemp)
    };

    const fahrenheit = {
        current: Number(temp.convert()),
        lowest: Number(mintemp.convert()),
        highest: Number(maxtemp.convert())
    };

    const visibility_range = {
        km: Number((visibility * 1.609344).toFixed(1)),
        miles: Number(visibility.toFixed(1))
    };

    const json = {
        date: locale_date,
        location: location,
        location_woeid: location_id,
        humidity_percentage: moisture,
        weather_state: state_name,
        weather_state_iconURL: state_iconURL,
        air_pressure_hPa: pressure,
        wind_speed: windspeed,
        wind_direction: direction_name,
        temp_celcius: celcius,
        temp_fahrenheit: fahrenheit,
        visibility_range: visibility_range,
    };

    return json;

};