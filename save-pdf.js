// save-pdf.js
function savePDF() {
  const doc = new jsPDF();

  let yOffset = 10;

  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
    doc.text(
      `Product ${productId}: ${item.quantity} x $${item.price} = $${itemTotalPrice}`,
      10,
      yOffset
    );
    yOffset += 10;
  }

  const totalPrice = Object.values(cart).reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  doc.text(`Total Price: $${totalPrice}`, 10, yOffset);

  doc.save("cart.pdf");
}

document.querySelector("#place-order").addEventListener("click", savePDF);
