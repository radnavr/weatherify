const openWeatherApiKey = "58cd46e39e5a31b3119213d7c0410a4e";
const unsplashApiKey = "1Vo2-aNDpMrtn60DF-XvYoTYZXX9khQLmZp__CqEfjA";

let city = "";

let geoApiUrl = "";
let latitude = "";
let longitude = "";

let weatherApiUrl = "";

let photoApiUrl = "";

let carryOutSearch = document.getElementById("searchBtn");
carryOutSearch.addEventListener("click", passLocationName);

function passLocationName() {
  city = document.getElementById("cityName").value;
  geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${openWeatherApiKey}`;
  console.log(geoApiUrl);
  getCityLocationData();

  photoApiUrl = `https://api.unsplash.com//search/photos?query=${city}&page=1&per_page=1&client_id=${unsplashApiKey}`;
  getPhoto();
}

function getPhoto() {
  fetch(photoApiUrl)
    .then((photoResponse) => photoResponse.json())
    .then((photoData) => displayPhoto(photoData));
}

function displayPhoto(photoData) {
  //console.log(photoData.results[0].urls.regular);
  let photo = document.getElementById("dynamicBackground");
  photo.src = photoData.results[0].urls.regular;
}

function getCityLocationData() {
  fetch(geoApiUrl)
    .then((response1) => response1.json())
    .then((locData) => displayCityLocationData(locData));
}

function displayCityLocationData(locData) {
  let headDisplay = document.getElementById("heading");
  headDisplay.innerHTML = locData[0].name;

  let latToDisplay = document.getElementById("latitude");
  latToDisplay.innerHTML = "latitude: " + locData[0].lat;
  latitude = locData[0].lat;

  let lonToDisplay = document.getElementById("longitude");
  lonToDisplay.innerHTML = "longitude: " + locData[0].lon;
  longitude = locData[0].lon;

  passLocationData();
  //console.log(locData);
}

function passLocationData() {
  weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}&units=metric`;
  console.log(weatherApiUrl);
  getCityWeatherData();
}

function getCityWeatherData() {
  fetch(weatherApiUrl)
    .then((response2) => response2.json())
    .then((weathData) => displayCitiWeatherData(weathData));
}

function displayCitiWeatherData(weathData) {
  let descriptionToDisplay = document.getElementById("weatherDescription");
  descriptionToDisplay.innerHTML = weathData.weather[0].description;
  // img
  let imgWeather = document.getElementById("imgWeather");
  if (weathData.weather[0].main === "Clear") {
    imgWeather.src =
      "https://library.kissclipart.com/20181005/uew/kissclipart-sunshine-weather-icon-clipart-computer-icons-weath-0526af0fcaed8dd7.png";
  } else if (weathData.weather[0].main === "Clouds") {
    imgWeather.src =
      "https://www.kindpng.com/picc/m/14-143069_weather-thunder-cloud-clouds-sunny-sun-cloud-hd.png";
  } else {
    imgWeather.src =
      "https://www.shareicon.net/data/512x512/2017/04/05/882661_cloud_512x512.png";
  }
  // .
  let tempToDosplay = document.getElementById("temperature");
  tempToDosplay.innerHTML = "Temperature: " + weathData.main.temp + " °C";

  let humidToDisplay = document.getElementById("humidity");
  humidToDisplay.innerHTML = "Humidity: " + weathData.main.humidity + " %";

  let pressureToDisplay = document.getElementById("atmPressure");
  pressureToDisplay.innerHTML = "Pressure: " + weathData.main.pressure + " Pa";

  //console.log(weathData);
}
