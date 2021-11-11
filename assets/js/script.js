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
        // click event to close modal
        modal.addEventListener("click", function(){ this.classList.add("hide-me") });
    });
});


// Our work Filter functionality

var portfolio_btns = document.querySelectorAll(".portfolio-btn a");
var portfolio_list = document.querySelectorAll(".portfolio-item-img")
// Click Event on Portfolio btns
portfolio_btns.forEach(function(val){
    val.addEventListener("click", function(){
        // removing Active class 
        portfolio_btns.forEach(function(value){value.classList.remove("active");});
        // adding Active class 
        val.classList.add("active");
        var tempStr = val.innerHTML.toLowerCase().replace(" ","-");
        // Filtering Nodes
        portfolio_list.forEach(function(Img_Node){
            if(val.innerHTML=="all")
                Img_Node.classList.remove("hide-me")
            else if( Img_Node.classList.contains(tempStr) )
                Img_Node.classList.remove("hide-me");
            else
                Img_Node.classList.add("hide-me");
        });
    });
});


// Filter functionality in drop down menu
var jobSelector = document.querySelector(".job-categories");
jobSelector.addEventListener("change", function(){
    document.querySelectorAll(".job").forEach(function(val){
        if(jobSelector.value == "All Job Category")
            val.classList.remove("hide-me");
        else if(jobSelector.value == val.querySelector(".job-cat").getAttribute("data-val"))
            val.classList.remove("hide-me");
        else
            val.classList.add("hide-me");
    });
});










