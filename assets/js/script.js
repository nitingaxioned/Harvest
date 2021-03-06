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

// getting page title
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
    // Latest Work Modal/Light Box

    // click Event on Latest Work list
    document.querySelectorAll(".portfolio-item").forEach(function(val){
        val.addEventListener("click", function(){
            displayModal(val.querySelector("figure").cloneNode(true));
        });
    });

    // setup slider
    // variable declaration
    var slider = document.querySelector(".slider");
    var nextBtn = document.querySelector(".next-slider-btn");
    var pvrBtn = document.querySelector(".previous-slider-btn");
    // call to slider function
    setSlider(slider, nextBtn, pvrBtn);

    // validation on form submission
    document.querySelector("#submit").addEventListener("click", getInTouchValidate);

    // event listener for full name input
    document.querySelector("#fullname").addEventListener("keyup", fullnameValidate);
    document.querySelector("#fullname").addEventListener("focusout", fullnameValidate);

    // event listener for email input
    document.querySelector("#email").addEventListener("keyup", emailValidate);
    document.querySelector("#email").addEventListener("focusout", emailSyntaxValidate);

    // event listener for company input
    document.querySelector("#company").addEventListener("keyup", companyValidate);
    document.querySelector("#company").addEventListener("focusout", companyValidate);

    // event listener for message input
    document.querySelector("#message").addEventListener("keyup", messageValidate);
    document.querySelector("#message").addEventListener("focusout", messageLenghtValidate);
}

// Function for Join us
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
            // Filter for selected
            else if(jobSelector.value == val.querySelector(".job-cat").getAttribute("data-val"))
                val.classList.remove("hide-me");
            // Filter for rest to hide
            else
                val.classList.add("hide-me");
        });
    });
}

