// Time //

let now = new Date();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

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

let time = document.querySelector("p");
time.innerHTML = `Last updated ${day} @ ${hours}:${minutes}`;

// weather //

let apiKey = "43517670fb49aab181a729d9e96348f2";
let celciusTemp = null;

function showTemperature(response) {
  console.log(response);

  celciusTemp = response.data.main.temp;

  let cityElement = document.querySelector("h2");
  cityElement.innerHTML = `📍 ${response.data.name}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let temperatureElement = document.querySelector(".rightNow");
  let temp = Math.round(celciusTemp);
  temperatureElement.innerHTML = ` ${temp}`;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let wind = document.querySelector(".wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} m/s`;

  let weatherDescription = document.querySelector(".weatherDescription");
  weatherDescription.innerHTML = response.data.weather[0].main;
}

function searchClick(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputCity");
  let city = `${searchInput.value}`;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${url}&appID${apiKey}`).then(showTemperature);
}

let search = document.querySelector(".search-button");
search.addEventListener("click", searchClick);

// autoload

function autoLoad(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemperature);
}

autoLoad("Sydney");

// current geo

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric
`;

  axios.get(url).then(showTemperature);
}

function locationClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let current = document.querySelector(".location-button");
current.addEventListener("click", locationClick);

// Fahrenheit Celcius //

function changeC(event) {
  event.preventDefault();

  changeCelcius.classList.add("active");
  changeFahrenheit.classList.remove("active");

  let tempNow = document.querySelector(".rightNow");
  tempNow.innerHTML = Math.round(celciusTemp);
}

function changeF(event) {
  event.preventDefault();

  changeCelcius.classList.remove("active");
  changeFahrenheit.classList.add("active");

  let tempNow = document.querySelector(".rightNow");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  tempNow.innerHTML = Math.round(fahrenheitTemp);
}

let changeCelcius = document.querySelector(".celcius");
changeCelcius.addEventListener("click", changeC);

let changeFahrenheit = document.querySelector(".fahrenheit");
changeFahrenheit.addEventListener("click", changeF);
