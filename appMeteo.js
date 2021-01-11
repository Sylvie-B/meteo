// xhr object creation
let xhr = new XMLHttpRequest();

const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Fourmies,fr&appid=bb42fe4b0d1ec83e0f25ea6c292817ec";

xhr.open("GET", weatherURL);

xhr.responseType = "json";
xhr.send();

// html elements target
let weather = document.getElementById('weather');

let logoMeteo = document.createElement('img');
logoMeteo.style.width = '100%';
weather.appendChild(logoMeteo);

let temp = document.getElementById('temp');
let logoThermo = document.createElement('img');
logoThermo.style.width = '100%';
let nbrThermo = document.createElement('span');
temp.appendChild(logoThermo);
temp.appendChild(nbrThermo);

xhr.onload = function () {
    if(xhr.status !== 200){
        return;
    }

    let day = new Date();
    let infos = xhr.response;

    document.getElementById('country').innerHTML = infos.name;
    document.getElementById('date').innerHTML = day.toLocaleDateString();
    document.getElementById('hour').innerHTML = day.toLocaleTimeString();

    // conditions
    let description = document.getElementById('description');
    let txt = infos.weather[0].description;
    // background night or day
    let thisTime = Date.now() / 1000;
    let night = document.getElementById('night');
    if(thisTime > infos.sys.sunrise && thisTime > infos.sys.sunset){
        night.style.backgroundColor = '#00000080';
        night.style.color = 'white';
    }
    else {
        night.style.backgroundColor = 'unset';
        night.style.color = 'black';
    }
    // weather logo and description
    switch (txt) {
        case 'clear sky':
            logoMeteo.src = (thisTime > infos.sys.sunrise && thisTime > infos.sys.sunset) ? 'logoWeather/sun.png' : 'logoWeather/moon.png';
            description.innerHTML = 'ciel dégagé';
            break;
        case 'few clouds':
            logoMeteo.src = 'logoWeather/cloud.png';
            description.innerHTML = 'peu de nuages';
            break;
        case 'scattered clouds':
            logoMeteo.src = 'logoWeather/cloud.png';
            description.innerHTML = 'quelques nuages';
            break;
        case 'broken clouds':
            logoMeteo.src = 'logoWeather/cloud.png';
            description.innerHTML = 'nuages épars';
            break;
        case 'shower rain':
            logoMeteo.src = 'logoWeather/rain-sun.png';
            description.innerHTML = 'quelques averses';
            break;
        case 'rain':
            logoMeteo.src = 'logoWeather/rain.png';
            description.innerHTML = 'pluie';
            break;
        case 'thunderstorm':
            logoMeteo.src = '';
            description.innerHTML = 'orage';
            break;
        case 'snow':
            logoMeteo.src = 'logoWeather/snow.png';
            description.innerHTML = 'neige';
            break;
    }

    let tempC = infos.main.temp - 273.15;
    nbrThermo.innerHTML = tempC.toFixed(2) + '°C';

    if(tempC <= 0){
        logoThermo.src = 'logoWeather/tempNeg.png';
        nbrThermo.style.color = 'blue';
    }
    else {
        logoThermo.src = 'logoWeather/tempPos.png';
        nbrThermo.style.color = 'red';
    }

    document.getElementById('humidity').innerHTML += infos.main.humidity + '%';
    // 1m/s = 3.6 km/h
    document.getElementById('wind').innerHTML += (infos.wind.speed * 3.6).toFixed(2) + ' km/h';
}

