let xhr = new XMLHttpRequest();

const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Fourmies,fr&appid=bb42fe4b0d1ec83e0f25ea6c292817ec";

xhr.open("GET", weatherURL);

xhr.responseType = "json";
xhr.send();
// weather logo
let logo = [
    'logoWeather/cloud.png',
    'logoWeather/rain.png',
    'logoWeather/rain-sun.png',
    'logoWeather/snow.png',
    'logoWeather/sun.png',
    'logoWeather/tempNeg.png',
    'logoWeather/tempPos.png'
]

// target
let weather = document.getElementById('weather');
let logoMeteo = document.createElement('img');
weather.appendChild(logoMeteo);

let temp = document.getElementById('temp');
let logoThermo = document.createElement('img');
let nbrThermo = document.createElement('span');
temp.appendChild(logoThermo);
temp.appendChild(nbrThermo);

xhr.onload = function () {
    if(xhr.status === 200){
        console.log('Yes !');
    }
    let day = new Date();
    let infos = xhr.response;
    // todo log remove
    console.log(infos);
    document.getElementById('country').innerHTML = infos.name;
    document.getElementById('date').innerHTML = day.toLocaleDateString();
    document.getElementById('hour').innerHTML = day.toLocaleTimeString();

    logoMeteo.src = logo[0];
    // clear sky - few clouds - scattered clouds - broken clouds - shower rain - rain - thunderstorm - snow - mist
    document.getElementById('description').innerHTML = 'description';


    let tempC = infos.main.temp - 273.15;
    nbrThermo.innerHTML = tempC.toFixed(2) + '°C';
    if(tempC <= 0){
        logoThermo.src = 'logoWeather/tempNeg.png';
    }
    else {
        logoThermo.src = 'logoWeather/tempPos.png';
    }
    document.getElementById('humidity').innerHTML += infos.main.humidity + '%';
    // 1m/s = 3.6 km/h
    document.getElementById('wind').innerHTML += (infos.wind.speed * 3.6).toFixed(2) + 'km/h';
}

