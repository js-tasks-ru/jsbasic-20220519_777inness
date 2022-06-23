import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {


    this.categories = categories;
    this.elem = createElement(`<div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner"> </nav>
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`);

    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.addCategories();
    this.scrollRibbon();
    this.initChooseCategory();

  }
  addCategories() {
    this.categories.forEach(item => {
      let category = createElement(`<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`);
      this.elem.querySelector('.ribbon__inner').append(category)
    });
  }

  scrollRibbon() {
    this.elem.querySelector('.ribbon__arrow_right').addEventListener('click', (event) => this.ribbonInner.scrollBy(350, 0));

    this.elem.querySelector('.ribbon__arrow_left').addEventListener('click', (event) => this.ribbonInner.scrollBy(-350, 0));


    this.ribbonInner.addEventListener('scroll', () => this.hideButton());
  }
  hideButton() {
    let scrollLeft = this.ribbonInner.scrollLeft;

    if (scrollLeft !== 0) {
      this.elem.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');

    } else {
      this.elem.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
    }

    let scrollWidth = this.ribbonInner.scrollWidth;
    let clientWidth = this.ribbonInner.clientWidth;


    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    console.log('scrollRight', scrollRight)
    if (scrollRight < 1) {
      this.elem.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');

    } else {
      this.elem.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
    }
  }

  initChooseCategory() {

    this.elem.querySelectorAll('.ribbon__item').forEach(elem => {
      elem.addEventListener('click', (event) => {
        event.preventDefault();
        elem.classList.toggle('ribbon__item_active');

        let ev = new CustomEvent('ribbon-select', {
          detail: elem.dataset.id,
          bubbles: true

        })
        this.elem.dispatchEvent(ev);
      });
    })
  }
}
