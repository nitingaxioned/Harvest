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


// Filter JS as Page

// geting page titel
var pageTitle = document.querySelector("title").innerHTML.replace("Harvest | ","");
// setting JS of loaded page;
if(pageTitle == "Home")
    index();
if(pageTitle == "Our Work")
    ourWork();
if(pageTitle == "Join Us")
    joinUs();


// Function For Index Page

function index(){
    // Latest Work Modal/LightBox

    // click Event on Latest Work list
    document.querySelectorAll(".portfolio-item").forEach(function(val){
        val.addEventListener("click", function(){
            displayModal(val.querySelector("figure").cloneNode(true));
        });
    });

    // validation on form submition
    document.querySelector("#submit").addEventListener("click", getInTouchValidate);

    // event listner for fullname input
    document.querySelector("#fullname").addEventListener("keyup", fullnameValidate);

    // event listner for email input
    document.querySelector("#email").addEventListener("keyup", emailValidate);
    document.querySelector("#email").addEventListener("blur", emailSyntaxValidate);

    // event listner for company input
    document.querySelector("#company").addEventListener("keyup", companyValidate);

    // event listner for message input
    document.querySelector("#message").addEventListener("keyup", messageValidate);
}

function joinUs(){
    // Filter functionality in drop down menu

    // Listing All job categories
    var jobSelector = document.querySelector(".job-categories");
    // Event Listners for each job categories
    jobSelector.addEventListener("change", function(){
        document.querySelectorAll(".job").forEach(function(val){
            // Filter functionality
            //Filter for all
            if(jobSelector.value == "All Job Category")
                val.classList.remove("hide-me");
            // Filter for sellected
            else if(jobSelector.value == val.querySelector(".job-cat").getAttribute("data-val"))
                val.classList.remove("hide-me");
            // Filter for rest to hide
            else
                val.classList.add("hide-me");
        });
    });
}

function ourWork(){
    // Our work Filter functionality

    // defined variables
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
}

function getInTouchValidate(){
    var flag = 0;
    fullnameValidate() || flag++;
    emailSyntaxValidate() || flag++;
    companyValidate() || flag++;
    messageValidate() || flag++;
    if( flag==0 ){
        var tempNode = document.querySelector(".form-sumit-modal").cloneNode(true);
        tempNode.classList.remove("hide-me");
        tempNode.querySelector(".name").innerHTML = document.querySelector("#fullname").value;
        displayModal(tempNode);
        clearForm(document.querySelector(".get-in-touch form"));
        return true;
    } else
        return false;
}

function fullnameValidate(){ return true; }
function emailValidate(){ return true; }
function emailSyntaxValidate(){ return true; }
function companyValidate(){ return true; }
function messageValidate(){ return true; }

function displayModal(tempNode){
    var modal = document.querySelector(".latest-work-modal");
    modal.querySelector(".wrapper").innerHTML = "";
    modal.classList.remove("hide-me");
    modal.querySelector(".wrapper").appendChild(tempNode);
    // click event to to stope propagation
    modal.firstElementChild.addEventListener("click", function(e){ e.stopPropagation(); });
    // click event to close modal
    modal.addEventListener("click", function(){ this.classList.add("hide-me") });
    if(modal.querySelector("a") != null)
        modal.querySelector("a").addEventListener("click",function(){modal.classList.add("hide-me")});
}

function clearForm(formNode){
    formNode.reset();
    formNode.querySelectorAll("error").forEach(function(val){val.classList.add("hide-me");});
}







