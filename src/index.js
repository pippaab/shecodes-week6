// Time //

let now = new Date();

let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];

if (minutes < 10) {
  minutes = `0${minutes}`;
}

if (hours < 10) {
  hours = `0${hours}`;
}

let time = document.querySelector("p");
time.innerHTML = `Last updated ${day} @ ${hours}:${minutes}`;

// Fahrenheit Celcius //

// function changeC(event) {
//   event.preventDefault();
//  let tempNow = document.querySelector(".rightNow");
//   tempNow.innerHTML = `17`;
// }

// let changeCelcius = document.querySelector(".celcius");
// changeCelcius.addEventListener("click", changeC);

// function changeF(event) {
//   event.preventDefault();
//   let tempNow = document.querySelector(".rightNow");
//   tempNow.innerHTML = `66`;
// }

// let changeFahrenheit = document.querySelector(".fahrenheit");
// changeFahrenheit.addEventListener("click", changeF);

// add to html: <a href="" class = "celcius"> °C </a>| <a href=""  class = "fahrenheit"> °F </a>

// weather //

let apiKey = "43517670fb49aab181a729d9e96348f2";

function showTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector(".rightNow");
  let temp = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = ` ${temp}°C;`;

  let cityElement = document.querySelector("h2");
  cityElement.innerHTML = `📍 ${response.data.name}`;

  let wind = document.querySelector(".wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} m/s`;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let weatherDescription = document.querySelector(".weatherDescription");
  weatherDescription.innerHTML = response.data.weather[0].main;
}

function searchClick(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputCity");
  let cityElement = document.querySelector("h2");
  let city = `${searchInput.value}`;
  cityElement.innerHTML = `📍 ${city}`;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${url}&appID${apiKey}`).then(showTemperature);
}

let search = document.querySelector(".search-button");
search.addEventListener("click", searchClick);

// autoload

function autoLoad(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showLocationTemperature);
}

autoLoad("Sydney");

// current geo

function showLocationTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector(".rightNow");
  let temp = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = ` ${temp}°C;`;

  let cityElement = document.querySelector("h2");
  cityElement.innerHTML = `📍 ${response.data.name}`;

  let wind = document.querySelector(".wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} m/s`;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let weatherDescription = document.querySelector(".weatherDescription");
  weatherDescription.innerHTML = response.data.weather[0].main;
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric
`;

  axios.get(url).then(showLocationTemperature);
}

function locationClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let current = document.querySelector(".location-button");
current.addEventListener("click", locationClick);
