var dateTag = document.querySelector('.sort-date');
var dateSelect = document.querySelector('#flip-date');
var sortState = null;
var uncorruptedCopy;

// flip date carrot
dateTag.onclick = function() {
    if (dateSelect.classList.contains('down')) {
        dateSelect.classList.toggle('down');
        dateSelect.classList.toggle('flip-move');
        sortPosts("date", "oldest");
    }
    else {
        dateSelect.classList.toggle('down');
        dateSelect.classList.toggle('flip-move');
        sortPosts("date", "newest");
    }
}

function triggerDrop() {
    document.getElementById("dropdown-trigger").classList.toggle("show");
}

window.onclick = function(event) {
    if (sortState == null) {
        uncorruptedCopy = $('.post-list');
    }

    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");

        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];

            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }   
        }
    }
}

function sortPosts(mode, type) {
    // reset html and resort with new mode/type
    if (mode == "person" && !dateSelect.classList.contains('down')) {
        dateSelect.classList.toggle('down');
        dateSelect.classList.toggle('flip-move');
    }
    else if (mode == "date") {
        var dropdowns = document.getElementsByClassName("dropdown-content");

        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];

            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }   
        }
    }

    if (mode == "person") {
        if (sortState == "date" || sortState == null) {
            uncorruptedCopy.appendTo('#post-body');
            sortState = "person";
        }

        // sort user
        $('.post-list').sort(function(a, b) {
            return compareUsers($(a)[0].dataset.user, $(b)[0].dataset.user, type);
        }).appendTo('#post-body');
    }
    else {
        if (sortState == "person" || sortState == null) {
            uncorruptedCopy.appendTo('#post-body');
            sortState = "date";
        }

        $('.post-list').sort(function(a, b) {
            return compareDates($(a)[0].dataset.time, $(b)[0].dataset.time);
        }).appendTo('#post-body');

        $('.post-list').sort(function(a, b) {
            return -1 * (compareDates($(a)[0].dataset.time, $(b)[0].dataset.time));
        }).appendTo('#post-body');
    }
}

function compareUsers(a, b, type) {
    if (a == b || (a != type && b != type)) {
        return 0;
    }
    else if (a == type) {
        return -1;
    }
    else {
        return 1;
    }
}

function compareDates(a, b) {
    var dateArrA = composeDataArr(a);
    var dateArrB = composeDataArr(b);

    if (dateArrA[0] != dateArrB[0]) {
        return (dateArrA[0] > dateArrB[0]) ? 1 : -1;
    }
    if (dateArrA[1] != dateArrB[1]) {
        return (dateArrA[1] > dateArrB[1]) ? 1 : -1;
    }
    if (dateArrA[2] != dateArrB[2]) {
        return (dateArrA[2] > dateArrB[2]) ? 1 : -1;
    }
    if (dateArrA[3] != dateArrB[3]) {
        return (dataArrA[3] == "PM") ? 1 : -1;
    }
    if (dateArrA[4] != dateArrB[4]) {
        return (dateArrA[1] > dateArrB[1]) ? 1 : -1;
    }
    if (dateArrA[5] != dateArrB[5]) {
        return (dateArrA[2] > dateArrB[2]) ? 1 : -1;
    }

    return 0;
}

function composeDataArr(dateStr) {
    var raw = dateStr.split(' ');
    var timeArr = raw[4].split(':');
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    raw[1] = raw[1].substring(0, raw[1].length - 1);

    for (var i = 0; i < months.length; i++) {
        if (raw[0] == months[i]) {
            raw[0] = i + 1;
        }
    }

    return [parseInt(raw[2]), raw[0], parseInt(raw[1]), raw[5], parseInt(timeArr[0]), parseInt(timeArr[1])];
}