// function for our work
function ourWork(){
    // our work Filter functionality

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

// get in touch request validation
function getInTouchValidate(){
    var flag = 0;
    fullnameValidate() || flag++;
    emailSyntaxValidate() || flag++;
    companyValidate() || flag++;
    messageLenghtValidate() || flag++;
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

// validate full name input
function fullnameValidate(){ 
    // variables declaration 
    var txt = document.querySelector("#fullname").value
    var txt_err = document.querySelector(".fullname-err");
    // blank string validation
    if (txt.trim() != "") {
        txt_err.classList.add("hide-me");
        // charecter validation
        if (/^[A-Za-z ]+$/.test(txt)) {
            txt_err.classList.add("hide-me");
            // sting length vadation 
            if (txt.trim().length <= 15) {
                txt_err.classList.add("hide-me");
                return true;
            } else
                return setError("The Name can be 15 characters max", txt_err);
        } else 
            return setError("The Name must include alphabetical characters only", txt_err);
    } else {
        // blank space validation
        if (txt == "")
            return setError("The Name field is required", txt_err);
        else
            return setError("The Name can't be blank space", txt_err);
    }
}

 // email input validation
function emailValidate(){ 
    // variables declaration 
    var txt = document.querySelector("#email").value
    var txt_err = document.querySelector(".email-err");
    // blank string validation
    if (txt.trim() != "") {
        txt_err.classList.add("hide-me");
        // character validation
        if (/^[A-Za-z0-9@_.]+$/.test(txt)) {
            txt_err.classList.add("hide-me");
            // sting length validation 
            if (txt.trim().length <= 25) {
                txt_err.classList.add("hide-me");
                // stings first character validation
                if(/^[A-Za-z]{1}/.test(txt))
                    return true; 
                else
                    return setError("The email should start with alphabetical character", txt_err);
            } else
                return setError("The email can be 25 characters max", txt_err);
        } else 
            return setError("The email has invalid character", txt_err);
    } else {
        // blank space validation
        if (txt == "")
            return setError("The email field is required", txt_err);
        else
            return setError("The email can't be blank space", txt_err);
    }
}

// email syntax validation
function emailSyntaxValidate(){ 
    if(emailValidate()){
        // variables declaration 
        var txt = document.querySelector("#email").value
        var txt_err = document.querySelector(".email-err");
        // min length validation
        if (/^[a-zA-Z._0-9]+@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,5}$/.test(txt)) {
            txt_err.classList.add("hide-me");
            return true; 
        }
        else 
            return setError("This email is invalid", txt_err);
    }
    return false;
}

// Company name validation
function companyValidate(){ 
    // variables decleration 
    var txt = document.querySelector("#company").value
    var txt_err = document.querySelector(".company-err");
    // blank string validation
    if (txt.trim() != "") {
        txt_err.classList.add("hide-me");
        // charecter validation
        if (/^[A-Za-z0-9 ]+$/.test(txt)) {
            txt_err.classList.add("hide-me");
            // sting length vadation 
            if (txt.trim().length <= 20) {
                txt_err.classList.add("hide-me");
                // stings first charecter validation
                if(/^[\d]{1}/.test(txt))
                    return setError("The Company name can't start with numeric characters", txt_err);
                else
                    return true; 
            }else 
                return setError("The Company name can be 20 characters max", txt_err);
        } else
            return setError("The Company name must include alphanumeric characters only", txt_err);
    } else {
        if (txt == "")
            return setError("The Company name field is required", txt_err);
        else 
            return setError("The Company name can't be blank space", txt_err);
    }
 }

// Message validation
function messageValidate(){ 
    // variables decleration 
    var txt = document.querySelector("#message").value
    var txt_err = document.querySelector(".message-err");
    // blank string validation
    if (txt.trim() != "") {
        txt_err.classList.add("hide-me");
        // sting length vadation 
        if (txt.trim().length <= 100){
            txt_err.classList.add("hide-me");
            return true; 
        }
        else 
            return setError("The message can be 100 characters max", txt_err);
    } else {
        // blank space validation
        if (txt == "")
            return setError("The Name field is required", txt_err);
        else
            return setError("The Name can't be blank space", txt_err);
    }
}

// Message validation
function messageLenghtValidate(){
    if(messageValidate()){
        // variables decleration 
        var txt = document.querySelector("#message").value
        var txt_err = document.querySelector(".message-err");
        // min length validation
        if (txt.trim().length >= 5){
            txt_err.classList.add("hide-me");
            return true; 
        }
        else 
            return setError("The message must be 5 characters minimum", txt_err);
    }
    return false;
}

// Display given node in modal
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

// function to clear form and errors
function clearForm(formNode){
    formNode.reset();
    formNode.querySelectorAll("error").forEach(function(val){val.classList.add("hide-me");});
}

// set error
function setError(errString, errNode){
    errNode.innerHTML = errString;
    errNode.classList.remove("hide-me");
    return false;
}

// slider function to setup slider functionality
function setSlider(slider, nextBtn, pvrBtn){
    var slides = slider.querySelectorAll(".slide");
    // var for slide index
    var i = 1;

    // setting up the dummy slides
    // last dummy node
    slider.appendChild(slides[0].cloneNode(true));
    // first dummy node
    slider.insertBefore(slides[slides.length-1].cloneNode(true), slider.querySelector(".slide"));
    slider.style.transform = "translateX(-"+100*i+"%)";

    // event listener for next btn
    nextBtn.addEventListener("click",function(){
        if(i <= slides.length){
            slider.classList.add("slider-transition");
            if(i <= slides.length-1){
                i++;
                slider.style.transform = "translateX(-"+100*i+"%)";
            } else {
                i++;
                slider.style.transform = "translateX(-"+100*i+"%)";
                setTimeout(function(){ 
                    slider.classList.remove("slider-transition");
                    i = 1;
                    slider.style.transform = "translateX(-"+100*i+"%)";
                }, 500);
            }
        }
    });

    // event listner for previous btn
    pvrBtn.addEventListener("click",function(){
        if(i >= 0){
            slider.classList.add("slider-transition");
            if(i > 1){
                i--;
                slider.style.transform = "translateX(-"+100*i+"%)";
            } else {
                slider.style.transform = "translateX(0)";
                setTimeout(function(){ 
                    slider.classList.remove("slider-transition");
                    i = slides.length;
                    slider.style.transform = "translateX(-"+100*i+"%)";
                }, 500);
            }
        }
    });
}