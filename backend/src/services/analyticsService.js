const sessions = require("./sessionStore");

function handleEvent(body) {
  const { sessionId, event } = body;

  if (!sessions[sessionId]) {
    sessions[sessionId] = {
      sessionId,
      cartTime: 0,
      qtyChanges: 0,
      shippingClicks: 0,
      checkoutTime: 0
    };
  }

  const session = sessions[sessionId];

  switch (event) {
    case "cart_time":
      session.cartTime += 5;
      break;

    case "qty_change":
      session.qtyChanges += 1;
      break;

    case "shipping_click":
      session.shippingClicks += 1;
      break;

    case "checkout_time":
      session.checkoutTime += 5;
      break;
  }

  return session;
}

module.exports = { handleEvent };