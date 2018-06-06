var dateTag = document.querySelector('.sort-date');
var dateSelect = document.querySelector('#flip-date');
var sortState = null;
var uncorruptedCopy = null;

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

window.onload = function() {
    if (sortState == null || uncorruptedCopy == null) {
        uncorruptedCopy = $('.post-body');
    }
}

window.onclick = function(event) {
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
            uncorruptedCopy.appendTo('#post-list');
            sortState = "person";
        }

        // sort user
        $('.post-body').sort(function(a, b) {
            return compareUsers($(a)[0].dataset.user, $(b)[0].dataset.user, type);
        }).appendTo('#post-list');
    }
    else {
        if (sortState == "person" || sortState == null) {
            uncorruptedCopy.appendTo('#post-list');
            sortState = "date";
        }

        if (type == "newest") {
            $('.post-body').sort(function(a, b) {
                if (new Date(a.dataset.date) - new Date(b.dataset.date) > 0) {
                    return -1;
                }
                else if (new Date(a.dataset.date) - new Date(b.dataset.date) < 0) {
                    return 1;
                }
                else {
                    return 0;
                }
            }).appendTo('#post-list');
        }
        else {
            $('.post-body').sort(function(a, b) {
                if (new Date(a.dataset.date) - new Date(b.dataset.date) > 0) {
                    return 1;
                }
                else if (new Date(a.dataset.date) - new Date(b.dataset.date) < 0) {
                    return -1;
                }
                else {
                    return 0;
                }
            }).appendTo('#post-list');
        }
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