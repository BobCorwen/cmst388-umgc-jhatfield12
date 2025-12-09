/*
		Your Name: Joshua Hatfield
		Last Modified Date: <12/09/2025>
		File: event_registration.js
		File Description: <Ticket purchase countdown timer, input validation and confirmation of purchase>
*/

// Set the minimum and maximum number of tickets able to be purchased
var minTickets = 1;
var maxTickets = 3;
// Set variables for the ticket cost
var costPerTicket = 5.00;
var ticketSurcharge = 0.50;

/*** YOUR CODE STARTS BELOW HERE ***/

// Global variable to store the timer interval
var timerInterval;

// Countdown timer - 10 minutes
var endTime = new Date().getTime() + (10 * 60 * 1000);

// Update the countdown every 1 second
timerInterval = setInterval(function() {
    // Get current time
    var now = new Date().getTime();
    
    // Calculate time remaining
    var timeRemaining = endTime - now;
    
    // Calculate minutes and seconds
    var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Add a 0 to seconds if less than 10 for formatting purposes
    var formattedSeconds = seconds;
    if (seconds < 10) {
        formattedSeconds = "0" + seconds;
    }
    
    // Update the timer
    var timerSpan = document.querySelector("section:nth-of-type(2) p span");
    if (timerSpan) {
        timerSpan.textContent = minutes + ":" + formattedSeconds;
    }
    
    // If timer has expired
    if (timeRemaining < 0) {
        clearInterval(timerInterval);
        alert("Sorry, your time to complete the form has expired! Please try again if you still wish to purchase tickets.");
        location.href = location.href; // Redirect to same page
    }
}, 1000);

// Change input background color based on error status
function setFieldError(fieldId, hasError) {
    var field = document.getElementById(fieldId);
    if (field) {
        if (hasError) {
            field.style.backgroundColor = "#ffffcc"; // Yellow background color for error
        } else {
            field.style.backgroundColor = "#ffffff"; // Default white background color
        }
    }
}

// Function to calculate total cost
function calculateTotal() {
    // Use the "for" attribute in <label> to find input elements
    var ticketLabel = document.querySelector("label[for='lastnum']");
    var ticketInput = ticketLabel ? document.getElementById("lastnum") : null;
    var totalCostLabel = document.querySelector("label[for='totalCost']");
    var totalCostField = totalCostLabel ? document.getElementById("totalCost") : null;
    // Error span is after the input (which was inserted after the label)
    var errorSpan = ticketInput ? ticketInput.nextElementSibling : null;
    if (!errorSpan || !errorSpan.classList.contains("error")) {
        errorSpan = document.querySelector("label[for='lastnum'] ~ span.error");
    }
    // Creating variable for name and email later
    var contactInfoDiv = document.getElementById("contactInformation");
    
    // Get the number of tickets
    var numTickets = ticketInput ? parseFloat(ticketInput.value) : NaN;
    
    // Validate to check if ticket count is a number between 1 and 3
    var isValid = false;
    var errorMessage = "";
    
    if (isNaN(numTickets) || numTickets < minTickets || numTickets > maxTickets) {
        isValid = false;
        errorMessage = "You can only buy between 1 and 3 tickets.";
        setFieldError("lastnum", true);
    } else {
        isValid = true;
        errorMessage = "";
        setFieldError("lastnum", false);
    }
    
    // Display error message
    if (errorSpan) {
        errorSpan.textContent = errorMessage;
    }
    
    // Calculate and display total if valid
    if (isValid) {
        var total = (costPerTicket + ticketSurcharge) * numTickets;
        if (totalCostField) {
            // Check if it's an input field or a display element
            if (totalCostField.tagName === "INPUT") {
                totalCostField.value = "$" + total.toFixed(2);
            } else {
                totalCostField.textContent = "$" + total.toFixed(2);
            }
        }
        
        // Show contact information section
        if (contactInfoDiv) {
            contactInfoDiv.style.display = "block";
        }
    } else {
        // Hide contact information section if ticket count is invalid
        if (contactInfoDiv) {
            contactInfoDiv.style.display = "none";
        }
        if (totalCostField) {
            if (totalCostField.tagName === "INPUT") {
                totalCostField.value = "$0.00";
            } else {
                totalCostField.textContent = "$0.00";
            }
        }
    }
}

