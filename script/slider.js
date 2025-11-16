// JavaScript для слайдера
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slidee');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    let startX = 0;
    let endX = 0;
    let isDragging = false;
    
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
    
    // Перейти к конкретному слайду
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
        resetAutoSlide();
    }
    
    // Обработчики событий для кнопок
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Переключение по точкам
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });
    
    // Улучшенные обработчики для свайпов на мобильных
    slider.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(autoSlideInterval); // Останавливаем автослайд при касании
    });
    
    slider.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        endX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        
        const diff = startX - endX;
        const swipeThreshold = 50;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Свайп влево - следующий слайд
                nextSlide();
            } else {
                // Свайп вправо - предыдущий слайд
                prevSlide();
            }
        }
        
        isDragging = false;
        resetAutoSlide();
    });
    
    // Обработчики для десктопных устройств (drag)
    slider.addEventListener('mousedown', function(e) {
        startX = e.clientX;
        isDragging = true;
        clearInterval(autoSlideInterval);
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        endX = e.clientX;
    });
    
    document.addEventListener('mouseup', function(e) {
        if (!isDragging) return;
        
        const diff = startX - endX;
        const swipeThreshold = 50;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        isDragging = false;
        resetAutoSlide();
    });
    
    // Функция для автопереключения слайдов
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // Функция для сброса автопереключения
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Пауза автопереключения при наведении (только для десктопов)
    if (window.matchMedia("(min-width: 769px)").matches) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    
    // Инициализация слайдера
    updateSlider();
    
    // Запуск автопереключения
    startAutoSlide();
    
    // Обработка изменения ориентации устройства
    window.addEventListener('orientationchange', function() {
        // Перезапускаем слайдер после изменения ориентации
        setTimeout(() => {
            updateSlider();
        }, 300);
    });
    
    // Обработка изменения размера окна
    window.addEventListener('resize', function() {
        updateSlider();
    });
});