$(document).ready(function () {
    // Fetch data from /api/customer endpoint
    fetch("/api/admin/customerFetch")
      .then((response) => response.json())
      .then((data) => {
        const tableBody = $("#categoriesBody");
        
        data.forEach((customer) => {
          tableBody.append(`
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">${customer.name}</td>
              <td class="px-6 py-4 whitespace-nowrap">${customer.email}</td>
            </tr>
          `);
        });

        // Initialize DataTable
        $("#categoriesTable").DataTable();
      })
      .catch((error) => console.error("Error fetching categories:", error));
  });