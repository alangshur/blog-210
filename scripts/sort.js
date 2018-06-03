var dateTag = document.querySelector('.sort-date');
var dateSelect = document.querySelector('#flip-date');
var dateSelected = false; 

// flip date carrot
dateTag.onclick = function() {
    if (!dateSelected) {
        sortPosts("date", "newest");
        dateSelected = true;
    }
    else if (dateSelect.classList.contains('down')) {
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
    // reset and resort with new mode/type
    if (mode == "person" && !dateSelect.classList.contains('down')) {
        dateSelect.classList.toggle('down');
        dateSelect.classList.toggle('flip-move');
        dateSelected = false;
    }
    else if (mode == "person") dateSelected = false;
    else if (mode == "date") {
        var dropdowns = document.getElementsByClassName("dropdown-content");

        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];

            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }   
        }
    }
}