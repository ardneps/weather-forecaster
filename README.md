## weather-forecaster

A package that will help you obtain weather information

## Usage

```js
import weather from "weather-forecaster"

weather("istanbul")
/*
{
  date: '10/10/2021',
  location: 'Istanbul, Turkey',
  humidity: '80%',
  weather_state: 'Showers',
  weather_state_iconURL: 'https://www.metaweather.com/static/img/weather/s.svg',
  air_pressure_hPa: 1022,
  wind_speed: '20.4 kmph',
  wind_direction: 'NE',
  temp: '17.1 °C',
  visibility_range: '15 km'
}
*/

// the "date_format" option is "numeric" by default, can be used as "long" for long date response

weather("new york", { date_format: "long" })
/*
{
  date: 'October 10, 2021',
  location: 'New York, New York',
  humidity: '83%',
  weather_state: 'Light Rain',
  weather_state_iconURL: 'https://www.metaweather.com/static/img/weather/lr.svg',
  air_pressure_hPa: 1021.5,
  wind_speed: '14.1 kmph',
  wind_direction: 'ENE',
  temp: '19.0 °C',
  visibility_range: '13.2 km'
}
*/
```

## License

MIT