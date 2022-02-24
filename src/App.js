import React, { useState } from "react";
import "./App.css";

function App() {
  const [tes, setTes] = useState("");
  const [location, setLocation] = useState("");
  const [day, setDay] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [tempmRange, setTempRange] = useState("");
  const [icon, setIcon] = useState("");
  const daylist = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday ",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthlist = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const onTrigger = async (event) => {
    setTes("");
    event.preventDefault();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${event.target.cityname.value}&appid=7c65c15ef1ddaf364be84b872b98d6c8`;
    const data = await fetch(url);
    const parsedata = await data.json();
    const today = new Date();
    setWeather(parsedata.weather[0].main);
    setTemp(`${Math.ceil(parsedata.main.temp) - 273}`);

    setTempRange(
      `${Math.ceil(parsedata.main.temp_min) - 273}°c to ${
        Math.ceil(parsedata.main.temp_max) - 273
      }°c`
    );

    setLocation(`${parsedata.name}, ${parsedata.sys.country}`);

    setDay(
      `${daylist[today.getDay()]} ${today.getDate()} ${
        monthlist[today.getMonth()]
      } ${today.getFullYear()}`
    );
    setWeather(parsedata.weather[0].main);
    setTes(parsedata.weather[0].main);
    setIcon(parsedata.weather[0].icon);
  };
  return (
    <div className="App">
      <div className="header">
        <h1>Welcom To Tapmatra.com</h1>
      </div>
      {tes ? (
        <div>
          <div className="formContainer">
            <form onSubmit={onTrigger}>
              <div className="inputBox">
                <input type="text" name="cityname" required="required" />
                <span>Search by city name..</span>
              </div>
            </form>
          </div>
          <div className="infoContainer">
            <h1>{location}</h1>
            <h4>{day}</h4>
            <div className="tempBox">
              <h1>{temp}°c</h1>
            </div>
            <p>(Temperature range {tempmRange})</p>
            <h1>{weather}</h1>
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="asd"
            />
          </div>
        </div>
      ) : (
        <div className="formContainer">
          <form onSubmit={onTrigger}>
            <div className="inputBox">
              <input type="text" name="cityname" required="required" />
              <span>Search by city name..</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
