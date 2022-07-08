export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;


  }
  //findIndex count 

  addProduct(product) {
    if (product === null || product === undefined) {
      return;
    }


    let cartItem = {
      product,
      count: 1
    };

    const index = this.cartItems.findIndex((c) => c.product.id === cartItem.product.id);

    if (index === -1) {
      this.cartItems.push(cartItem);
    } else {
      this.cartItems[index].count += 1;
    }
    this.onProductUpdate(cartItem);

  }


  updateProductCount(productId, amount) {
    const index = this.cartItems.findIndex((c) => c.product.id === productId);


    this.cartItems[index].count += amount;

    if (this.cartItems[index].count === 0) {
      this.cartItems.splice(index, 1)
    }

    this.onProductUpdate(this.cartItems[index]);
  }

  isEmpty() {
    if (this.cartItems.length === 0) {
      return true
    } else {
      return false;
    }
  }

  getTotalCount() {
    let productCount = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      productCount += this.cartItems[i].count;
    }
    return productCount;
  }

  getTotalPrice() {

    let totalPrice = 0;

    for (let i = 0; i < this.cartItems.length; i++) {
      totalPrice += this.cartItems[i].count * this.cartItems[i].product.price
    }
    return totalPrice;
  }



  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

