const cart = {};

document.querySelectorAll("#add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-product-id");
    const price = parseFloat(button.getAttribute("data-price"));
    if (!cart[productId]) {
      cart[productId] = { quantity: 1, price: price };
    } else {
      cart[productId].quantity++;
    }
    updateCartDisplay();
  });
});

function updateCartDisplay() {
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = "";

  let totalPrice = 0;
  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice;
    const productElement = document.createElement("div");

    const productInfoElement = document.createElement("span");
    productInfoElement.textContent = `Product ${productId}: ${item.quantity} x $${item.price} = $${itemTotalPrice}`;
    productElement.appendChild(productInfoElement);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("btn", "btn-warning");
    removeButton.addEventListener("click", () => {
      removeProduct(productId);
      updateCartDisplay();
    });
    productElement.appendChild(removeButton);

    cartElement.appendChild(productElement);
  }

  if (Object.keys(cart).length === 0) {
    cartElement.innerHTML = "<p>No items in cart.</p>";
  } else {
    const totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = `Total Price: $${totalPrice}`;
    const placeOrderButton = document.createElement("button");
    placeOrderButton.textContent = "Place Order";
    placeOrderButton.classList.add("btn", "btn-success");
    cartElement.appendChild(totalPriceElement);

    const removeAllButton = document.createElement("button");
    removeAllButton.textContent = "Remove All";
    removeAllButton.classList.add("btn", "btn-danger");
    removeAllButton.addEventListener("click", () => {
      removeAllProducts();
      updateCartDisplay();
    });
    cartElement.appendChild(removeAllButton);
  }
}

function removeAllProducts() {
  for (const productId in cart) {
    delete cart[productId];
  }
}

function removeProduct(productId) {
  if (cart[productId].quantity > 1) {
    cart[productId].quantity--;
  } else {
    delete cart[productId];
  }
}

