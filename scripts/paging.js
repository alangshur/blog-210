let totalPages = document.querySelector('#total-pages').innerHTML;
let currPage = document.querySelector('#curr-page').innerHTML;
let pageBack = document.querySelector('#page-back');
let pageForward = document.querySelector('#page-forward');

// go back one page
pageBack.onclick = function() {
    if(currPage - 1 >= 1) {
        let nextPage = currPage - 1;
        window.location.href = `../page/${nextPage}`;
    }
};

// go forward one page
pageForward.onclick = function() {
    if(currPage + 1 <= totalPages) {
        currPage ++;
        let nextPage = currPage;
        window.location.href = `../page/${nextPage}`;
    }
};