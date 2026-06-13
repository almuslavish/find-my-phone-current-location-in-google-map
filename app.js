let watchId = null;

function getLocation() {
    if (navigator.geolocation) { 
        const options = { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 };
        if (watchId === null) {
            watchId = navigator.geolocation.watchPosition(showPosition, showError, options);
            document.getElementById("location").innerHTML = "Watching location...";
        } else {
            document.getElementById("location").innerHTML = "Already watching location.";
        }
    } else {
        document.getElementById("location").innerHTML = "Geolocation not supported.";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude; 
    const lng = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    document.getElementById("location").innerHTML = `Latitude: ${lat} <br> Longitude: ${lng} <br> Accuracy: ${accuracy} meters`;

    const mapUrl = `https://maps.google.com/?q=${lat},${lng}`;
    const mapLink = document.getElementById("mapLink");
    if (mapLink) {
        mapLink.href = mapUrl;
        mapLink.innerHTML = "Click here to view your location on Google Maps";
    }
}


function showError(error){
    const el = document.getElementById("location");
    if (showError === permissionDenied){
el.iinerHTML = "User denied the request for Geolocation";
    }

    else if(showError === POSITION_UNAVAILABLE ){
        el.innerHTML = "Location information is unavailable.";

    }

    else if(showError ===  TIMEOUT ){
        el.innerHTML = "The request to get user location timed out.";
    }

    else{
        el.innerHTML = "An unknown geolocation error occurred.";
    }
}

function showError(error) {
    const el = document.getElementById("location");
    if (!el) return;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            el.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            el.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            el.innerHTML = "The request to get user location timed out.";
            break;
        default:
            el.innerHTML = "An unknown geolocation error occurred.";
            break;
    }
}

function stopWatching() { 
    if (watchId !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        const el = document.getElementById("location");
        if (el) el.innerHTML = "Stopped watching location.";
    }
}
