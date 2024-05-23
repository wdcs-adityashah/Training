// Function to validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
// Function to validate password strength (at least 8 characters)
function validatePassword(password) {
  return password.length >= 8;
}
// Store user credentials
let userCredentials = { email: "", password: "" };
document.addEventListener("DOMContentLoaded", function () {
  let signup = document.querySelector(".signup");
  let loginbox = document.querySelector(".login-box");
  let login = document.querySelector(".login");
  let signupbox = document.querySelector(".signup-box");
  let emails = document.querySelectorAll(".email");
  let passwords = document.querySelectorAll(".password");
  let loginbtns = document.querySelectorAll(".clkbtn");
  let slider = document.querySelector(".slider");
  let name = document.querySelector(".name");
  let confirmpassword = document.querySelector(".confirm_pwd");
  signup.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("signup button was clicked");
    loginbox.style.display = "none";
    signupbox.style.display = "flex";
    slider.classList.add("moveslider");
  });
  login.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("login button was clicked");
    loginbox.style.display = "flex";
    signupbox.style.display = "none";
    slider.classList.remove("moveslider");
  });
  loginbtns.forEach((loginbtn) => {
    loginbtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Determine which form is currently active
      let isSignup = signupbox.style.display === "flex";
      let activeForm = isSignup ? signupbox : loginbox;

      // Retrieve the values of the name, email, password, and confirm password fields from the active form
      let nameValue = isSignup ? activeForm.querySelector(".name").value.trim() : '';
      let emailValue = activeForm.querySelector(".email").value.trim();
      let passwordValue = activeForm.querySelector(".password").value.trim();
      let confirmPasswordValue = isSignup ? activeForm.querySelector(".confirm_pwd").value.trim() : '';

      console.log("Name:", nameValue);
      console.log("Email:", emailValue);
      console.log("Password:", passwordValue);
      console.log("Confirm Password:", confirmPasswordValue);

      // Perform signup validation
      let isValid = true;
      let errors = [];
      if (isSignup) {
        // Check if name is empty
        if (nameValue === "") {
          errors.push("*Name is required");
          isValid = false;
        }
      }
      // Check if email is empty or has invalid format
      if (emailValue === "") {
        errors.push("*Email is required");
        isValid = false;
      } else if (!validateEmail(emailValue)) {
        errors.push("*Invalid email format");
        isValid = false;
      }

      // Check if password is empty or doesn't meet requirements
      if (passwordValue === "") {
        errors.push("*Password is required");
        isValid = false;
      } else if (!validatePassword(passwordValue)) {
        errors.push("*Password must be at least 8 characters long");
        isValid = false;
      }

      if (isSignup) {
        // Check if confirm password matches password
        if (passwordValue !== confirmPasswordValue) {
          errors.push("*Passwords do not match");
          isValid = false;
        }
      }

      // If there are errors, display them; otherwise, proceed with signup or login
      if (!isValid) {
        let errorContainer = activeForm.querySelector(".error-container");
        if (!errorContainer) {
          errorContainer = document.createElement("div");
          errorContainer.className = "error-container";
          activeForm.appendChild(errorContainer);
        }
        errorContainer.innerHTML = "";
        errors.forEach((error) => {
          let errorDiv = document.createElement("div");
          errorDiv.textContent = error;
          errorContainer.appendChild(errorDiv);
        });
      } else {
        // Remove existing error messages
        let existingErrors = document.querySelectorAll(".error-container");
        existingErrors.forEach((errorContainer) => {
          errorContainer.remove();
        });

        if (isSignup) {
          // Store user credentials for validation during login
          userCredentials.email = emailValue;
          userCredentials.password = passwordValue;

          // Signup success
          alert("Signup is successful");
        } else {
          // Perform login validation
          if (emailValue === userCredentials.email && passwordValue === userCredentials.password) {
            // Login success
            alert("Login is successful");
          } else {
            // Display login error
            let errorContainer = activeForm.querySelector(".error-container");
            if (!errorContainer) {
              errorContainer = document.createElement("div");
              errorContainer.className = "error-container";
              activeForm.appendChild(errorContainer);
            }
            errorContainer.innerHTML = "";
            let errorDiv = document.createElement("div");
            errorDiv.textContent = "Invalid email or password";
            errorContainer.appendChild(errorDiv);
          }
        }
      }
    });
  });
});
