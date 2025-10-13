// JavaScript для слайдера
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    let startX = 0;
    let endX = 0;
    
    // Функция для обновления слайдера
    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Обновляем активную точку
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Следующий слайд
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    // Предыдущий слайд
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    // Обработчики событий для кнопок
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Переключение по точкам
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentSlide = parseInt(this.getAttribute('data-slide'));
            updateSlider();
            resetAutoSlide();
        });
    });
    
    // Обработчики для свайпов на мобильных
    slider.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Свайп влево - следующий слайд
                nextSlide();
            } else {
                // Свайп вправо - предыдущий слайд
                prevSlide();
            }
            resetAutoSlide();
        }
    }
    
    // Функция для автопереключения слайдов
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // Функция для сброса автопереключения
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Запуск автопереключения
    startAutoSlide();
    
    // Остановка автопереключения при наведении на слайдер
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    // Возобновление автопереключения при уходе курсора
    slider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    // Адаптация для мобильных - остановка автопереключения при касании
    slider.addEventListener('touchstart', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('touchend', () => {
        startAutoSlide();
    });
});