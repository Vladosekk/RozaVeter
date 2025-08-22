// Скрипт для автоматического слайдера
document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack = document.querySelector('.slider-track');
    const progressItems = document.querySelectorAll('.progress-item');
    const progressBars = document.querySelectorAll('.progress-bar');
    const slides = document.querySelectorAll('.slider-slide');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;
    
    function goToSlide(index) {
        currentSlide = index;
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        progressItems.forEach((item, i) => {
            item.classList.toggle('active', i === currentSlide);
        });
        
        progressBars.forEach(bar => bar.style.width = '0%');
        if (progressBars[currentSlide]) {
            progressBars[currentSlide].style.width = '100%';
        }
    }
    
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slideCount) next = 0;
        goToSlide(next);
    }
    
    function startSlider() {
        slideInterval = setInterval(nextSlide, 3000);
    }
    
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    function initSlider() {
        startSlider();
        
        const slider = document.querySelector('.auto-slider');
        slider.addEventListener('mouseenter', stopSlider);
        slider.addEventListener('mouseleave', startSlider);
        
        progressItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                stopSlider();
                goToSlide(index);
                startSlider();
            });
        });
    }
    
    initSlider();
});