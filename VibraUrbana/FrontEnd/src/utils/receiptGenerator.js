export const generateReceipt = (cartItems, totalAmount, userName) => {
  let receiptContent = '----- Purchase Receipt -----\n\n';
  
  if (userName) {
    receiptContent += `Customer: ${userName}\n\n`;
  }

  cartItems.forEach(item => {
    receiptContent += `Product: ${item.name}\n`;
    receiptContent += `Price: $${item.price}\n`;
    receiptContent += `Quantity: ${item.quantity}\n`;
    receiptContent += `Subtotal: $${item.price * item.quantity}\n\n`;
  });

  receiptContent += `Total Amount: $${totalAmount}\n`;
  receiptContent += '\nThank you for your purchase!';
  
  const blob = new Blob([receiptContent], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'receipt.txt';
  link.click();
};
  