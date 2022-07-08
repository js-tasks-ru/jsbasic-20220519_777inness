import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';


export default class Main {

  constructor() {
  }

  async render() {

    let carousel = new Carousel(slides);
    let carouselHolder = document.body.querySelector('[data-carousel-holder]');

    carouselHolder.append(carousel.elem);

    let ribbon = new RibbonMenu(categories);

    let ribbonHolder = document.querySelector('[data-ribbon-holder]');

    ribbonHolder.append(ribbon.elem);

    let stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });

    let sliderHolder = document.querySelector('[data-slider-holder]');

    sliderHolder.append(stepSlider.elem);

    let cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(cartIcon.elem);
    let cart = new Cart(cartIcon);
    console.log(cart);

    let products = [];

    let promise = await fetch('products.json');
    if (promise.ok) {
      products = await promise.json();

    }

    let productGrid = new ProductsGrid(products);
    let productGridHolder = document.querySelector('[data-products-grid-holder]');
    productGridHolder.innerHTML = "";

    

    productGridHolder.append(productGrid.elem);


    productGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbon.value
    });
    console.log(productGrid);

    document.body.addEventListener('product-add', function (e) {
     

      let index = products.findIndex((product) => product.id === e.detail  );
     

      cart.addProduct(products[index]);

    })

   

    stepSlider.elem.addEventListener('slider-change', function (e) {
      productGrid.updateFilter({
        maxSpiciness: e.target.value
      });
    })

    console.log(productGrid);

    ribbon.elem.addEventListener('ribbon-select', function (e) {
      productGrid.updateFilter({
        category: e.categoryId
      });
    })

    let nuts = document.getElementById('nuts-checkbox');
    let vegeterian = document.getElementById('vegeterian-checkbox');
    console.log(nuts);
    console.log(vegeterian);



    nuts.addEventListener('change', function (e) {
      productGrid.updateFilter({
        noNuts: e.target.checked // новое значение чекбокса
      });
    })

    vegeterian.addEventListener('change', function (e) {
      productGrid.updateFilter({
        vegeterianOnly: e.target.checked // новое значение чекбокса
      });
    })


  }
}
