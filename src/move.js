function dateAndTime(cityTime) {
  let now = new Date();

  let year = now.getFullYear();

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[now.getDay()];

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
  let month = months[now.getMonth()];

  return `${day}, ${month} ${now.getDate()}, ${year} ${hour}:${minute}`;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#time");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind-speed");
  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = dateAndTime(response.data.dt * 1000);
  temperatureElement.innerHTML = `${temperature}°C`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
}

function findLocation(city) {
  let apiKey = "3df9e131e8591024e68199d14970d6c0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityX = document.querySelector("#city");
  let cityInput = document.querySelector("#search-city");
  cityX.innerHTML = cityInput.value;

  findLocation(cityInput.value);
}

function retrievePosition(position) {
  let apiKey = "3df9e131e8591024e68199d14970d6c0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

let dateElement = document.querySelector("#time");
let currentTime = new Date();
dateElement.innerHTML = dateAndTime(currentTime);

let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", retrievePosition);

let searchInputForm = document.querySelector("#search-form");
searchInputForm.addEventListener("submit", handleSubmit);

findLocation(Calgary);
