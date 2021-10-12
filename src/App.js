
import './App.css';
import Weather from './components/Weather';
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import TurkeyMap from 'turkey-map-react';


function App() {

  var WEATHER_QUERY = gql`
query getCityByName($cityName:String!){
 
    getCityByName(name:$cityName){
      id,name,
      weather{
        summary{title,description},
        clouds{all},
        temperature{feelsLike,min,max,actual},
        wind{speed}
      }}
  }
`;


  const [cityName, setCityName] = useState("Nevsehir");
  const { loading, error, data } = useQuery(WEATHER_QUERY, {
    variables: { cityName },
  });
  if (loading) {
    return <div>
      loading..
    </div>
  }
  if (error) {
    return <div>error</div>
  }

  console.log(data);
  function clickCity(id, cityName) {
    var convertedCityName = convertCityName(cityName);
    setCityName(convertedCityName);
    console.log(id + ":" + cityName);
  }
  function convertCityName(cityName) {

    return cityName.replace(/Ğ/gim, "g")
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

  return (
    <div className="App">
      <Weather />
    </div>
  );
}

export default App;
