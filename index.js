const fetch = require("node-fetch");

const weather = async (answer, options = { date_format: "numeric" }) => {

    const query = encodeURI(convertToEnglish(answer));

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

    let { date_format } = options;
    if (date_format !== "numeric" && date_format !== "long") date_format = "numeric";

    const { consolidated_weather, title, parent } = data;

    const [{
        applicable_date,
        weather_state_name,
        the_temp,
        humidity,
        weather_state_abbr,
        wind_direction_compass,
        wind_speed,
        air_pressure,
        visibility,
    }]
        = consolidated_weather;

    const date_ = new Date(applicable_date);

    const locale_date =
    date_.toLocaleDateString("en-US", { year: "numeric", month: date_format, day: "numeric" });

    const location = `${title}, ${parent.title}`;

    const moisture = parseInt(humidity);

    const state_name = weather_state_name;
    const state_iconURL = `https://www.metaweather.com/static/img/weather/${weather_state_abbr}.svg`;

    const pressure = Number(air_pressure.toFixed(1));

    const windspeed = Number((wind_speed * 1.609344).toFixed(1));

    const temp = the_temp.toFixed(1);

    const visibility_range = Number((visibility * 1.609344).toFixed(1));

    return {
        date: locale_date,
        location: location,
        humidity: `${moisture}%`,
        weather_state: state_name,
        weather_state_iconURL: state_iconURL,
        air_pressure_hPa: pressure,
        wind_speed: `${windspeed} kmph`,
        wind_direction: wind_direction_compass,
        temp: `${temp} °C`,
        visibility_range: `${visibility_range} km`,
    };
};

function convertToEnglish(text) {
    return text
        .replace("Ğ", "g")
        .replace("Ü", "u")
        .replace("Ş", "s")
        .replace("I", "i")
        .replace("İ", "i")
        .replace("Ö", "o")
        .replace("Ç", "c")
        .replace("ğ", "g")
        .replace("ü", "u")
        .replace("ş", "s")
        .replace("ı", "i")
        .replace("ö", "o")
        .replace("ç", "c");
};

module.exports = weather;
module.exports.weather = weather;