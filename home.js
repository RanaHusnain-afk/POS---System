document.addEventListener("DOMContentLoaded", () => {
  const addCategoryBtn = document.getElementById("addCategoryBtn");
  const addProductBtn = document.getElementById("addProductBtn");
  const searchProductBtn = document.getElementById("searchProductBtn");
  const printBillBtn = document.getElementById("printBillBtn");

  const categoryDiv = document.getElementById("categoryDiv");
  const productDiv = document.getElementById("productDiv");
  const searchDiv = document.getElementById("searchDiv");
  const billingDiv = document.getElementById("billingDiv");

  const categoryInput = document.getElementById("categoryInput");
  const addCatBtn = document.getElementById("addCatBtn");
  const removeCatBtn = document.getElementById("removeCatBtn");
  const categoryList = document.getElementById("categoryList");
  const noCategoryMessage = document.getElementById("noCategoryMessage");
  const categoryMessage = document.getElementById("categoryMessage");

  const productNameInput = document.getElementById("productNameInput");
  const productCategorySelect = document.getElementById("productCategorySelect");
  const productQuantityInput = document.getElementById("productQuantityInput");
  const productPriceInput = document.getElementById("productPriceInput");
  const addProductFinalBtn = document.getElementById("addProductFinalBtn");
  const productList = document.getElementById("productList");
  const noProductMessage = document.getElementById("noProductMessage");
  const productMessage = document.getElementById("productMessage");

  const searchNameInput = document.getElementById("searchNameInput");
  const searchProductFinalBtn = document.getElementById("searchProductFinalBtn");
  const searchResultMessage = document.getElementById("searchResultMessage");

  const billProductSelect = document.getElementById("billProductSelect");
  const billQuantityInput = document.getElementById("billQuantityInput");
  const addToBillBtn = document.getElementById("addToBillBtn");
  const billList = document.getElementById("billList");
  const billTotalAmount = document.getElementById("billTotalAmount");
  const generateBillBtn = document.getElementById("generateBillBtn");

  let currentBill = [];

  function hideAllSections() {
    categoryDiv.style.display = "none";
    productDiv.style.display = "none";
    searchDiv.style.display = "none";
    billingDiv.style.display = "none";
  }

  function showMessage(element, message, type) {
    element.textContent = message;
    element.style.display = "block";
    element.className = "message " + type;
    setTimeout(() => {
      element.style.display = "none";
    }, 3000);
  }

  function renderCategories() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    categoryList.innerHTML = "";
    if (categories.length === 0) {
      noCategoryMessage.style.display = "block";
    } else {
      noCategoryMessage.style.display = "none";
      categories.forEach((category) => {
        const li = document.createElement("li");
        li.textContent = category;
        categoryList.appendChild(li);
      });
    }
  }

  addCatBtn.addEventListener("click", () => {
    const categoryName = categoryInput.value.trim();
    if (categoryName) {
      const categories = JSON.parse(localStorage.getItem("categories")) || [];
      if (!categories.includes(categoryName)) {
        categories.push(categoryName);
        localStorage.setItem("categories", JSON.stringify(categories));
        renderCategories();
        categoryInput.value = "";
        showMessage(categoryMessage, `Category "${categoryName}" added successfully.`, "success");
        populateProductCategorySelect();
        populateBillProductSelect();
      } else {
        showMessage(categoryMessage, "This category already exists.", "error");
      }
    }
  });

  removeCatBtn.addEventListener("click", () => {
    const categoryName = categoryInput.value.trim();
    if (categoryName) {
      let categories = JSON.parse(localStorage.getItem("categories")) || [];
      const index = categories.indexOf(categoryName);
      if (index > -1) {
        categories.splice(index, 1);
        localStorage.setItem("categories", JSON.stringify(categories));
        renderCategories();
        categoryInput.value = "";
        showMessage(categoryMessage, `Category "${categoryName}" removed.`, "success");
        populateProductCategorySelect();
        populateBillProductSelect();
      } else {
        showMessage(categoryMessage, "Category not found.", "error");
      }
    }
  });

  function populateProductCategorySelect() {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    productCategorySelect.innerHTML = "<option value=''>Select a Category</option>";
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      productCategorySelect.appendChild(option);
    });
  }

  function renderProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    productList.innerHTML = "";
    const homeProductList = document.getElementById("homeProductList");
    homeProductList.innerHTML = "";

    if (products.length === 0) {
      noProductMessage.style.display = "block";
      document.getElementById("noProductsHomeMessage").style.display = "block";
    } else {
      noProductMessage.style.display = "none";
      document.getElementById("noProductsHomeMessage").style.display = "none";
      products.forEach((product, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span><strong>${product.name}</strong> (${product.category})</span>
          <span>Qty: ${product.quantity}</span>
          <span>Price: $${product.price}</span>
          <button class="remove-product-btn" data-index="${index}">Remove</button>
        `;
        productList.appendChild(li);

        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-category">${product.category}</p>
            <p class="product-price">$${product.price}</p>
          </div>
        `;
        homeProductList.appendChild(productCard);
      });

      document.querySelectorAll(".remove-product-btn").forEach(button => {
        button.addEventListener("click", (e) => {
          const indexToRemove = e.target.dataset.index;
          removeProduct(indexToRemove);
        });
      });
    }
  }

  function removeProduct(index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    populateBillProductSelect();
    showMessage(productMessage, "Product removed successfully.", "success");
  }

  addProductFinalBtn.addEventListener("click", () => {
    const name = productNameInput.value.trim();
    const category = productCategorySelect.value;
    const quantity = parseInt(productQuantityInput.value);
    const price = parseFloat(productPriceInput.value);
    const imageFile = document.getElementById("productImageInput").files[0];

    if (name && category && !isNaN(quantity) && quantity > 0 && !isNaN(price) && price > 0 && imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const newProduct = {
          name,
          category,
          quantity,
          price,
          image: e.target.result
        };
        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
        populateBillProductSelect();
        productNameInput.value = "";
        productCategorySelect.value = "";
        productQuantityInput.value = "";
        productPriceInput.value = "";
        document.getElementById("productImageInput").value = "";
        showMessage(productMessage, "Product added successfully.", "success");
      };
      reader.readAsDataURL(imageFile);
    } else {
      showMessage(productMessage, "Please fill out all fields correctly.", "error");
    }
  });

  
  searchProductFinalBtn.addEventListener("click", () => {
    const searchTerm = searchNameInput.value.trim().toLowerCase();
    searchResultMessage.innerHTML = "";
    if (searchTerm) {
      const products = JSON.parse(localStorage.getItem("products")) || [];
      const foundProduct = products.find(p => p.name.toLowerCase() === searchTerm);
      if (foundProduct) {
        searchResultMessage.innerHTML = `
          <h3>Product Found!</h3>
          <p><strong>Name:</strong> ${foundProduct.name}</p>
          <p><strong>Category:</strong> ${foundProduct.category}</p>
          <p><strong>Quantity:</strong> ${foundProduct.quantity}</p>
          <p><strong>Price:</strong> $${foundProduct.price}</p>
        `;
      } else {
        searchResultMessage.innerHTML = `<p class="error">Product not found.</p>`;
      }
    }
  });

  addCategoryBtn.addEventListener("click", () => {
    hideAllSections();
    categoryDiv.style.display = "block";
  });
  addProductBtn.addEventListener("click", () => {
    hideAllSections();
    productDiv.style.display = "block";
    populateProductCategorySelect();
  });
  searchProductBtn.addEventListener("click", () => {
    hideAllSections();
    searchDiv.style.display = "block";
  });

  printBillBtn.addEventListener("click", () => {
    hideAllSections();
    billingDiv.style.display = "block";
    populateBillProductSelect();
    currentBill = [];
    renderBill();
  });

  function populateBillProductSelect() {
    billProductSelect.innerHTML = "";
    const products = JSON.parse(localStorage.getItem("products")) || [];
    if (products.length > 0) {
      products.forEach((product, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = product.name;
        billProductSelect.appendChild(option);
      });
    } else {
      const option = document.createElement("option");
      option.textContent = "No products available";
      billProductSelect.appendChild(option);
    }
  }

  addToBillBtn.addEventListener("click", () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const selectedProductIndex = billProductSelect.value;
    const quantity = parseInt(billQuantityInput.value);

    if (selectedProductIndex === "" || isNaN(quantity) || quantity <= 0) {
      alert("Please select a product and enter a valid quantity.");
      return;
    }

    const product = products[selectedProductIndex];
    if (quantity > product.quantity) {
      alert(`Insufficient stock. Only ${product.quantity} units available.`);
      return;
    }

    const itemPrice = parseFloat(product.price);
    const subtotal = itemPrice * quantity;

    const existingBillItem = currentBill.find(item => item.name === product.name);

    if (existingBillItem) {
      existingBillItem.quantity += quantity;
      existingBillItem.subtotal += subtotal;
    } else {
      const billItem = {
        name: product.name,
        category: product.category,
        quantity: quantity,
        price: itemPrice,
        subtotal: subtotal,
      };
      currentBill.push(billItem);
    }

    product.quantity -= quantity;
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    renderBill();
    billQuantityInput.value = "";
  });

  function renderBill() {
    billList.innerHTML = "";
    let total = 0;
    currentBill.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${item.name} (${item.category})</span>
        <span>${item.quantity} x $${item.price.toFixed(2)}</span>
        <span>Subtotal: $${item.subtotal.toFixed(2)}</span>
      `;
      billList.appendChild(li);
      total += item.subtotal;
    });
    billTotalAmount.textContent = total.toFixed(2);
  }

  generateBillBtn.addEventListener("click", () => {
    if (currentBill.length === 0) {
      alert("Please add items to the bill first.");
      return;
    }

    let billString = "--- Final Bill ---\n\n";
    currentBill.forEach((item) => {
      billString += `Product: ${item.name}\n`;
      billString += `Category: ${item.category}\n`;
      billString += `Quantity: ${item.quantity}\n`;
      billString += `Price per piece: $${item.price.toFixed(2)}\n`;
      billString += `Subtotal: $${item.subtotal.toFixed(2)}\n\n`;
    });

    const totalAmount = parseFloat(billTotalAmount.textContent);
    billString += `--------------------\n`;
    billString += `Total Bill: $${totalAmount.toFixed(2)}\n`;

    alert(billString);

    currentBill = [];
    renderBill();
    billQuantityInput.value = "";
  });

  renderCategories();
  renderProducts();
});