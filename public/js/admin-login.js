async function verifyLogin() {
  try {
    const response = await fetch("/api/admin/verifyLogin", {
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
    window.location = '/admin/dashboard'
    // Proceed with your application logic
  }
});

document
  .getElementById("admin-login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Capture form input values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Basic validation
    if (!username || !password) {
      alert("Please fill in both the username and password fields.");
      return;
    }

    try {
      // Send POST request to the login API
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      // Check if login is successful
      if (response.ok) {
        // Store the token in cookies
        // document.cookie = `AdminToken=${data.token}; path=/`;

        // Redirect to admin dashboard or success page
        window.location.href = "/admin/dashboard";
      } else {
        // Handle login error (e.g., wrong credentials)
        alert(
          data.message || "Invalid username or password, please try again."
        );
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("An error occurred while logging in. Please try again.");
    }
  });
