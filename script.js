'use strict';
const appId = 'b98298efed7ed28f5c559de0377cc1c7';
const appNode = document.querySelector('.app');

var options = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0
};
var skycons = new Skycons({"color": "black"});

function drawResult(result) {
    if (!result || !result.currently) {
        appNode.innerHTML = 'loading';
        return;
    }

    const name = result.currently.summary;
    const temp = result.currently.temperature;
    appNode.innerHTML = `
        <div class="temp">${temp} °C</div>
        <div class="name">${name}</div>
    `;
    skycons.add("icon1", result.currently.icon);
    skycons.play();
}



function locationSuccess(pos) {
    fetchData(pos.coords).then(drawResult);
}

function fetchData(position) {
    return fetch(
        `https://api.darksky.net/forecast/${appId}/${position.latitude},${position.longitude}?exclude=hourly,flags,daily&units=auto`
    ).then(result => result.json());
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(locationSuccess, error, options);

if ('serviceWorker' in navigator) {

    navigator.serviceWorker
        .register('service-worker.js')
        .then(function(registration) {
            // Registration Success
            console.log(
                '[serviceWorker]: registration successful with scope: ',
                registration.scope
            );
        })
        .catch(function(err) {
            // Registration failed :(
            console.log('[serviceWorker] registration failed', err);
        });
}
