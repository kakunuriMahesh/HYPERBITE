// WhatsApp utility functions

const WHATSAPP_NUMBER = '9985875017';

export const sendWhatsAppMessage = (message) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

export const formatProductMessage = (product) => {
  let message = 'Hi!\n\n';
  message += `I'm interested in ordering:\n\n`;
  message += `*${product.name}*\n`;
  if (product.variation && product.variation !== 'default') {
    message += `Variation: ${product.variation}\n`;
  }
  message += `Price: ${product.price}\n`;
  message += `Quantity: ${product.quantity || 1}\n\n`;
  
  if (product.description) {
    message += `Description: ${product.description}\n\n`;
  }
  
  message += `Please let me know about availability and delivery options.`;
  
  return message;
};

export const formatCartMessage = (cartItems, userDetails) => {
  let message = 'Hi!\n\n';
  message += `I would like to place an order:\n\n`;
  message += `*Order Details:*\n`;
  
  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name}`;
    if (item.variation && item.variation !== 'default') {
      message += ` (${item.variation})`;
    }
    message += ` - Qty: ${item.quantity} - ${item.price}\n`;
  });
  
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + price * item.quantity;
  }, 0);
  
  message += `\n*Total: ${total.toFixed(2)} RS*\n\n`;
  
  if (userDetails) {
    message += `*Customer Details:*\n`;
    message += `Name: ${userDetails.name}\n`;
    message += `Phone: ${userDetails.phone}\n`;
    message += `Email: ${userDetails.email}\n`;
    message += `WhatsApp: ${userDetails.whatsapp}\n`;
    message += `Pincode: ${userDetails.pincode}\n`;
    message += `Country: ${userDetails.country}\n`;
    message += `Landmark: ${userDetails.landmark}\n`;
  }
  
  message += `\nPlease confirm the order and provide delivery timeline.`;
  
  return message;
};

