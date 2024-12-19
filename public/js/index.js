$(document).ready(function () {
  // Fetch banner data from the API
  $.ajax({
    url: "/api/banner?status=active",
    type: "GET",
    success: function (data) {
      const carouselInner = $("#swiper-banner");
      // const carouselControls = $('#default-carousel');

      data.forEach((item) => {
        carouselInner.append(`
                    <div class="swiper-slide">
                        <img
                        src="${item.image}"
                        class="object-cover w-full h-[70vh]"

                        alt="..."
                        />
                    </div>
                    `);
      });
    },
    error: function (error) {
      console.error("Error fetching banners:", error);
    },
  });

  let allMenuItems = [];
  let filteredByCategoryItems = []; // Array to store items filtered by category
  let selectedCategoryId = null; // Variable to track selected category

  // Fetch and display categories
  $.ajax({
    url: "/api/category",
    type: "GET",
    success: function (data) {
      const carouselInner = $("#swiper-cat");

      data.forEach((category) => {
        carouselInner.append(`
          <div class="carousel-item bg-[#990100] p-4" onclick="filterByCategory('${category._id}')">
            <h3 class="text-lg font-semibold text-gray-800">${category.name}</h3>
          </div>
        `);
      });
    },
    error: function (error) {
      console.error("Error fetching categories:", error);
    },
  });

  // Fetch and display menu items
  $.ajax({
    url: "/api/menuItem",
    type: "GET",
    success: function (data) {
      allMenuItems = data; // Store all menu items in an array
      displayMenuItems(allMenuItems); // Display all menu items initially
    },
    error: function (error) {
      console.error("Error fetching menu items:", error);
    },
  });

  // Function to display menu items
  function displayMenuItems(items) {
    const itemContainer = $("#items-container");
    itemContainer.empty(); // Clear the container before appending

    items.forEach((item) => {
      itemContainer.append(`
        <div class="bg-white rounded-lg shadow p-4">
          <div class="relative">
            <img
              src="${item.image}"
              alt="${item.name}"
              class="w-full h-32 object-cover rounded-full mx-auto"
            />
          </div>
          <div class="text-center mt-4">
            <h3 class="text-lg font-bold">${item.name}</h3>
            <div class="text-[#990100] text-xl font-bold mt-2">RS ${item.price}</div>
            <button
              onclick="openModal('${item._id}')"
              class="bg-[#990100] text-white py-1 px-3 mt-4 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      `);
    });
  }

  // Function to filter by category
  window.filterByCategory = function (categoryId) {
    selectedCategoryId = categoryId; // Update the selected category ID
    filteredByCategoryItems = allMenuItems.filter(item => item.categoryId._id === categoryId);
    applyFilters(); // Call the combined filter function
  };

  // Search function
  $("#menu-search").on("input", function () {
    applyFilters(); // Call the combined filter function when searching
  });

  // Function to apply both category filter and search
  function applyFilters() {
    const searchTerm = $("#menu-search").val().toLowerCase();
    let filteredItems = filteredByCategoryItems;

    // Apply search filter on top of category filter
    if (searchTerm) {
      filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(searchTerm));
    }

    // If no category is selected, apply search on all menu items
    if (!selectedCategoryId) {
      filteredItems = allMenuItems.filter(item => item.name.toLowerCase().includes(searchTerm));
    }

    displayMenuItems(filteredItems); // Display the filtered items
    $("#clear-filters").removeClass("hidden")
  }

  $("#clear-filters").on("click", function () {
    selectedCategoryId = null; // Reset selected category
    filteredByCategoryItems = allMenuItems; // Reset filtered items
    $("#menu-search").val(""); // Clear the search input
    displayMenuItems(allMenuItems); // Display all items
    $("#clear-filters").addClass("hidden")
  });
});
