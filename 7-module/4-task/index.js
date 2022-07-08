import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = createElement(`<div class="slider">
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">2</span>
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

  _moving = false;



  changeValue() {

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');
    const stepsElem = this.elem.querySelector('.slider__steps');
    let segments = this.steps - 1;
    let value;

    this.elem.addEventListener('pointerdown', () => {
      this.elem.classList.add('slider_dragging');
      this._moving = true;
    })

    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 1;
      }

      let leftPercents = leftRelative * 100;
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;


      let approximateValue = leftRelative * segments;

      value = Math.round(approximateValue);

      sliderValue.innerHTML = value;
      // stepsElem.children[value].classList.add("slider__step-active");

      thumb.style.left = `${(value * 100) / segments}%`;
      progress.style.width = `${(value * 100) / segments}%`;

      let ev = new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      })
      this.elem.dispatchEvent(ev);
    })

    document.addEventListener('pointermove', (event) => {
      if (!this._moving) return;

      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      if (leftRelative < 0) {
        leftRelative = 0;
      }

      if (leftRelative > 1) {
        leftRelative = 1;
      }

      let leftPercents = leftRelative * 100;



      thumb.ondragstart = () => false;
      thumb.style.touchAction = 'none';



      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;


      let approximateValue = leftRelative * segments;

      value = Math.round(approximateValue);

      sliderValue.innerHTML = value;
      stepsElem.children[value].classList.add("slider__step-active");

    })

    document.addEventListener('pointerup', () => {
      this._moving = false;

      thumb.style.left = `${(value * 100) / segments}%`;
      progress.style.width = `${(value * 100) / segments}%`;

      let ev = new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      })
      this.elem.dispatchEvent(ev);
      this.elem.classList.remove('slider_dragging');

    })
  }
}