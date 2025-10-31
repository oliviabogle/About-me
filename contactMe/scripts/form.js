/* // Get data 
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const success = document.querySelector("#success");
const errorNodes = document.querySelectorAll(".error");

// Validate
function validateForm(event){
    event.preventDefault();
    clearMessages();
    let errorFlag = false;

    if(nameInput.value.length < 1){
        errorNodes[0].innerText = "Name cannot be blank";
        nameInput.classList.add("error-border");
        errorFlag = true;
    }
 
    if(!emailIsValid(emailInput.value)){
        errorNodes[1].innerText = "Invalid email";
        emailInput.classList.add("error-border");
        errorFlag = true;
    }

    if(messageInput.value.length < 1){
        errorNodes[2].innerText = "Please enter a message";
        messageInput.classList.add("error-border");
        errorFlag = true;
    }

    if(!errorFlag){
        sendEmail();
        //success.innerText = "Success!";
    }
} 

// Send email using EmailJS
function sendEmail() {
  const params = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };

  emailjs
    .send("service_ymhxh2l", "template_otyz6tg", params)
    .then(() => {
      success.innerText = "Message sent successfully!";
    })
    .catch((error) => {
      success.innerText = "Failed to send message. Try again later.";
      console.error("EmailJS error:", error);
    });
}

// Clear error messages
function clearMessages(){
    for(let i=0; i < errorNodes.length; i++){
        errorNodes[i].innerText = "";
    }
    success.innerText = "";
    nameInput.classList.remove("error-border");
    emailInput.classList.remove("error-border");
    messageInput.classList.remove("error-border");
}

// Is email valid?
function emailIsValid(email){
    let pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
} 

document.querySelector("form").addEventListener("submit", validateForm);
*/

// Get data
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const success = document.querySelector("#success");
const errorNodes = document.querySelectorAll(".error");

// Validate
function validateForm(event){
    event.preventDefault();
    clearMessages();
    let errorFlag = false;

    if(nameInput.value.trim().length < 1){
        errorNodes[0].innerText = "Name cannot be blank";
        nameInput.classList.add("error-border");
        errorFlag = true;
    }
 
    if(!emailIsValid(emailInput.value)){
        errorNodes[1].innerText = "Invalid email";
        emailInput.classList.add("error-border");
        errorFlag = true;
    }

    if(messageInput.value.trim().length < 1){
        errorNodes[2].innerText = "Please enter a message";
        messageInput.classList.add("error-border");
        errorFlag = true;
    }

    if(!errorFlag){
        sendEmail();
    }
} 

// Send email using EmailJS
function sendEmail() {
  const params = {
    name: nameInput.value,
    email: emailInput.value,
    message: messageInput.value,
  };

  emailjs
    .send("service_ymhxh2l", "template_otyz6tg", params)
    .then(() => {
      success.innerText = "Message sent successfully!";
      success.style.color = "#0f0";
      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
    })
    .catch((error) => {
      success.innerText = "Failed to send message. Try again later.";
      success.style.color = "red";
      console.error("EmailJS error:", error);
    });
}

// Clear error messages
function clearMessages(){
    for(let i=0; i < errorNodes.length; i++){
        errorNodes[i].innerText = "";
    }
    success.innerText = "";
    nameInput.classList.remove("error-border");
    emailInput.classList.remove("error-border");
    messageInput.classList.remove("error-border");
}

// Is email valid?
function emailIsValid(email){
    let pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
} 

// Attach submit event
document.getElementById("contactForm").addEventListener("submit", validateForm);
