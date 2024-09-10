let categoryId;

document.addEventListener("DOMContentLoaded", async function () {
    const pathArray = window.location.pathname.split("/");
    categoryId = pathArray[pathArray.length - 1];  // Extract categoryId from the path
    
    if (categoryId !== "addUpdateCategories") {
      // Fetch existing category data for update
      try {
        const response = await fetch(`/api/category/${categoryId}`);
        const data = await response.json();
  
        if (response.ok) {
          // Pre-fill the form with the fetched data
          document.getElementById("category_name").value = data.name;
          document.getElementById("description").value = data.description || "";
        } else {
          console.log("Error fetching category data.");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    }
  });
  
  // Handle form submission
  document.getElementById("category-form").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const name = document.getElementById("category_name").value.trim();
    const description = document.getElementById("description").value.trim();
  
    // validation
    if (!name) {
      alert("Please fill in the name field.");
      return;
    }
  
    try {
      // Determine whether this is an update (PUT) or create (POST)
      const method = categoryId !== "addUpdateCategories" ? "PUT" : "POST";
      const endpoint = categoryId !== "addUpdateCategories" ? `/api/category/${categoryId}` : "/api/category";
  
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Redirect to categories list after successful submission
        window.location.href = "/admin/categories";
      } else {
        alert(data.message || "Error processing the request.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while processing the request.");
    }
  });
  