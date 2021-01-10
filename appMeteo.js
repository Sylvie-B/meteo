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
let display = document.getElementById('weather');
let weather = document.createElement('img');

display.appendChild(weather);

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
    document.getElementById('temp').innerHTML = (infos.main.temp - 273.15).toFixed(2) + '°C';

}

