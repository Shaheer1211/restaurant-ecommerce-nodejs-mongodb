$(document).ready(function () {
    // Fetch data from /api/customer endpoint
    fetch("/api/customer/order")
      .then((response) => response.json())
      .then((data) => {
        const tableBody = $("#categoriesBody");
  
        data.forEach((order) => {
          const dateTime = extractDateTime(order.createdAt);
          tableBody.append(`
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">${order._id}</td>
                <td class="px-6 py-4 whitespace-nowrap">${dateTime.date}</td>
                <td class="px-6 py-4 whitespace-nowrap">${dateTime.time}</td>
                <td class="px-6 py-4 whitespace-nowrap">${order.items.length}</td>
                <td class="px-6 py-4 whitespace-nowrap">${order.totalAmount}</td>
                <td class="px-6 py-4 whitespace-nowrap">${order.status}</td>
                
              </tr>
            `);
        });
  
        // Toggle dropdown visibility
        $("[data-dropdown-toggle]").on("click", function (e) {
          const targetDropdown = $(this).attr("data-dropdown-toggle");
          $(`#${targetDropdown}`).toggleClass("hidden");
        });
  
        // Initialize DataTable
        $("#categoriesTable").DataTable();
      })
      .catch((error) => console.error("Error fetching categories:", error));
  });
  
  function extractDateTime(isoString) {
    const date = new Date(isoString);
  
    // Extract date in YYYY-MM-DD format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
  
    // Extract time in HH:MM:SS format
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;
  
    return { date: formattedDate, time: formattedTime };
  }