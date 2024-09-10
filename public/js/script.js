// Sample function to check if the user is logged in
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

async function updateNavbar() {
  const isLoggedIn = await verifyLogin();
  const loginContainer = document.getElementById("login-container");

  if (isLoggedIn) {
    // Create dropdown menu for logged-in users
    loginContainer.innerHTML = `
      <div class="relative text-white bg-[#990100] rounded-lg px-4 py-1 text-sm md:px-6 md:py-2">
        <button class="flex items-center focus:outline-none" id="userMenuButton">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 6h14M5 18h14" />
          </svg>
          My Account
        </button>

        <!-- Dropdown menu -->
        <div id="userMenu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
          <a href="/viewOrders" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">View Orders</a>
          <button id="logout-btn" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</button>
        </div>
      </div>
    `;

    // Add event listener for dropdown toggle
    document
      .getElementById("userMenuButton")
      .addEventListener("click", function () {
        const userMenu = document.getElementById("userMenu");
        userMenu.classList.toggle("hidden");
      });

    document
      .getElementById("logout-btn")
      .addEventListener("click", async function () {
        const response = await fetch("/api/customer/logout", {
          method: "POST",
          credentials: "include", // Include cookies for session management
        });

        if (response.ok) {
          // Optionally redirect or refresh the page
          window.location.reload(); // Reload the page to update UI
        } else {
          alert("Logout failed. Please try again.");
        }
      });
  } else {
    // Show login button for non-logged-in users
    loginContainer.innerHTML = `
      <a
        href="login"
        class="flex items-center text-white bg-[#990100] rounded-lg px-4 py-1 text-sm md:px-6 md:py-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 12h4m2 8h-8a4 4 0 01-4-4V8a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4z"
          />
        </svg>
        Login
      </a>
    `;
  }
}

// Run the function to update navbar on page load
document.addEventListener("DOMContentLoaded", updateNavbar);
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("translate-x-full");
});

const swiperBanner = new Swiper(".swiper-banner", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  autoplay: true,

  // Navigation arrows with unique selectors
  navigation: {
    nextEl: ".swiper-button-next-banner",
    prevEl: ".swiper-button-prev-banner",
  },
});

const swiperCat = new Swiper(".swiper-cat", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  autoplay: true,

  // Navigation arrows with unique selectors
  navigation: {
    nextEl: ".swiper-button-next-cat",
    prevEl: ".swiper-button-prev-cat",
  },
});


function openModal(id) {
  const newUrl = `${window.location.pathname}?id=${id}`;
  window.history.replaceState({ path: newUrl }, "", newUrl);
  
  document.getElementById("modal").classList.remove("hidden");

  // Extract the query parameter (menuItemId) from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const menuItemId = urlParams.get("id"); // Assuming 'id' is the query parameter

  if (menuItemId) {
    // Call the API using the extracted menuItemId
    fetch(`/api/menuItem/${menuItemId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Update the modal with the API data
        document.getElementById("item-id").textContent = data._id;
        document.getElementById("item-img").src = data.image;
        document.getElementById("item-name").textContent = data.name;
        document.getElementById("item-desc").textContent = data.description;
        document.getElementById("item-price").textContent = data.price;
        document.getElementById("main-total-price").textContent = data.price;
      })
      .catch((error) => {
        console.error("There was an error with the API call:", error);
      });
  } else {
    console.log("No menuItemId found in the URL");
  }
}

function closeModal() {
  // Hide the modal
  document.getElementById("modal").classList.add("hidden");

  // Remove the query parameter from the URL
  const newUrl = window.location.pathname; // Get the current path without query parameters
  window.history.replaceState({ path: newUrl }, "", newUrl);
}

// Example of quantity update function
function updateMainQuantity(action) {
  const quantityElement = document.querySelector("#main-quantity");
  let currentQuantity = parseInt(quantityElement.innerText);
  let totalMainPrice = document.getElementById("main-total-price");
  const totalPrice = document.getElementById("item-price").innerText;

  if (action === "increment") {
    currentQuantity++;
  } else if (action === "decrement") {
    currentQuantity = Math.max(0, currentQuantity - 1);
  }

  totalMainPrice.innerText = `${
    currentQuantity > 0 ? parseFloat(totalPrice) * currentQuantity : totalPrice
  }`;
  quantityElement.innerText = currentQuantity;
}

document
  .getElementById("dec-btn")
  .addEventListener("click", updateMainQuantity("decrement"));
document
  .getElementById("inc-btn")
  .addEventListener("click", updateMainQuantity("increment"));

document.getElementById("add-to-cart").addEventListener("click", function () {
  const id = document.getElementById("item-id").innerText;
  const quantity = parseInt(document.getElementById("main-quantity").innerText); // Ensure it's a number
  const itemName = document.getElementById("item-name").innerText;
  const itemImg = document.getElementById("item-img").src;
  const itemPrice = document.getElementById("item-price").innerText;

  // Retrieve the cart from localStorage or set to an empty array if it doesn't exist
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  // Check if the item already exists in the cart
  const existingItemIndex = cart.findIndex((item) => item.id === id);

  if (existingItemIndex !== -1) {
    // Update the quantity if the item already exists
    cart[existingItemIndex].quantity = quantity;
  } else {
    // Add the new item if it doesn't exist
    cart.push({ id, quantity, itemName, itemImg, itemPrice });
  }

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("main-quantity").innerText = 1;
  closeModal();
});