// Function to complete purchase
function completePurchase() {
    // Using the 'for' attribute in labels to find input elements
    var nameLabel = document.querySelector("label[for='name']");
    var nameField = nameLabel ? document.getElementById("name") : null;
    var emailLabel = document.querySelector("label[for='address']");
    var emailField = emailLabel ? document.getElementById("address") : null;
    var ticketLabel = document.querySelector("label[for='lastnum']");
    var ticketInput = ticketLabel ? document.getElementById("lastnum") : null;
    // Placing error spans for name and email after their inputs for styling
    var nameErrorSpan = nameField ? nameField.nextElementSibling : null;
    if (!nameErrorSpan || !nameErrorSpan.classList.contains("error")) {
        nameErrorSpan = document.querySelector("label[for='name'] ~ span.error");
    }
    
    var emailErrorSpan = emailField ? emailField.nextElementSibling : null;
    if (!emailErrorSpan || !emailErrorSpan.classList.contains("error")) {
        emailErrorSpan = document.querySelector("label[for='address'] ~ span.error");
    }
    
    var hasErrors = false;
    
    // Patterns for name and email validation
    var namePattern = /^[a-zA-Z\s'-]+$/;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validate name
    var nameValue = nameField ? nameField.value.trim() : "";
    if (nameValue === "") {
        hasErrors = true;
        if (nameErrorSpan) {
            nameErrorSpan.textContent = "Name is required.";
        }
        setFieldError("name", true);
    } else if (!namePattern.test(nameValue)) {
        hasErrors = true;
        if (nameErrorSpan) {
            nameErrorSpan.textContent = "Please enter a valid name.";
        }
        setFieldError("name", true);
    } else {
        if (nameErrorSpan) {
            nameErrorSpan.textContent = "";
        }
        setFieldError("name", false);
    }
    
    // Validate email
    var emailValue = emailField ? emailField.value.trim() : "";
    if (emailValue === "") {
        hasErrors = true;
        if (emailErrorSpan) {
            emailErrorSpan.textContent = "E-Mail Address is required.";
        }
        setFieldError("address", true);
    } else if (!emailPattern.test(emailValue)) {
        hasErrors = true;
        if (emailErrorSpan) {
            emailErrorSpan.textContent = "Please enter a valid email address.";
        }
        setFieldError("address", true);
    } else {
        if (emailErrorSpan) {
            emailErrorSpan.textContent = "";
        }
        setFieldError("address", false);
    }
    
    // Show success confirmation and stop timer if no errors
    if (!hasErrors) {
        var numTickets = ticketInput ? parseFloat(ticketInput.value) : 0;
        if (!isNaN(numTickets) && numTickets >= minTickets && numTickets <= maxTickets) {
            var total = (costPerTicket + ticketSurcharge) * numTickets;
            
            // Stop the timer
            clearInterval(timerInterval);
            
            // Success confirmation
            alert("Thank you for your purchase.\nYour total cost is $" + total.toFixed(2) + "\nPlease allow 24 hours for electronic delivery");
        }
    }
}

// Function to setup the form styling
function createFormElements() {

    // Ticket amount input
    var ticketLabel = document.querySelector("label[for='lastnum']");
    if (ticketLabel && !document.getElementById("lastnum")) {
        var br = document.createElement("br");
        var errorSpan = ticketLabel.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error")) {
            ticketLabel.parentNode.insertBefore(br, errorSpan);
        } else {
            ticketLabel.parentNode.insertBefore(br, ticketLabel.nextSibling);
        }
        
        var ticketInput = document.createElement("input");
        ticketInput.type = "text";
        ticketInput.id = "lastnum";
        ticketInput.className = "small";
        ticketInput.style.display = "inline-block";
        ticketInput.style.marginBottom = "20px";
        if (errorSpan && errorSpan.classList.contains("error")) {
            ticketLabel.parentNode.insertBefore(ticketInput, errorSpan);
        } else {
            ticketLabel.parentNode.insertBefore(ticketInput, ticketLabel.nextSibling);
        }
    }
    
    // Total cost input
    var totalCostLabel = document.querySelector("label[for='totalCost']");
    if (totalCostLabel && !document.getElementById("totalCost")) {
        var br = document.createElement("br");
        totalCostLabel.parentNode.insertBefore(br, totalCostLabel.nextSibling);
        
        var totalCostInput = document.createElement("input");
        totalCostInput.type = "text";
        totalCostInput.id = "totalCost";
        totalCostInput.className = "small";
        totalCostInput.readOnly = true;
        totalCostInput.style.display = "inline-block";
        totalCostInput.style.marginBottom = "20px";
        br.parentNode.insertBefore(totalCostInput, br.nextSibling);
    }
    
    var contactInfoDiv = document.querySelector("fieldset > div");
    if (contactInfoDiv && !contactInfoDiv.id) {
        contactInfoDiv.id = "contactInformation";
    }
    
    // Name input
    var nameLabel = document.querySelector("label[for='name']");
    if (nameLabel && !document.getElementById("name")) {
        var br = document.createElement("br");
        var nameErrorSpan = nameLabel.nextElementSibling;
        if (nameErrorSpan && nameErrorSpan.classList.contains("error")) {
            nameLabel.parentNode.insertBefore(br, nameErrorSpan);
        } else {
            nameLabel.parentNode.insertBefore(br, nameLabel.nextSibling);
        }
        
        var nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.id = "name";
        nameInput.style.display = "inline-block";
        nameInput.style.marginBottom = "20px";
        if (nameErrorSpan && nameErrorSpan.classList.contains("error")) {
            nameLabel.parentNode.insertBefore(nameInput, nameErrorSpan);
        } else {
            nameLabel.parentNode.insertBefore(nameInput, nameLabel.nextSibling);
        }
    }
    
    // Email input
    var emailLabel = document.querySelector("label[for='address']");
    if (emailLabel && !document.getElementById("address")) {
        var br = document.createElement("br");
        var emailErrorSpan = emailLabel.nextElementSibling;
        if (emailErrorSpan && emailErrorSpan.classList.contains("error")) {
            emailLabel.parentNode.insertBefore(br, emailErrorSpan);
        } else {
            emailLabel.parentNode.insertBefore(br, emailLabel.nextSibling);
        }
        
        var emailInput = document.createElement("input");
        emailInput.type = "text";
        emailInput.id = "address";
        emailInput.style.display = "inline-block";
        emailInput.style.marginBottom = "20px"; 
        if (emailErrorSpan && emailErrorSpan.classList.contains("error")) {
            emailLabel.parentNode.insertBefore(emailInput, emailErrorSpan);
        } else {
            emailLabel.parentNode.insertBefore(emailInput, emailLabel.nextSibling);
        }
    }
    
    var actionButtonsDiv = document.querySelector("div.actionButtons");
    if (actionButtonsDiv) {
        // Purchase tickets button
        if (!document.getElementById("submit")) {
            var submitButton = document.createElement("input");
            submitButton.type = "button";
            submitButton.id = "submit";
            submitButton.value = "Purchase Tickets";
            actionButtonsDiv.appendChild(submitButton);
        }
        
        // Reset button
        if (!document.getElementById("reset")) {
            var resetButton = document.createElement("input");
            resetButton.type = "button";
            resetButton.id = "reset";
            resetButton.value = "Reset";
            actionButtonsDiv.appendChild(resetButton);
        }
    }
}

