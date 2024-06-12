class SlideShow extends HTMLElement {
  constructor() {
    super();

    const style = document.createElement('style');
    style.textContent = this.getStyle();
    this.appendChild(style);

    this.slideShow = document.createElement('div');
    this.slideShow.className = 'slideshow';
    this.slideShow.innerHTML = this.render();
    this.appendChild(this.slideShow);

    this.slideIndex = 1;
    this.showSlides(this.slideIndex);

    this.intervalId = null;
    this.startInterval();

    this.getEventListeners();
  }

  render() {
    const slides = [
      { src: './images/hero-image_1', alt: 'Slide 1' },
      { src: './images/hero-image_2', alt: 'Slide 2' },
      { src: './images/hero-image_3', alt: 'Slide 3' },
      { src: './images/hero-image_4', alt: 'Slide 4' },
    ];

    const slideHTML = slides.map((slide) => `
      <picture class="slide">
        <source media="(min-width: 1024px)" type="image/webp" srcset="${slide.src}.webp" />
        <source media="(min-width: 630px)" type="image/webp" srcset="${slide.src}-medium.webp" />
        <source media="(min-width: 0px)" type="image/webp" srcset="${slide.src}-small.webp" />
        <source type="image/webp" srcset="${slide.src}.webp" />
        <source type="image/jpeg" srcset="${slide.src}.jpg" />
        <img src="${slide.src}.jpg" alt="${slide.alt}" />
      </picture>
    `).join('');

    return `
      ${slideHTML}
      <button class="prev" aria-label="Previous Slide">&#10094;</button>
      <button class="next" aria-label="Next Slide">&#10095;</button>
    `;
  }

  getStyle() {
    return `
      .slideshow {
        position: relative;
        overflow: hidden;
        grid-row: 1;
        height: 50vh;
        z-index: 5;
      }
      
      .slideshow > .slide {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: all 0.5s linear;
      }

      .slideshow > .slide > img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
      
      .slideshow > .prev,
      .slideshow > .next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        cursor: pointer;
        padding: 16px;
        font-size: 24px;
        z-index: 10;
      }
      
      .slideshow > .prev {
        left: 35px;
      }
      
      .slideshow > .next {
        right: 35px;
      }

      @media screen and (min-width: 630px) {     
        .slideshow {
          height: 65vh;
        }
      
        .slideshow > .prev {
          left: 60px;
        }
        
        .slideshow > .next {
          right: 60px;
        }
      
        @media screen and (min-width: 1024px) {
          .slideshow {
            height: 80vh;
          }     
        }
    `;
  }

  getEventListeners() {
    const nextSlide = this.slideShow.querySelector('.next');
    nextSlide.addEventListener('click', () => {
      this.showSlides(this.slideIndex += 1);
      this.startInterval();
    });

    const prevSlide = this.slideShow.querySelector('.prev');
    prevSlide.addEventListener('click', () => {
      this.showSlides(this.slideIndex -= 1);
      this.startInterval();
    });
  }

  showSlides(n) {
    const slides = this.slideShow.querySelectorAll('.slide');

    if (n > slides.length) {
      this.slideIndex = 1;
    }

    if (n < 1) {
      this.slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i += 1) {
      slides[i].style.opacity = 0;
      slides[i].classList.remove('active');
    }

    slides[this.slideIndex - 1].style.opacity = 1;
    slides[this.slideIndex - 1].classList.add('active');
  }

  startInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      this.showSlides(this.slideIndex += 1);
    }, 4000);
  }
}

customElements.define('slide-show', SlideShow);
