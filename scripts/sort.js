var dateTag = document.querySelector('.sort-date');
var dateSelect = document.querySelector('#flip-date');
var personSelected = document.querySelector('#person-selected');
var sortState = null;
var uncorruptedCopy = null;

// flip date carrot
dateTag.onclick = function() {
    if (dateSelect.classList.contains('fa-arrow-circle-down')) {
        dateSelect.classList.remove('fa-arrow-circle-down');
        dateSelect.classList.add('fa-arrow-circle-up');
        sortPosts("date", "oldest");
    }
    else {
        dateSelect.classList.add('fa-arrow-circle-down');
        dateSelect.classList.remove('fa-arrow-circle-up');
        sortPosts("date", "newest");
    }
}

function triggerDrop() {
    document.getElementById("dropdown-trigger").classList.toggle("show");
}

window.onload = function() {
    if (sortState == null || uncorruptedCopy == null) {
        uncorruptedCopy = $('.post-body');
        sortPosts("date", "newest");
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
        var filtered = $('.post-body').toArray().filter(function(elem, index, array){
            return array[index].dataset.user != type;
        });
        console.log(filtered);

        // sort by date selector
        if (dateSelect.classList.contains('fa-arrow-circle-down')) {
            sortPosts("date", "newest");
        } else {
            sortPosts("date", "oldest");
        }

        // update view
        personSelected.innerHTML = type;

        // add to feed
        $(filtered).appendTo('#post-list');
        
    }
    else {
        if (sortState == "person" || sortState == null) {
            uncorruptedCopy.appendTo('#post-list');
            sortState = "date";
        }
        personSelected.innerHTML = 'None Selected';        

        if (type == "newest") {
            dateSelect.innerHTML = '<span class="sort-descriptor"> Newest First</span>';            
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
            dateSelect.innerHTML = '<span class="sort-descriptor"> Oldest First</span>';            
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