// Setting up event listeners
document.addEventListener("DOMContentLoaded", function() {

	// Make the text with the countdown timer red
    var actFastParagraph = document.querySelector("section:nth-of-type(2) p");
    if (actFastParagraph) {
        actFastParagraph.style.color = "#ff0000";
        actFastParagraph.style.fontWeight = "bold";
    }
    
    // Make the <fieldset> <legend> element dark red
    var legend = document.querySelector("fieldset legend");
    if (legend) {
        legend.style.color = "#8B0000";
    }
    
    // Make (*) asterisks red
    var requiredSpans = document.querySelectorAll("span.required");
    requiredSpans.forEach(function(span) {
        span.style.color = "#ff0000";
    });
    
    // Error span styling
    var errorSpans = document.querySelectorAll("span.error");
    errorSpans.forEach(function(span) {
        span.style.display = "inline";
        span.style.color = "#ff0000";
        span.style.fontWeight = "bold";
        span.style.marginLeft = "10px";
    });
    
    // Create all form elements dynamically
    createFormElements();
    
    // Add a line break after each error span for styling
    var errorSpansAfter = document.querySelectorAll("span.error");
    errorSpansAfter.forEach(function(span) {
        if (!span.nextSibling || (span.nextSibling.nodeName !== "BR" && span.nextSibling.nodeName !== "LABEL")) {
            var br = document.createElement("br");
            span.parentNode.insertBefore(br, span.nextSibling);
        }
    });
    
    var ticketLabel = document.querySelector("label[for='lastnum']");
    var ticketInput = ticketLabel ? document.getElementById("lastnum") : null;
    var totalCostLabel = document.querySelector("label[for='totalCost']");
    var totalCostField = totalCostLabel ? document.getElementById("totalCost") : null;
    var purchaseButton = document.getElementById("submit");
    var contactInfoDiv = document.getElementById("contactInformation");
    
    // Hide contact information section initially
    if (contactInfoDiv) {
        contactInfoDiv.style.display = "none";
    }
    
    // Set total cost to $0.00
    if (totalCostField) {
        if (totalCostField.tagName === "INPUT") {
            totalCostField.value = "$0.00";
        } else {
            totalCostField.textContent = "$0.00";
        }
    }
    
    // Add event listener for ticket input
    if (ticketInput) {
        ticketInput.addEventListener("input", calculateTotal);
        ticketInput.addEventListener("blur", calculateTotal);
    }
    
    // Add event listener for the purchase tickets button
    if (purchaseButton) {
        purchaseButton.addEventListener("click", function(e) {
            e.preventDefault();
            completePurchase();
        });
    }
    
    // Add event listener for the reset button
    var resetButton = document.getElementById("reset");
    if (resetButton) {
        resetButton.addEventListener("click", function(e) {
            e.preventDefault();
            if (ticketInput) ticketInput.value = "";
            if (totalCostField) {
                if (totalCostField.tagName === "INPUT") {
                    totalCostField.value = "$0.00";
                } else {
                    totalCostField.textContent = "$0.00";
                }
            }
            var nameField = document.getElementById("name");
            if (nameField) nameField.value = "";
            var emailField = document.getElementById("address");
            if (emailField) emailField.value = "";
            
            // Clear error messages
            var errorSpans = document.querySelectorAll("span.error");
            errorSpans.forEach(function(span) {
                span.textContent = "";
            });
            
            // Reset input field colors
            setFieldError("lastnum", false);
            setFieldError("name", false);
            setFieldError("address", false);
            
            // Hide contact information section
            if (contactInfoDiv) {
                contactInfoDiv.style.display = "none";
            }
        });
    }
});
