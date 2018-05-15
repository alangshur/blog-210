var writeAccess = false;
localStorage.setItem('writeAcess', writeAccess);

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

    writeAccess = true;

    alert('Welcome back ' + userName + '!');
}

var homeSelect = document.querySelector('#nav-home');

// navigate home
homeSelect.onclick = function() {
    alert('test');
}

var aboutSelect = document.querySelector('#nav-about');

// navigate about
aboutSelect.onclick = function() {
    alert('test');
}