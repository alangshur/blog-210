if (!sessionStorage.getItem('writeAccess')) {
    sessionStorage.setItem('writeAccess', 'false');
}

var promptSelect = document.querySelector('#login');

// login prompt
try {
    promptSelect.onclick = function() {
        if (sessionStorage.getItem('writeAccess') == 'false') {
            var input = prompt('Please enter the user password.');
    
            if (input != 'SENDIT') {
                alert("Incorrect Password");
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
            try {
                $.ajax({
                    url: "https://geoip-db.com/jsonp",
                    jsonpCallback: "callback",
                    dataType: "jsonp",
                    success: function(location) {
                        var formatted_address = location.city + ", ";

                        if (location.state != null) {
                            formatted_address = formatted_address + location.state + ", ";
                        }
                        
                        formatted_address += location.country_code;
                        sessionStorage.setItem('location', formatted_address);
                    }
                });
            }
            catch(err) {
                console.log("Error retrieving location: " + err);
            }

            // set write flag in storage
            sessionStorage.setItem('writeAccess', 'true');
        
            alert('Welcome back ' + userName + '!');
        }
        else {
            window.location.href = "write.html";
        }
    }
}
catch(err) {}

var homeSelect = document.querySelector('#nav_home');

// navigate home
try {
    homeSelect.onclick = function() {
        window.location.href = "index.html";
    }
}
catch(err) {}

var aboutSelect = document.querySelector('#nav_about');

// navigate about
try {
    aboutSelect.onclick = function() {
        window.location.href = "about.html";
    }
}
catch(err) {}