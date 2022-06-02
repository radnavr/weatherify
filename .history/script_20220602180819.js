const openWeatherApiKey = "58cd46e39e5a31b3119213d7c0410a4e";
const unsplashApiKey =  "1Vo2-aNDpMrtn60DF-XvYoTYZXX9khQLmZp__CqEfjA";

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
    geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${openWeatherApiKey}`
    let headDisplay = document.getElementById("heading");
    headDisplay.innerHTML = city;
    getCityLocationData();

    photoApiUrl = `https://api.unsplash.com//search/photos?query=${city}&page=1&per_page=1&client_id=${unsplashApiKey}`
    getPhoto();   
}

function getPhoto() {
    fetch(photoApiUrl)
        .then(photoResponse => photoResponse.json())
        .then(photoData => displayPhoto(photoData))
}

function displayPhoto(photoData) {
    //console.log(photoData.results[0].urls.regular);
    let photo = document.getElementById("dynamicBackground");
    photo.src = photoData.results[0].urls.regular;
}


function getCityLocationData() {
    fetch(geoApiUrl)
        .then(response1 => response1.json())
        .then(locData => displayCityLocationData(locData))
}

function displayCityLocationData(locData) {
    let latToDisplay = document.getElementById("latitude");
    latToDisplay.innerHTML = "latitude: " + locData[0].lat;
    latitude = locData[0].lat;

    let lonToDisplay = document.getElementById("longitude")
    lonToDisplay.innerHTML = "longitude: " + locData[0].lon;
    longitude = locData[0].lon;

    passLocationData()
    //console.log(locData);
}

function passLocationData() {
    weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}&units=metric`;
    getCityWeatherData();
}


function getCityWeatherData() {
    fetch(weatherApiUrl)
        .then(response2 => response2.json())
        .then(weathData => displayCitiWeatherData(weathData))
}

function displayCitiWeatherData(weathData) {
    let descriptionToDisplay = document.getElementById("weatherDescription");
    descriptionToDisplay.innerHTML = weathData.weather[0].description;

    let tempToDosplay = document.getElementById("temperature");
    tempToDosplay.innerHTML = "temperature: " + weathData.main.temp + " °C";

    let humidToDisplay = document.getElementById("humidity");
    humidToDisplay.innerHTML = "humidity: " + weathData.main.humidity + " %";

    let pressureToDisplay = document.getElementById("atmPressure");
    pressureToDisplay.innerHTML = "pressure: " + weathData.main.pressure + " Pa";

    //console.log(weathData);
}
