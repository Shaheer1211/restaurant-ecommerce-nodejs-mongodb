$(document).ready(function () {
    // Fetch data from /api/menuItem endpoint
    fetch("/api/menuItem")
      .then((response) => response.json())
      .then((data) => {
        const tableBody = $("#categoriesBody");
        
        data.forEach((menuItem) => {
          tableBody.append(`
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">${menuItem.name}</td>
              <td class="px-6 py-4 whitespace-nowrap">RS ${menuItem.price}</td>
              <td class="px-6 py-4 whitespace-nowrap">${menuItem.description || ""}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="relative">
                  <button class="text-blueGray-500 px-3 flex items-center justify-between gap-1 border rounded-full" data-dropdown-toggle="dropdown-${menuItem._id}"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-[#774d96]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path></svg><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="text-[#774d96]" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path></svg></button>
                  <div id="dropdown-${menuItem._id}" class="hidden absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow">
                    <ul class="py-1 text-sm text-gray-700">
                      <li>
                        <a href="/admin/menuItems/addUpdateItems/${menuItem._id}" class="block py-2 px-4 hover:bg-gray-100 update-menuItem" data-id="${menuItem._id}">Update</a>
                      </li>
                      <li>
                        <a href="#" class="block py-2 px-4 hover:bg-gray-100 delete-menuItem" data-id="${menuItem._id}">Delete</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          `);
        });

        // Toggle dropdown visibility
        $("[data-dropdown-toggle]").on("click", function (e) {
          const targetDropdown = $(this).attr("data-dropdown-toggle");
          $(`#${targetDropdown}`).toggleClass("hidden");
        });

        // Event listener for delete
        $(".delete-menuItem").on("click", function () {
          const menuItemId = $(this).data("id");
          // Handle menuItem delete logic here
          if (confirm("Are you sure you want to delete this menuItem?")) {
            fetch(`/api/menuItem/${menuItemId}`, { method: "DELETE" })
              .then(response => {
                if (response.ok) {
                  alert("menuItem deleted successfully");
                  window.location.reload(); // Reload page to reflect changes
                } else {
                  alert("Error deleting menuItem");
                }
              })
              .catch(error => console.error("Error deleting menuItem:", error));
          }
        });

        // Initialize DataTable
        $("#categoriesTable").DataTable();
      })
      .catch((error) => console.error("Error fetching categories:", error));
  });