localStorage.setItem('writeAccess', false);

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

    switch (userName) {
        case 'Alex':
            localStorage.setItem('user', 'Alex Langshur');
            break;
        case 'Max':
            localStorage.setItem('user', 'Max Comolli');
            break;
        case 'Matt':
            localStorage.setItem('user', 'Matt Hall');
            break;
        case 'Ryan':
            localStorage.setItem('user', 'Ryan Kearns');        
    }

    localStorage.setItem('writeAccess', true);

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

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)

    var locationJSON = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';

    $.getJSON(locationJSON).done(function(location) {
        console.log(location)
    })
}

function error(err) {
    console.log(err)
}