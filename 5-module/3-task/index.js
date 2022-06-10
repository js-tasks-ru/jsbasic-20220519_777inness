
function initCarousel() {
  let carouselArrowRight = document.querySelector('.carousel__arrow_right');
  let carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  let carousel = document.querySelector('.carousel__inner');
  let width = document.querySelector('.carousel__slide').offsetWidth;

  let currentSlide = 0;

  carouselArrowRight.onclick = () => {
    currentSlide = Math.min(3, currentSlide + 1);
    updatePosition();

  };

  carouselArrowLeft.onclick = () => {
    currentSlide = Math.max(0, currentSlide - 1);

    updatePosition();
  };

  function updatePosition() {
    const newValue = -width * currentSlide;

    carousel.style.transform = `translateX(${newValue}px)`;

    if (currentSlide === 3) {
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
