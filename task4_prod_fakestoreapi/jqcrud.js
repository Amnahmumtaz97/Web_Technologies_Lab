console.log("crud.js loaded");

function bindings() {
  console.log("bindings called");
  $("#loading").hide();
  let productsData = [];

  function showToast(message, type = "info") {
    let color =
      type === "success" ? "green" : type === "error" ? "red" : "blue";

    $("#toast").remove();

    $("body").append(`
      <div id="toast" 
        style="position:fixed; bottom:20px; right:20px;
               background:${color}; color:white; 
               padding:10px 20px; border-radius:6px; z-index:9999;">
        ${message}
      </div>  `);

    setTimeout(
      () =>$("#toast").fadeOut(500, function () {
          $(this).remove();}), 2000
    );
  }

  //Fetch Random 6 Products
  function displayProducts() {
    $("#loading").show();
    $.ajax({
      url: "https://fakestoreapi.com/products",
      method: "GET",
      success: function (products) {
        productsData = products.sort(() => 0.5 - Math.random()).slice(0, 6);
        renderProducts();
        $("#loading").hide();
        showToast("Products loaded successfully!", "success");
      },
      error: function () {
        $("#loading").hide();
        showToast("Error fetching products!", "error");
      },
    });
  }

  //Render Product Cards 
  function renderProducts() {
    const list = $("#productsList");
    list.empty();

    $.each(productsData, function (i, p) {     // index, product
      list.append(`
        <div class="col-md-4 mb-3">
          <div class="card h-100 shadow-sm">
            <img src="${
              p.image
            }" class="card-img-top" style="height:180px;object-fit:contain;">
            <div class="card-body">
              <h5 class="card-title">${p.title}</h5>
              <p class="card-text">${p.description.substring(0, 80)}...</p>
              <p><strong>$${p.price}</strong></p>
              <button class="btn btn-sm btn-info text-white editBtn" data-index="${i}">Edit</button>
              <button class="btn btn-sm btn-danger deleteBtn" data-index="${i}">Delete</button>
            </div>
          </div>
        </div>
      `);
    });
  }

  //Add New Product
  function createProduct(productData) {
    $.ajax({
      url: "https://fakestoreapi.com/products",
      method: "POST",
      data: JSON.stringify(productData),
      contentType: "application/json",
      success: function (product) {
        product.id = productsData.length + 1;
        productsData.unshift(product); //add at start
        renderProducts();
        resetForm();
        showToast("Product added successfully!", "success");
      },
      error: function () {
        showToast("Error adding product!", "error");
      },
    });
  }

  // UPDATE Product
  function updateProduct(index, productData) {
    $.ajax({
      url: `https://fakestoreapi.com/products/${index + 1}`,
      method: "PUT",
      data: JSON.stringify(productData),
      contentType: "application/json",
      success: function () {
        productsData[index] = { ...productsData[index], ...productData };
        renderProducts();
        resetForm();
        showToast("Product updated successfully!", "success");
      },
      error: function () {
        showToast("Error updating product!", "error");
      },
    });
  }

  //DELETE
  function deleteProduct(index) {
    $.ajax({
      url: `https://fakestoreapi.com/products/${index + 1}`,
      method: "DELETE",
      success: function () {
        productsData.splice(index, 1); //remove from array (index, count)
        renderProducts();
        showToast("Product deleted successfully!", "success");
      },
      error: function () {
        showToast("Error deleting product!", "error");
      },
    });
  }

  // reset Form
  function resetForm() {
    $("#productForm")[0].reset();
    $("#productId").val("");
    $("#saveBtn").text("Add Product");
  }

  //form submit
  $("#productForm").on("submit", function (e) {
    e.preventDefault();

    let index = $("#productId").val();
    let title = $("#title").val().trim();
    let price = $("#price").val().trim();
    let description = $("#description").val().trim();
    let image = $("#image").val().trim() || "https://via.placeholder.com/150";

    if (!title || !price || !description) {
      // ! for important fields
      showToast("Please fill all fields!", "error");
      return;
    }

    let data = { title, price, description, image, category: "other" };

    if (index === "") createProduct(data);
    else updateProduct(parseInt(index), data);
  });

  //clear
  $("#clearBtn").on("click", resetForm);

  //for updation
  $("#productsList").on("click", ".editBtn", function () {
    let index = $(this).data("index");
    let p = productsData[index];
    $("#productId").val(index);
    $("#title").val(p.title);
    $("#price").val(p.price);
    $("#description").val(p.description);
    $("#image").val(p.image);
    $("#saveBtn").text("Update Product");
  });

  //for deletion
  $("#productsList").on("click", ".deleteBtn", function () {
    let index = $(this).data("index");
    deleteProduct(index);
  });

  displayProducts();
  console.log("bindings completed");
}

$(document).ready(bindings);
