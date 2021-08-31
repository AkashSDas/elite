/// Add product to cart
export function addItemToCart(item: any, next: Function) {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart"))
      cart = JSON.parse(localStorage.getItem("cart"));

    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
}

/// Load cart
export function loadCart() {
  if (typeof window !== "undefined")
    if (localStorage.getItem("cart"))
      return JSON.parse(localStorage.getItem("cart"));
  return [];
}

/// Remove product from cart
export function removeItemFromCart(productId: string) {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart = cart.filter((product) => product._id !== productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }
  }
}

/// Empty cart after successful purchase
export function emptyCart(next: Function) {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");

    /// Add new empty cart where new product will be added
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
}
