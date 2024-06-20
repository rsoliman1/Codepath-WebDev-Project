// TODO: Query for button with an id "theme-button"
let themeButton = document.getElementById("theme-button");

// TODO: Complete the toggleDarkMode function
const toggleDarkMode = () => {
  // Write your code to manipulate the DOM here
  document.body.classList.toggle("dark-mode");
}

// TODO: Register a 'click' event listener for the theme button
// Set toggleDarkMode as the callback function.
themeButton.addEventListener("click", toggleDarkMode);

//--------------------------------------------
// Add your query for the sign now button here
let signNowButton = document.getElementById("sign-now-button");

// Callback function to add a signature
const addSignature = (person) => {
  // Create a new signature element
  const signatureElement = document.createElement("p");

  // Add the name and email to the signature element using the person object
  signatureElement.textContent = `🖊️ ${person.name} (${person.email}) supports this cause.`;

  // Append the signature element to the "signatures" container
  const signaturesSection = document.getElementById("signatures");
  signaturesSection.appendChild(signatureElement);

  // Remove the old counter
  const oldCounter = document.getElementById("counter");
  oldCounter.remove();

  // Update the count and create a new counter element
  count = count + 1;
  const newCounter = document.createElement("p");
  newCounter.id = "counter";
  newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

  // Append the new counter to the signatures div
  signaturesSection.appendChild(newCounter);

  toggleModal(person);
  
  //OLD CODE----------------------------------------------------------------------------
  // Prompt the user for name and email (you can replace this with your own input method)
  // const name = document.getElementById("name").value;
  // const email = document.getElementById("email").value;
  
  // // Create a new signature element
  // const signatureElement = document.createElement("p");

  // // Add the name and hometown to the signature element
  // signatureElement.textContent = `${name} from ${email}`;
  
  // // Append the signature element to the "signatures" container
  // //const signaturesSection = document.querySelector(".signatures");
  // const signaturesSection = document.getElementById("signatures");
  // signaturesSection.appendChild(signatureElement);

  // // Remove the old counter
  // const oldCounter = document.getElementById("counter");
  // oldCounter.remove();

  // // Update the count and create a new counter element
  // count = count + 1;
  // const newCounter = document.createElement("p");
  // newCounter.id = "counter";
  // newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

  // // Append the new counter to the signatures div
  // signaturesSection.appendChild(newCounter);
}
signNowButton = document.getElementById("sign-now-button");
//signNowButton.addEventListener("click", addSignature);

// TODO: Remove the click event listener that calls addSignature()

// TODO: Complete validation form

const validateForm = () => {
  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;

  const person = {
    name: petitionInputs[0].value,
    email: petitionInputs[1].value
  };
  
  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
  }
  // Check if there are no errors
  if (!containsErrors) {
    // Call addSignature() to add the signature to the page
    addSignature();

    // Clear the form fields
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }

    if (!person.email.includes('.com')) {
        // If the email address does NOT contain '.com'
      containsErrors = true;
      petitionInputs[1].classList.add('error'); // Add the error class for highlighting in red
    } else {
        // If the email address contains '.com'
        petitionInputs[1].classList.remove('error'); // Remove the error class if it was already there
      }
    }
    return person;
  };

signNowButton = document.getElementById("sign-now-button");

  // TODO: Call addSignature() and clear fields if no errors
signNowButton.addEventListener('click', validateForm);

//-------------------------------------------------------------------------
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

// Select all elements with the class "revealable"
const revealableContainers = document.querySelectorAll('.revealable');

// Create a function called "reveal"
function reveal() {
    // Get the height of the window
    let windowHeight = window.innerHeight;
    // Create a for loop to check each "revealable" container
    for (let i = 0; i < revealableContainers.length; i++) {
        // Inside the loop, you can check the position of each container
        const container = revealableContainers[i];
        // Add your logic here to determine when to reveal the container
        let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

        if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
              // Add the "active" class to the revealableContainer's classList
            revealableContainers[i].classList.add('active');
        } else {
              // Remove the "active" class from the revealableContainer's classList
            revealableContainers[i].classList.remove('active');
        }
    }
}
window.addEventListener('scroll', reveal);

function reduceMotion() {
    // Update animation object with reduced motion settings
    animation.transitionTimingFunction = 'ease';
    animation.revealDistance = 50; // Shorter animation distance

    // Loop through revealableContainers and update animation settings
    for (let i = 0; i < revealableContainers.length; i++) {
        // Update animation settings for each revealableContainer
        revealableContainers[i].style.transitionProperty = 'none';
        revealableContainers[i].style.transitionDuration = '0s';
        revealableContainers[i].style.transitionTimingFunction = 'ease';
        revealableContainers[i].style.transitionDelay = '0s';
    }
}
document.getElementById('reduce-motion-button').addEventListener('click', reduceMotion);

// Define variables outside of functions
let scaleFactor = 1;
let modalImage = document.querySelector("modal-content"); //HELPPPPPPPPP

// Create a function to scale the image
function scaleImage() {
  scaleFactor = scaleFactor === 1 ? 0.8 : 1
  modalImage.style.transform = `scale(${scaleFactor})`;
}

function toggleModal(person) {
  // Select modal and modalContent
  const modal = document.getElementById("thanks-modal");
  const modalContent = document.getElementById("thanks-modal-content");

  // Set the display style property to flex
  modal.style.display = "flex";

  // Create a thank you message
  const thankYouMessage = `Thank you so much ${person.name}!`;

  // Update the content of the modal
  modalContent.textContent = `${thankYouMessage} Your support means a lot to us.`;

  // Create an interval to call scaleImage every half a second
  let intervalId = setInterval(scaleImage, 500);
  
  // Hide the modal after a few seconds
  setTimeout(function() {
    clearInterval(intervalId);
    modal.style.display = "none";
  }, 4000); // Adjust the time in milliseconds (5000ms = 5 seconds)
}

// Select the close button and save it to a variable
const closeButton = document.getElementById('close-modal-button');

// Write a function to close the modal
function closeModal() {
  const modal = document.getElementById('thanks-modal');
  modal.style.display = 'none';
}
// Add the click event listener to the close button
closeButton.addEventListener('click', closeModal);
