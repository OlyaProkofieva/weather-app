function formatDate(date) {
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }

  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let currentDate = date.getDate();

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[dayIndex];

  let monthIndex = date.getMonth();
  let months = [
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
  let currentMonth = months[monthIndex];

  let formattedDate = `${currentDay}, ${currentDate} ${currentMonth}, ${currentHours}:${currentMinutes}`;
  return formattedDate;
}

function showWeather(response) {
  console.log(response);
  document.querySelector(".day-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector(
    ".current-city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );

  document.querySelector("#pressure").innerHTML = response.data.main.pressure;

  //let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  //regionNames.of(countryName);
}

function searchCity(city) {
  let apiKey = "74e689e7d5e387f646d3bb8762c944a1";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function submitFormSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "74e689e7d5e387f646d3bb8762c944a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function changeDegreeFahrenheit(event) {
  event.preventDefault();
  let newTempFahrenheit = document.querySelector(".day-temperature");
  newTempFahrenheit.innerHTML = 72;
}

function changeDegreeCelsius(event) {
  event.preventDefault();
  let newTempCelsius = document.querySelector(".day-temperature");
  newTempCelsius.innerHTML = 23;
}

let datePlace = document.querySelector(".current-date");
let nowDate = new Date();
datePlace.innerHTML = formatDate(nowDate);

let form = document.querySelector("#searching-form");
form.addEventListener("submit", submitFormSearch);

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getLocation);

searchCity("Kyiv");

let fahrenheitDegree = document.querySelector("#fahrenheit");
fahrenheitDegree.addEventListener("click", changeDegreeFahrenheit);

let celsiusDegree = document.querySelector("#celsius");
celsiusDegree.addEventListener("click", changeDegreeCelsius);
