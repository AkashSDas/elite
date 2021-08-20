export function addItemToCart(item, next) {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart"))
      cart = JSON.parse(localStorage.getItem("cart"));
    cart.push({ ...item, count: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
}

export function loadCart() {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
}

export function removeItemFromCart(productId: string) {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart")) as any[];
      cart = cart.filter((product) => product._id !== productId);
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    }
  }
}

export function cartEmpty(next: Function) {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
}
