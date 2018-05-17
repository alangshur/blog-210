if (!sessionStorage.getItem('writeAccess')) {
    sessionStorage.setItem('writeAccess', false);
}

var promptSelect = document.querySelector('#login');

// login prompt
promptSelect.onclick = function() {
    var input = prompt('Please enter the user password.');
    
    if (input != 'SENDIT') {
        return;
    }

    do {
        var userName = prompt('Please enter your first name.');        
    }
    while (userName != 'Alex' && userName != 'Max' && userName != 'Matt' && userName != 'Ryan');

    // store name in session 
    switch (userName) {
        case 'Alex':
            sessionStorage.setItem('user', 'Alex Langshur');
            break;
        case 'Max':
            sessionStorage.setItem('user', 'Max Comolli');
            break;
        case 'Matt':
            sessionStorage.setItem('user', 'Matt Hall');
            break;
        case 'Ryan':
            sessionStorage.setItem('user', 'Ryan Kearns');        
    }

    // find and store location
    var formattedLocation = 'ARB_STRING';

    do {
        (function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(handleLocation, handleLocationError);
            }
            else {
                console.log('ERROR: Browser doesn\'t support location services');
                formmatedLocation = 'ARB_STRING';
            }
        
            function handleLocation(position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + '%2C' + long + '&language=en', function(data) {
                    sessionStorage.setItem('location', data.results[1].formatted_address);
                    formattedLocation = data.results[1].formatted_address;
                });
            }
            
            function handleLocationError(err) {
                console.log('ERROR: Location unavailable');
                formattedLocation == null;
            }
        })();
    }
    while(formattedLocation == null);


    // set write flag in storage
    sessionStorage.setItem('writeAccess', true);

    alert('Welcome back ' + userName + '!');
}

var homeSelect = document.querySelector('#nav_home');

// navigate home
homeSelect.onclick = function() {
    window.location.href = "index.html";
}

var aboutSelect = document.querySelector('#nav_about');

// navigate about
aboutSelect.onclick = function() {
    window.location.href = "about.html";
}