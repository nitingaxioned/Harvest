/* Author: NDG */

// Menu click Events

// click Event on menu icon
document.querySelector("nav").addEventListener("click", function(){
    this.classList.toggle("nav-cross");
    document.querySelector(".nav-list").classList.toggle("hide-me-mobile");
    document.querySelector(".header-social-icons").classList.toggle("hide-me-mobile");
});
// click Event to stop Propagation
document.querySelector(".nav-list").addEventListener("click", function(e){ e.stopPropagation(); });




















