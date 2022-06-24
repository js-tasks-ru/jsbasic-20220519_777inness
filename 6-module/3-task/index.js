import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement('div');
    this.elem.classList.add("carousel");

    const buttonRight = createElement(`<div class="carousel__arrow carousel__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </div> `);

  const buttonLeft = createElement(`<div class="carousel__arrow carousel__arrow_left">
    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
  </div></div>`);

    this.elem.append(buttonRight);
    this.elem.append(buttonLeft);
    this.inner = document.createElement('div');
    this.inner.classList.add("carousel__inner");
    this.elem.append(this.inner);
    this.createCarousel();
    this.initCarousel();



  }
  createCarousel() {

    this.slides.forEach((item) => {
      let slide = createElement(`<div class="carousel__slide" data-id="${item.id}">
    <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€${item.price.toFixed(2)}</span>
      <div class="carousel__title">${item.name}</div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
  </div>`);
     slide.querySelector('.carousel__button').onclick = () => this.addToCart(item);
      this.inner.append(slide);
    })
  }
  addToCart(slide) {
    let event = new CustomEvent("product-add", {
      detail: slide.id,
      bubbles: true
    })

    this.elem.dispatchEvent(event);

  }

  initCarousel() {
    let carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
    let carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');


    let currentSlide = 0;
    let slideSum = this.slides.length;


    carouselArrowRight.onclick = () => {
      currentSlide = Math.min(slideSum, currentSlide + 1);

      updatePosition();


    };


    carouselArrowLeft.onclick = () => {
      currentSlide = Math.max(0, currentSlide - 1);

      updatePosition();
    };

    let updatePosition = () => {
      let width = this.elem.querySelector('.carousel__slide').offsetWidth;
      const newValue = -width * currentSlide;

      this.inner.style.transform = `translateX(${newValue}px)`;

      if (currentSlide === slideSum-1) {
        carouselArrowRight.style.display = 'none';
      } else {
        carouselArrowRight.style.display = '';
      }

      if (currentSlide === 0) {
        carouselArrowLeft.style.display = 'none';
      } else {
        carouselArrowLeft.style.display = '';
      }

    }

    updatePosition();
  }


}
 
 












 
 
 
 