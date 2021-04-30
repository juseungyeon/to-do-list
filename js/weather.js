const weather = document.querySelector(".js-weather");

const API_KEY = "5ef8fe3dad9d631ef5a8284683e93b9a";
const COORDS = "coords";

function getIcon(iconID) {
    // icon source = https://erikflowers.github.io/weather-icons/
    const currentIcon = document.querySelector(".wi");
    const iconList = {
        '01d' : "wi-day-sunny",
        '02d' : "wi-day-cloudy",
        '03d' : "wi-cloud",
        '04d' : "wi-cloudy",
        '09d' : "wi-rain",
        '10d' : "wi-day-rain",
        '11d' : "wi-thunderstorm",
        '13d' : "wi-snow",
        '50d' : "wi-fog",
        '01n' : "wi-night-clear",
        '02n' : "wi-night-alt-cloudy",
        '03n' : "wi-cloud",
        '04n' : "wi-cloudy",
        '09n' : "wi-rain",
        '10n' : "wi-rain",
        '11n' : "wi-thunderstorm",
        '13n' : "wi-night-alt-snow",
        '50n' : "wi-night-fog"
    };
    const iconClass = iconList[iconID];
    currentIcon.classList.add(iconClass);
}

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
    .then(response => response.json())
    .then(json => {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${temperature}° <p>${place}</p>`;

        const iconID = json.weather[0].icon;
        getIcon(iconID);
    });
}
 
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj); 
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){ 
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);  
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        //get Weather
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }

}

function init(){
    loadCoords();
}

init();