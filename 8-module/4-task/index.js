import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

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

    const item = this.cartItems[index];

    if (this.cartItems[index].count === 0) {
      this.cartItems.splice(index, 1)
    }


    this.onProductUpdate(item);
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

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  _modal;
  renderModal() {
    let modal = new Modal();

    modal.setTitle('Your order');
    const div = document.createElement('div');
    for (let i = 0; i < this.cartItems.length; i++) {
      const item = this.renderProduct(this.cartItems[i].product, this.cartItems[i].count);
      div.append(item);
    }

    const form = this.renderOrderForm();
    div.append(form);

    modal.setBody(div);
    modal.open();
    this._modal = modal;

    let buttonAdd = document.querySelectorAll('.cart-counter__button_plus');
    let buttonRemove = document.querySelectorAll('.cart-counter__button_minus');


    buttonAdd.forEach((btn) => {
      btn.addEventListener('click', () => {
        let productId = btn.closest(".cart-product").dataset.productId;
        this.updateProductCount(productId, 1);
      })
    })

    buttonRemove.forEach((btn) => {
      btn.addEventListener('click', () => {
        let productId = btn.closest(".cart-product").dataset.productId;
        this.updateProductCount(productId, -1);
      })
    })

   /* let submitButton =  document.querySelector('button[type="submit"]');
    submitButton.addEventListener('submit', this.onSubmit(event));
    */
   

    document.querySelector('.cart-form').addEventListener('submit', (e)  => this.onSubmit(e))

  }

  onProductUpdate(cartItem) {

    this.cartIcon.update(this);

    if (document.body.classList.contains("is-modal-open")) {

      if (this.cartItems.length === 0) {
        this._modal.close();
        return;
      }

      const row = this._modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"]`);



      const el = this._modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);



      let productPrice = this._modal.elem.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);
      let infoPrice = this._modal.elem.querySelector(`.cart-buttons__info-price`);


      el.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      let totalValue = this.cartItems.reduce((sum, current) => sum + (current.product.price * current.count), 0);
      infoPrice.innerHTML = `€${totalValue.toFixed(2)}`;
      if (cartItem.count === 0) {
        row.remove();
       return
      }


    }

   
  }


 async onSubmit(event) {
    /*document.querySelector('.cart-form').addEventListener('submit', async (event) => { */
      event.preventDefault();
      // document.querySelector('button[type="submit"]').classList.add('is-loading');
      let form = document.querySelector('.cart-form');
      let formData = new FormData(form);

      let response = await  fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        this._modal.setTitle('Success!');
        this.cartItems.splice(0);
        let div = createElement(`<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`);
       this._modal.setBody(div);
       console.log(this.cartItems);
      }
   // });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();

  }
}



