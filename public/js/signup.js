document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // Validate password and confirm password
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Create the request body
    const requestBody = {
      email: email,
      password: password,
      name: name,
    };

    // Make the API request
    fetch("/api/customer/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to the login page on successful registration
          window.location.href = "/login";
        } else {
          // Handle error response
          return response.json();
        }
      })
      .then((data) => {
        // Display error message if any
        if (data && data.error) {
          alert(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while registering. Please try again later.");
      });
  });
