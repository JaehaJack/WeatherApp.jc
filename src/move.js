function dateAndTime(date) {
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
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind-speed");

  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = dateAndTime(response.data.dt * 1000);
  temperatureElement.innerHTML = `${temperature}°C`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;

  console.log(response);
}

function findLocation(city) {
  let apiKey = "3df9e131e8591024e68199d14970d6c0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city");
  let cityInput = document.querySelector("#search-city");
  city.innerHTML = cityInput.value;

  findLocation(cityInput.value);
}

function retrievePosition(position) {
  let apiKey = "3df9e131e8591024e68199d14970d6c0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocation = document.querySelector("#geoLocation");
currentLocation.addEventListener("click", getCurrentPosition);

let searchInputForm = document.querySelector("#search-form");
searchInputForm.addEventListener("submit", handleSubmit);

let primeDisplay = "Tokyo";
findLocation(primeDisplay);
