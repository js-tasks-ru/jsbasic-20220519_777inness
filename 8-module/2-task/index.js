import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = createElement(`<div class="products-grid">
    <div class="products-grid__inner">
    </div>
  </div>`);

    this.updateFilter()

    //this.updateFilter(filters);

  }
  updateFilter(filters = {}) {
    this.filters = { ...this.filters, ...filters };
    let newProducts = this.products;

    filters = this.filters;
    if (filters.noNuts === true) {
      newProducts = this.products.filter(product =>
        (!product.nuts));
    }
    if (filters.vegeterianOnly === true) {
      newProducts = newProducts.filter(product =>
        (product.vegeterian === true));
    }
    if (Number.isFinite(filters.maxSpiciness)) {
      newProducts = newProducts.filter(product =>
        (product.spiciness <= filters.maxSpiciness));
    }
    if (filters.category) {
      newProducts = newProducts.filter(product =>
        (product.category === filters.category));
    }

    this.elem.querySelector('.products-grid__inner').innerHTML = '';

    newProducts.forEach(item => {
      let product = new ProductCard(item);
      this.elem.querySelector('.products-grid__inner').append(product.elem);
    })
  }
}




