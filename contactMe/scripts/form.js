// get info from user
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const messageField = document.querySelector("#message");
const successMessage = document.querySelector("#success");
const errorMessages = document.querySelectorAll(".error");

// when the form is submitted
function checkForm(event) {
  // stop page from reloading
  event.preventDefault(); 
  
  clearAllMessages();
  let hasError = false;

  // check for empty name
  if (nameField.value.trim().length < 1) {
    errorMessages[0].innerText = "Name cannot be blank";
    nameField.classList.add("error-border");
    hasError = true;
  }

  // check valid email
  if (!isValidEmail(emailField.value)) {
    errorMessages[1].innerText = "Invalid email";
    emailField.classList.add("error-border");
    hasError = true;
  }

  // check if message is empty
  if (messageField.value.trim().length < 1) {
    errorMessages[2].innerText = "Please enter a message";
    messageField.classList.add("error-border");
    hasError = true;
  }

  // send email and update table if no errors
  if (!hasError) {
    updateTable();      
    sendEmail();
  }
}

// found EmailJS through chatgpt
function sendEmail() {
  const emailData = {
    name: nameField.value,
    email: emailField.value,
    message: messageField.value,
  };

  emailjs
    .send("service_ymhxh2l", "template_otyz6tg", emailData)
    .then(() => {
      successMessage.innerText = "Message sent successfully!";
      successMessage.style.color = "black";
      nameField.value = "";
      emailField.value = "";
      messageField.value = "";
    })
    .catch((error) => {
      successMessage.innerText = "Failed to send message. Try again later.";
      successMessage.style.color = "red";
      console.error("EmailJS error:", error);
    });
}

// remove all messages
function clearAllMessages() {
  for (let i = 0; i < errorMessages.length; i++) {
    errorMessages[i].innerText = "";
  }
  successMessage.innerText = "";
  nameField.classList.remove("error-border");
  emailField.classList.remove("error-border");
  messageField.classList.remove("error-border");
}

// check if email is in right format
function isValidEmail(email) {
  let pattern = /\S+@\S+\.\S+/;
  return pattern.test(email);
}



function updateTable() {
  const resultContainer = document.getElementById("resultContainer");
  const resultBody = document.querySelector("#resultTable tbody");

  // clear old rows
  resultBody.innerHTML = "";

  // create rows for Name, Email, Message
  const formData = [
    ["Name", nameField.value],
    ["Email", emailField.value],
    ["Message", messageField.value]
  ];

  formData.forEach(([label, value]) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${label}</td><td>${value}</td>`;
    resultBody.appendChild(row);
  });

  // show the table container
  resultContainer.style.display = "block";
}



// runs after submit
document.getElementById("contactForm").addEventListener("submit", function(e) {
  checkForm(e);
});