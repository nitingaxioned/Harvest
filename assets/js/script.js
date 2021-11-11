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


// Latest Work Modal/LightBox

var modal = document.querySelector(".latest-work-modal");
// click Event on Latest Work list
document.querySelectorAll(".portfolio-item").forEach(function(val){
    val.addEventListener("click", function(){
        modal.querySelector(".wrapper").innerHTML = "";
        var tempNode = val.querySelector("figure").cloneNode();
        tempNode.innerHTML = val.querySelector("figure").innerHTML;
        modal.querySelector(".wrapper").appendChild(tempNode);
        modal.classList.remove("hide-me");
        // click event to to stope propagation
        tempNode.addEventListener("click", function(e){ e.stopPropagation(); });
    });
});
// click event to close modal
modal.addEventListener("click", function(){ this.classList.add("hide-me") });

















