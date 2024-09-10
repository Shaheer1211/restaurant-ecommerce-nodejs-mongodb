let menuItemId;

document.addEventListener("DOMContentLoaded", async function () {
  let selectedCategoryId = null;

  const pathArray = window.location.pathname.split("/");
  const menuItemId = pathArray[pathArray.length - 1]; // Extract menuItemId from the path

  // Fetch existing menu item data for update if applicable
  if (menuItemId !== "addUpdateItems") {
    try {
      const response = await fetch(`/api/menuItem/${menuItemId}`);
      const data = await response.json();

      if (response.ok) {
        // Pre-fill the form with the fetched menu item data
        document.getElementById("name").value = data.name;
        document.getElementById("price").value = data.price;
        document.getElementById("description").value = data.description || "";

        // Store the categoryId from the fetched menu item data
        selectedCategoryId = data.categoryId;
      } else {
        console.log("Error fetching menu item data.");
      }
    } catch (error) {
      console.error("Error fetching menu item:", error);
    }
  }

  // Fetch all categories and populate the select box
  try {
    const response = await fetch("/api/category");
    const data = await response.json();

    const categoryBox = document.getElementById("category");

    // Clear the categoryBox before adding new options
    categoryBox.innerHTML = "<option value=''></option>";

    // Loop through the fetched categories and add them as <option> elements
    data.forEach((category) => {
      categoryBox.insertAdjacentHTML(
        "beforeend",
        `<option value='${category._id}' selected='${category._id === selectedCategoryId}'>${category.name}</option>`
      );
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});

// Handle form submission
document
  .getElementById("category-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value.trim());
    const categoryId = document.getElementById("category").value.trim();
    const imageInput = document.getElementById("image");
    const description = document.getElementById("description").value.trim();
    console.log(imageInput);
    // Validation
    if (!name || !price || !categoryId) {
      alert("Please fill in the name, price, and category fields.");
      return;
    }

    if (isNaN(price)) {
      alert("The price field should be a valid number.");
      return;
    }

    // Check if image is provided
    if (!imageInput || imageInput.files.length === 0) {
      alert("Please upload an image.");
      return;
    }

    const image = imageInput.files[0];

    // Check image size (optional - max 2MB in this example)
    const maxImageSize = 2 * 1024 * 1024; // 2MB
    if (image.size > maxImageSize) {
      alert("Image size should not exceed 2MB.");
      return;
    }

    // Create FormData object for file upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("description", description);
    formData.append("image", image); // Add the image file to form data

    try {
      // Determine whether this is an update (PUT) or create (POST)
      const menuItemId = window.location.pathname.split("/").pop(); // Extract menuItemId from the URL
      const method = menuItemId !== "addUpdateItems" ? "PUT" : "POST";
      const endpoint =
        menuItemId !== "addUpdateItems"
          ? `/api/menuItem/${menuItemId}`
          : "/api/menuItem";

      const response = await fetch(endpoint, {
        method,
        body: formData, // Use FormData for sending both files and text
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to menu items list after successful submission
        window.location.href = "/admin/menuItems";
      } else {
        alert(data.message || "Error processing the request.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while processing the request.");
    }
  });
