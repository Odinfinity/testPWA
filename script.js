'use strict';
const appId = '58b6f7c78582bffab3936dac99c31b25';
const appNode = document.querySelector('.app');

var options = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0
};

function drawResult(result) {
    if (!result || !result.name) {
        appNode.innerHTML = 'loading';
        return;
    }
    localStorage.setItem('cachedWather', JSON.stringify(result));
    // const icon = result.weather[0].description
        // .replace('light ', '').replace(' ', '-');
    const icon = `http://openweathermap.org/img/w/${result.weather[0].icon}.png`
    const name = result.name;
    const temp = result.main.temp;
    //<div class="wi wi-${icon}"></div>
    appNode.innerHTML = `
        <img src="${icon}"/>
        <div class="temp">${temp} °C</div>
        <div class="name">${name}</div>
    `;
}

function locationSuccess(pos) {
    fetchData(pos.coords).then(drawResult);
}

function fetchData(position) {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?appid=${appId}&lat=${position.latitude}&lon=${position.longitude}&units=metric`
    ).then(result => result.json());
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(locationSuccess, error, options);
drawResult(JSON.parse(localStorage.getItem('cachedWather') || '{}'));
