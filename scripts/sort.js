var dateTag = document.querySelector('.sort-date');
var personTag = document.querySelector('.sort-person');

var dateSelect = document.querySelector('#flip-date');
var personSelect = document.querySelector('#flip-person');

// flip date carrot
dateTag.onclick = function() {
    dateSelect.classList.toggle('down');
    dateSelect.classList.toggle('flip-move');
}

// flip person carrot
personTag.onclick = function() {
    personSelect.classList.toggle('down');
    personSelect.classList.toggle('flip-move');
}
