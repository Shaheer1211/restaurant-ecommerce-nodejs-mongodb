document
.getElementById("logout-btn")
.addEventListener("click", async function () {
  const response = await fetch("/api/admin/logout", {
    method: "POST",
    credentials: "include", // Include cookies for session management
  });

  if (response.ok) {
    // Optionally redirect or refresh the page
    window.location = '/admin' // Reload the page to update UI
  } else {
    alert("Logout failed. Please try again.");
  }
});