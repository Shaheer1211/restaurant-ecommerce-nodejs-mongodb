async function verifyLogin() {
  try {
    const response = await fetch("/api/customer/verifyLogin", {
      method: "GET", // Assuming a GET request is used for verification
      credentials: "include", // Include cookies for session management if needed
    });

    // Check if the response status is 200
    if (response.status === 200) {
      return true; // Login is verified
    } else {
      return false; // Login is not verified
    }
  } catch (error) {
    console.error("Error verifying login:", error);
    return false; // Return false in case of an error
  }
}

verifyLogin().then((isLoggedIn) => {
  if (isLoggedIn) {
    window.location = '/'
    // Proceed with your application logic
  }
});

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = emailInput.value;
    const password = passwordInput.value;

    // Create the request body
    const requestBody = {
      email: email,
      password: password,
    };

    // Make the API request
    fetch("/api/customer/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to a dashboard or home page on successful login
          window.location.href = "/"; // Change this to your desired redirect URL
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
        alert("An error occurred while logging in. Please try again later.");
      });
  });
