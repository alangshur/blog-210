window.onscroll = function() {
  stickNavbar()
};
window.onresize = function() {
  var sticky = navbar.offsetTop - 50
};

var navbar = document.getElementById("blog-header");
var postList = document.getElementById("post-list");

var sticky = navbar.offsetTop - 50;

function stickNavbar() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    postList.classList.add("offset");
  } else {
    navbar.classList.remove("sticky");
    postList.classList.remove("offset");    
  }
}