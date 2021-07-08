'use strict';
const appId = 'b98298efed7ed28f5c559de0377cc1c7';
const appNode = document.querySelector('.app');

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

var options = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0
};
var skycons = new Skycons({ color: 'black' });

function drawResult(result) {
    console.log(result);
    if (!result || !result.currently) {
        appNode.innerHTML = 'loading';
        return;
    }


    const temp = result.currently.temperature;
    const name = result.currently.summary;
    const rain = result.currently.precipProbability;
    const feel = result.currently.apparentTemperature;
    appNode.innerHTML = `
        <div class="temp">${temp} °F</div>
        <div class="name">${name}</div>
        <div class="rain">${rain}% Chance of rain.</div>
        <div class="feel">${feel} °F</div>
    `;
    skycons.add('icon1', result.currently.icon);
    skycons.play();
}

function locationSuccess(pos) {
    return fetchData(pos.coords).then(drawResult);
}

function fetchData(position) {
    return fetch(
        `https://wt-7c34bb748e3e4073b3f657c0ae1afac9-0.run.webtask.io/weather?lan=${position.latitude}&lon=${position.longitude}`
    ).then(result => result.json())
    .catch(err => console.log(err));
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

// navigator.geolocation.getCurrentPosition(locationSuccess, error, options);
locationSuccess({
    coords: {
        latitude: '36.253419',
        longitude: '-95.704065'
    }
});
