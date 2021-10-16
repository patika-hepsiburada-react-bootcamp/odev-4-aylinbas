import "./App.css";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import TurkeyMap from "turkey-map-react";
import WeatherCard from "./components/WeatherCard";
import Loading from "./components/Loading";

function App() {
  var WEATHER_QUERY = gql`
    query getCityByName($cityName: String!) {
      getCityByName(name: $cityName) {
        id
        name
        weather {
          summary {
            title
            description
            icon
          }
          clouds {
            all
          }
          temperature {
            feelsLike
            min
            max
            actual
          }
          wind {
            speed
            deg
          }
        }
      }
    }
  `;

  const [cityName, setCityName] = useState("Adana");

  const { loading, error, data } = useQuery(WEATHER_QUERY, {
    variables: { cityName },
  });
  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }
  if (error) {
    return <div>error</div>;
  }

  function clickCity(id, cityName) {
    var convertedCityName = convertCityName(cityName);
    setCityName(convertedCityName);
    console.log(id + ":" + cityName);
  }
  function convertCityName(cityName) {
    return cityName
      .replace(/Ğ/gim, "g")
      .replace(/Ü/gim, "u")
      .replace(/Ş/gim, "s")
      .replace(/I/gim, "i")
      .replace(/İ/gim, "i")
      .replace(/Ö/gim, "o")
      .replace(/Ç/gim, "c")
      .replace(/ğ/gim, "g")
      .replace(/ü/gim, "u")
      .replace(/ş/gim, "s")
      .replace(/ı/gim, "i")
      .replace(/ö/gim, "o")
      .replace(/ç/gim, "c");
  }
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  return (
    <div className="App">
      <h1 className="header">Hava Durumu </h1>
      <h3 className="header">( {today} )</h3>
      <TurkeyMap
        className="map"
        customStyle={{ idleColor: "#E5F1F8", hoverColor: "#69CDB3" }}
        onClick={({ plateNumber, name }) => clickCity(plateNumber, name)}
      />
      <WeatherCard weather={data} />
    </div>
  );
}

export default App;
