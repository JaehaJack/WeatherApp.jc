function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h3");
  let descriptionElement = document.querySelector("h4");
  temperatureElement.innerHTML = `${temperature}°C`;
  descriptionElement.innerHTML = response.data.weather[0].description;
}

function findLocation(city) {
  let apiKey = "3df9e131e8591024e68199d14970d6c0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityX = document.querySelector("h1");
  let cityInput = document.querySelector("#search-city-input");
  cityX.innerHTML = cityInput.value;

  findLocation(cityInput.value);
}

let searchInputForm = document.querySelector("#search-form");
searchInputForm.addEventListener("submit", handleSubmit);

function retrievePosition(position) {
  let apiKey = "3df9e131e8591024e68199d14970d6c0";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", retrievePosition);

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

  let h2 = document.querySelector("h2");
  h2.innerHTML = `${day}, ${month} ${now.getDate()}, ${year} ${hour}:${minute}`;
}
