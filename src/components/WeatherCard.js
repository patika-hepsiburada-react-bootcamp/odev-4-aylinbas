import React from "react";

function WeatherCard({ weather }) {
  console.log(weather);
  var cityName = weather.getCityByName.name;

  if (cityName.includes("Province")) {
    cityName = cityName.replace("Province", "");
  }
  var iconCode = weather.getCityByName.weather.summary.icon;
  var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
  const convertToCelsius = (temperature) => (temperature - 272.15).toFixed(2);

  return (
    <div className="weatherCard">
      <h2 className="cardHeader">{cityName} </h2>
      <img className="cardImg" src={iconUrl} alt="new" />

      <div>
        <span className="info">
          {convertToCelsius(weather.getCityByName.weather.temperature.actual)}
          {" °C"}
        </span>
      </div>
      <div>
        <h3 className="infoHeader">
          {weather.getCityByName.weather.summary.description}
        </h3>
      </div>
      <div>
        <span className="info">
          {"Max: "}{" "}
          {convertToCelsius(weather.getCityByName.weather.temperature.max)}{" "}
          {" °C"} {" / Min: "}
          {convertToCelsius(weather.getCityByName.weather.temperature.min)}{" "}
          {" °C"}
        </span>
      </div>
      <h3 className="infoHeader">{"Hissedilen Sıcaklık"}</h3>
      <div>
        <span className="info">
          {convertToCelsius(
            weather.getCityByName.weather.temperature.feelsLike
          )}{" "}
          {" °C"}
        </span>
      </div>
    </div>
  );
}

export default WeatherCard;
