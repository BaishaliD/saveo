let map;
var coords = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 5,
    });
    getLocation();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    setMarker(position.coords.latitude,position.coords.longitude, 'rec.png')
}

function submit(){    
    const location = document.querySelector('#location').value;
    const lat = document.querySelector('#lat').value;
    const long = document.querySelector('#long').value;

    if(!location || !lat || !long){
        window.alert("Please enter the location and the co-ordinates.");
        return;
    }

    if(isNaN(lat) || isNaN(long)){
        window.alert("Please enter valid latitude and longitude.");
        return;
    }
    if(coords.length>=6)
            window.alert("You cannot add more than 5 co-oridnates.");
    else{
        const btn2 = document.querySelector('.button2');
        btn2.style.backgroundColor = "#074770";
        btn2.style.color = "#ffffff";
        btn2.style.cursor = "pointer";        

        const btn1 = document.querySelector('#button1');
        btn1.classList.add('submit-btn');
        btn1.classList.remove('add-btn');
        btn1.innerHTML = 'Submit';

        document.querySelector('#location').value="";
        document.querySelector('#lat').value="";
        document.querySelector('#long').value="";

        updateInfo(location, lat, long);
    }
}

function updateInfo(location, lat, long){
    var len = coords.length;

    document.querySelector('#lat'+len).style.color = 'black';
    document.querySelector('#lon'+len).style.color = 'black';
    document.querySelector('#lat'+len).style.opacity = 1;
    document.querySelector('#lon'+len).style.opacity = 1;

    document.querySelector('#loc'+len).innerHTML = len+") "+location;
    document.querySelector('#lat'+len).innerHTML = lat;
    document.querySelector('#lon'+len).innerHTML = long;    

    setMarker(lat,long, 'location-pin.png');
}

function setMarker(lat, long, icon){
    const pos = { lat: parseFloat(lat), lng: parseFloat(long) };
    const marker = new google.maps.Marker({
        position: pos,
        icon: icon,
        map: map,
    });
    coords.push(pos);
}


function plot(){
    console.log("plot",coords);
    var line= new google.maps.Polyline({
        path: coords,
        geodesic: true,
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    
    line.setMap(map);
}

function checkFields(){
    const location = document.querySelector('#location').value;
    const lat = document.querySelector('#lat').value;
    const long = document.querySelector('#long').value;
    btn1 = document.querySelector('#button1');
    if(location && lat && long){
        btn1.classList.add('add-btn');
        btn1.classList.remove('submit-btn');
        btn1.innerHTML = 'Add';
    }else{
        btn1.classList.add('submit-btn');
        btn1.classList.remove('add-btn');
        btn1.innerHTML = 'Submit';
    }
}


