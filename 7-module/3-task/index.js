import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = createElement(`<div class="slider">

    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">0</span>
    </div>
    <div class="slider__progress" style="width: 50%;"></div>

    <div class="slider__steps">
    </div>
  </div>`);
    this.addSpan(steps);

    this.changeValue();

  }

  addSpan(steps) {
    for (let i = 0; i < steps; i++) {
      this.elem.querySelector('.slider__steps').append(createElement(`<span></span>`));
    }
    this.elem.querySelector('.slider__steps').children[this.value].classList.add('slider__step-active');
 

  }

  changeValue() {

    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;
      this.elem.querySelector('.slider__value').innerHTML = value;
      this.elem.querySelector('.slider__steps').children[value - 1].classList.add("slider__step-active");

      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');

      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;

      let ev = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      })
      this.elem.dispatchEvent(ev);


    })
  }
}

