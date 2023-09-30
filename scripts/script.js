
// Updating weather dashboard dynamically
const apiUrl = "http://api.weatherapi.com/v1/current.json?key=b72ae7c19f3e4bf8b2163755232909&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
  const response = await fetch(apiUrl + city);
  var data = await response.json();

  console.log(data);

  document.querySelector("#city").innerHTML = data.location.name;
  document.querySelector(".feelslike").innerHTML = Math.round(data.current.feelslike_c) + "°C";
  document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
  document.querySelector(".localTime").innerHTML = data.location.localtime;
  document.querySelector(".condition").innerHTML = data.current.condition.text;
  document.querySelector(".wind").innerHTML = data.current.wind_mph + " mph";
  document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
  document.querySelector(".uv").innerHTML = data.current.uv;
  document.querySelector(".cloud").innerHTML = data.current.cloud;
  document.querySelector(".pressure").innerHTML = data.current.pressure_in + " in";

  // Set the weather icon based on the weather condition
  setWeatherIcon(data.current.condition.text);
}

function setWeatherIcon(conditionText) {
  const weatherIcon = document.querySelector(".weather-icon");
  
  switch (conditionText.toLowerCase()) {
    case "cloudy":
      weatherIcon.src = "assets/clouds.png"; break;
    case "clear":
      weatherIcon.src = "assets/clear.png"; break;
    case "rain":
      weatherIcon.src = "assets/rain.png"; break;
    case "drizzle":
      weatherIcon.src = "assets/drizzle.png"; break;
    case "mist":
      weatherIcon.src = "assets/mist.png"; break;
    case "humidity":
      weatherIcon.src = "assets/humidity.png"; break;
    case "snow":
      weatherIcon.src = "assets/snow.png"; break;
    case "wind":
      weatherIcon.src = "assets/wind.png"; break;
    default:
      weatherIcon.src = "assets/default-weather-icon.png"; break;
  }
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value); 
  });



// Getting the map
document.addEventListener("DOMContentLoaded", function () {
  // Get a reference to the map container
  var mapContainer = document.getElementById('map');
  var map = L.map(mapContainer);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  function updateMap(city) {
      var geocodeUrl = 'pk.ae6f05bec51c05facedfbacffab8cbd4' + city;

      // Fetch the coordinates for the entered location
      fetch(geocodeUrl)
          .then(function (response) {
              return response.json();
          })
          .then(function (data) {
              
              var latitude = data.features[0].center[1];
              var longitude = data.features[0].center[0];

              map.setView([latitude, longitude], 13);
          })
          .catch(function (error) {
              console.error('Error geocoding location:', error);
          });
  }
  // Event listener for the "Go" button to update the map
  var goButton = document.getElementById('goToWeather');
  goButton.addEventListener('click', function () {
      var city = document.querySelector('.form-control').value;
      updateMap(city);
  });
});



// Get Forecasting details for 8 days
const apiKey = "b72ae7c19f3e4bf8b2163755232909";
const forecastUrl = "http://api.weatherapi.com/v1/forecast.json";
// get data from API
document.getElementById("getForecastButton").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    getWeatherForecast(city);
});

async function getWeatherForecast(city) {
    const url = `${forecastUrl}?key=${apiKey}&q=${city}&days=8`;
    console.log("Fetching forecast data for city:", city);
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Forecast data:", data); 
        displayWeatherForecast(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
// update and displaying data
function displayWeatherForecast(data) {
    const forecastChart = document.querySelector(".forecast-chart");
    forecastChart.innerHTML = ""; 

    if (data.forecast && data.forecast.forecastday.length > 0) {
        const forecastDays = data.forecast.forecastday;

        forecastDays.forEach(day => {
            const date = day.date;
            const condition = day.day.condition.text;
            const maxTemp = day.day.maxtemp_c;
            const minTemp = day.day.mintemp_c;

            const forecastColumn = document.createElement("div");
            forecastColumn.classList.add("forecast-column");
            forecastColumn.innerHTML = `
                <h3>${date}</h3>
                <p>Condition: ${condition}</p>
                <p>Max Temperature: ${maxTemp}°C</p>
                <p>Min Temperature: ${minTemp}°C</p>
            `;
            forecastChart.appendChild(forecastColumn);
        });
    } else {
        forecastChart.textContent = "No forecast data available for this location.";
    }
}



// let map;
// let marker;

// const successCallback = (position) => {
//   const { latitude, longitude } = position.coords;
//   setLocationInMap(latitude, longitude);
//   getWeatherData(latitude, longitude);
// };

// const errorCallback = (error) => {
//   console.log(error);
// };

// function initMap() {
//   map = L.map('map').setView([0, 0], 13);

//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//   }).addTo(map);

//   marker = L.marker([0, 0]).addTo(map);
//   getLocation();
// }

// function getLocation() {
//   navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
// }

// function goBtnOnClick() {
//   getLocation();
// }

// function getWeatherData(latitude, longitude) {
//   $.ajax({
//     method: 'GET',
//     url: `http://api.weatherapi.com/v1/current.json?key=b72ae7c19f3e4bf8b2163755232909&q=${latitude},${longitude}`,
//     success: (resp) => {
//       const locationName = resp.location.name;
//       const temperature = resp.current.temp_c;
//       const weatherDescription = resp.current.condition.text;

//       updateWeatherUI(locationName, temperature, weatherDescription);
//     },
//     error: (error) => {
//       console.error(error);
//     }
//   });
// }

// function updateWeatherUI(locationName, temperature, weatherDescription) {
//   document.getElementById('locationName').textContent = locationName;
//   document.getElementById('temperature').textContent = `${temperature}°C`;
//   document.getElementById('weatherDescription').textContent = weatherDescription;
// }

// function setLocationInMap(lat, lon) {
//   marker.setLatLng([lat, lon]).update();
//   map.setView([lat, lon], 13);
// }

// function goBtnOnClick() {
//   getLocation();
// }




// let locationName = "";


// const successCallBack = (position) => {
//     console.log(position);
//     setLocationInMap(position.coords.latitude, position.coords.longitude)
// }

// const errorCallBack = (error) => {
//     console.log(error);
// }

// getLocation();

// function getLocation(){
//     navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
// }


// function goBtnOnClick() {
//     $.ajax({
//         method: "GET",
//         url: "http://api.weatherapi.com/v1/current.json?Key=b72ae7c19f3e4bf8b2163755232909&q=Matugama ",
//         success: (resp) => {
//             console.log("Latitude : ",resp.location.lat);
//             console.log("Longitude : ",resp.location.lon);
//             setLocationInMap(resp.location.lat, resp.location.lon);
//         }
//     });
// }

// var map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// var lng = 8.297414;
// var ltd = 80.414101;

// const marker = L.marker([0,0]).addTo(map);

// function setLocationInMap(lng,ltd){
       
//         marker.setLatLng([lng, ltd]).update();
//         map.setView([lng, ltd],13); 
// }



// Selecting theme of the website (dark/ light)
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function toggleDarkMode() {
  if (body.classList.contains('dark-mode')) {
    // Enable light mode
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  } else {
    // Enable dark mode
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
}
themeToggle.addEventListener('click', toggleDarkMode);
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
}




  