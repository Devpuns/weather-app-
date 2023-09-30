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

  console.log("Condition Text from API:", conditionText);
  
  switch (conditionText.toLowerCase()) {
    case "cloudy":
    case "partly cloudy":
      console.log("Setting Cloudy Icon");
      weatherIcon.src = "assets/cloudy.png"; break;
    case "clear":
      console.log("Setting Clear Icon");
      weatherIcon.src = "assets/clear.png"; break;
    case "rain":
    case "patchy rain shower":
    case "light rain shower":
      console.log("Setting Rain Icon");
      weatherIcon.src = "assets/rain.png"; break;
    case "drizzle":
    case "patchy rain possible":
      console.log("Setting Drizzle Icon");
      weatherIcon.src = "assets/drizzle.png"; break;
    case "mist":
      console.log("Setting Mist Icon");
      weatherIcon.src = "assets/mist.png"; break;
    case "humidity":
      console.log("Setting Humidity Icon");
      weatherIcon.src = "assets/humidity.png"; break;
    case "snow":
      console.log("Setting Snow Icon");
      weatherIcon.src = "assets/snow.png"; break;
    case "sunny":
        console.log("Setting Sunny Icon");
        weatherIcon.src = "assets/sunny.png"; break;
    case "wind":
      console.log("Setting Wind Icon");
      weatherIcon.src = "assets/wind.png"; break;
    default:
      console.log("Setting Default Icon");
      weatherIcon.src = "assets/default-weather-icon.png"; break;
  }
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value); 
  });




  // Live location weather--------------------------------------------------------------------------------------------------
function getLiveWeather() {
  // Check if geolocation is supported by the browser
  if ('geolocation' in navigator) {
    // Get the user's current position
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const location = `${latitude},${longitude}`;

      try {
        // Fetch weather data using the API URL
        const response = await fetch(apiUrl + location);
        const data = await response.json();

        // Display weather data on the webpage
        displayWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }, (error) => {
      console.error("Error getting user's location:", error);
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

const searchLiveWeatherButton = document.getElementById("searchLiveWeather");
searchLiveWeatherButton.addEventListener("click", getLiveWeather);

function displayWeatherData(data) {
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

// Function to set the weather icon
function setWeatherIcon(conditionText) {
  const weatherIcon = document.querySelector(".weather-icon");

  switch (conditionText.toLowerCase()) {
    case "cloudy":
    case "partly cloudy":
      weatherIcon.src = "assets/cloudy.png"; break;
    case "clear":
      weatherIcon.src = "assets/clear.png"; break;
    case "rain":
    case "patchy rain shower":
    case "light rain shower":
      weatherIcon.src = "assets/rain.png"; break;
    case "drizzle":
    case "patchy rain possible":
      weatherIcon.src = "assets/drizzle.png"; break;
    case "mist":
      weatherIcon.src = "assets/mist.png"; break;
    case "humidity":
      weatherIcon.src = "assets/humidity.png"; break;
    case "snow":
      weatherIcon.src = "assets/snow.png"; break;
    case "sunny":
      weatherIcon.src = "assets/sunny.png"; break;
    case "wind":
      weatherIcon.src = "assets/wind.png"; break;
    default:
      weatherIcon.src = "assets/default-weather-icon.png"; break;
  }
}




// Getting the map---------------------------------------------------------------------------------------------------------
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



// Get Forecasting details for 8 days----------------------------------------------------------------------------------------------
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
// update and displaying data--------------------------------------------------------------
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


// Selecting theme of the website (dark/ light)-------------------------------------------------------------------------
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


