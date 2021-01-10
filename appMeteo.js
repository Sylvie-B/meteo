let xhr = new XMLHttpRequest();

const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Fourmies,fr&appid=bb42fe4b0d1ec83e0f25ea6c292817ec";

xhr.open("GET", weatherURL);

xhr.responseType = "json";
xhr.send();

// target
let weather = document.getElementById('weather');

let logoMeteo = document.createElement('img');
logoMeteo.style.width = '14vw';
weather.appendChild(logoMeteo);

let temp = document.getElementById('temp');
let logoThermo = document.createElement('img');
logoThermo.style.width = '10vw';
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


    // clear sky - few clouds -  -  -  -  -  -  -
    let description = document.getElementById('description');
    let txt = infos.weather[0].description;
    console.log(txt);
    switch (txt) {
        case 'clear sky':
            logoMeteo.src = 'logoWeather/sun.png';
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
        // case 'mist':
        //     logoMeteo.src = '';
        //     description.innerHTML = '';
        //     break;
    }



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

