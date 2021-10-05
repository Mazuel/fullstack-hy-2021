import React, { useEffect, useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
      console.log(response);
    });
  }, []);

  const handleCountryFilter = (event) => {
    setCountryFilter(event.target.value);
  };

  return (
    <div>
      find countries
      <input value={countryFilter} onChange={handleCountryFilter} />
      <FilterCountries countries={countries} filter={countryFilter} />
    </div>
  );
};

const CountryInfo = (props) => {
  const country = props.country;

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="180" height="110"></img>
      <WeatherInfo country={country}></WeatherInfo>
    </div>
  );
};

const WeatherInfo = (props) => {
  axios
    .get(
      `http://api.weatherstack.com/current?access_key=${api_key}&query=${props.country.capital}`
    )
    .then((response) => {
      const weatherData = response.data;
      console.log(response.data);
      return (
        <div>
          <h2>Weather in {props.country.name}</h2>
          <b>temperature: </b> {weatherData.current.temperature}
          <img src={weatherData.weather_icons[0]}></img>
          <b>wind: </b> {weatherData.current.wind_speed} mph direction
          {weatherData.current.wind_dir}
        </div>
      );
    });
  return <p></p>;
};

const CountryListOrInfo = (props) => {
  return (
    <div>
      {props.countries.length === 1 ? (
        <CountryInfo country={props.countries[0]} />
      ) : (
        <div>
          {props.countries.length <= 10 ? (
            <CountryList countries={props.countries} />
          ) : (
            <p>Too many matches, specify another filter</p>
          )}
        </div>
      )}
    </div>
  );
};

const FilterCountries = (props) => {
  const countries = props.countries.filter((country) =>
    country.name.toLowerCase().includes(props.filter.toLowerCase())
  );
  return (
    <div>
      <CountryListOrInfo countries={countries} />
    </div>
  );
};

const CountryList = (props) => {
  return (
    <div>
      {props.countries.map((country) => (
        <div>
          <p>{country.name}</p> <button>show</button>
        </div>
      ))}
    </div>
  );
};

export default App;
