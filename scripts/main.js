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
                $.getJSON('https://ipapi.co/json/', function(data){
                    sessionStorage.setItem('location', data.city + ", " + data.region + ", " + data.country_name);
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

var deleteSelect = document.querySelector('#delete');

// delete button

try {
    deleteSelect.onclick = function() {
        var input = prompt('Copy and paste the exact time and date of the post you want to delete.');

        document.getElementById("delete-input").value = input;
        document.getElementById("delete-form").submit();
    }
}
catch(err) {}

function updateFields() {
    // get time (convert from 24-hour clock)
    var formatted_date, formatted_time;
    var date = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var time = date.getHours();
    var meridiem = (time < 12) ? "AM" : "PM";
    time = (time + 11) % 12 + 1;

    var min = date.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    
    formatted_time = time + ":" + min + " " + meridiem;
    formatted_date = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

    document.getElementById("user-input").value = sessionStorage.getItem('user');
    document.getElementById("formatted-date-input").value = formatted_date + " at " + formatted_time;
    document.getElementById("date-input").value = new Date();
    document.getElementById("location-input").value = sessionStorage.getItem('location');
}