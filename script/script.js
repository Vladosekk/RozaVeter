document.addEventListener('DOMContentLoaded', function() {
    const content = document.querySelector('.content');
    const allPaporLeft = document.querySelectorAll('.papor-left, .papor-appetizers-left, .papor-left-bes');
    const allPaporRight = document.querySelectorAll('.papor-right, .papor-appetizers-right, .papor-right-bes');
    const dishesTitle = document.querySelector('.dishes-title');
     const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const socialIcons = document.querySelector('.social-icons');
    
// Бургер-меню
    navbarToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        
        // Блокировка прокрутки
        document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Выпадающее меню для мобильной версии
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 1100) {
                e.preventDefault();
                const dropdown = this.closest('.dropdown');
                dropdown.classList.toggle('active');
                
                // Закрываем другие дропдауны
                document.querySelectorAll('.dropdown').forEach(item => {
                    if (item !== dropdown) item.classList.remove('active');
                });
            }
        });
    });
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        if (!link.classList.contains('dropdown-toggle')) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 1100) {
                    navbarToggle.classList.remove('active');
                    navbarMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });
    
    function animateElements() {
        document.body.classList.add('loaded');
        
        // Анимация для первой секции
        if (content) {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
            content.style.transition = 'opacity 1.2s ease-out, transform 1s ease-out';
        }
        
        // Анимация для заголовка "Наши блюда"
        if (dishesTitle) {
            dishesTitle.style.opacity = '1';
            dishesTitle.style.transform = 'translateY(0)';
            dishesTitle.style.transition = 'opacity 1s ease, transform 1s ease';
        }
        
        // Анимация для всех папоротников
        allPaporLeft.forEach(papor => {
            papor.style.opacity = '0.8';
            papor.style.transition = 'opacity 1s ease, transform 1s ease';
            
            if (papor.classList.contains('papor-left-bes')) {
                papor.style.transform = 'scale(0.9) rotate(-65deg)';
            } else if (papor.classList.contains('papor-appetizers-left')) {
                papor.style.transform = 'translateY(-50%) translateX(0) scale(0.7) rotate(-65deg)';
            } else {
                papor.style.transform = 'translateY(0) translateX(0) scale(0.9) rotate(-65deg)';
            }
        });
        
        // Анимация для всех правых папоротников
        allPaporRight.forEach(papor => {
            papor.style.opacity = '0.8';
            papor.style.transition = 'opacity 1s ease, transform 1s ease';
            
            if (papor.classList.contains('papor-right-bes')) {
                papor.style.transform = 'scale(0.9) rotate(115deg)';
            } else if (papor.classList.contains('papor-appetizers-right')) {
                papor.style.transform = 'translateY(-50%) translateX(0) scale(0.7) rotate(115deg)';
            } else {
                papor.style.transform = 'translateY(0) translateX(0) scale(0.9) rotate(115deg)';
            }
        });
    }
    
    // Инициализация начального состояния
    if (content) content.style.opacity = '0';
    if (content) content.style.transform = 'translateY(50px)';
    if (dishesTitle) dishesTitle.style.opacity = '0';
    if (dishesTitle) dishesTitle.style.transform = 'translateY(30px)';
    
    // Установка начального состояния для всех папоротников
    allPaporLeft.forEach(papor => {
        papor.style.opacity = '0';
    });
    
    allPaporRight.forEach(papor => {
        papor.style.opacity = '0';
    });
    
    setTimeout(animateElements, 300);
    window.addEventListener('load', animateElements);
    
    // Intersection Observer для анимации при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                if (target.classList.contains('content')) {
                    animateElements();
                } else if (target.classList.contains('dishes-title')) {
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                    target.style.transition = 'opacity 1s ease, transform 1s ease';
                }
            }
        });
    }, { threshold: 0.1 });
    
    if (content) observer.observe(content);
    if (dishesTitle) observer.observe(dishesTitle);
});

document.querySelectorAll('.dish-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        this.style.transform = 'translateY(1px)';
        this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        setTimeout(() => {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(93, 139, 244, 0.4)';
        }, 200);
        
        if(this.classList.contains('order-btn')) {
            console.log('Заказано блюдо:', this.closest('.dish-text-block').querySelector('.dish-name').textContent);
        } else {
            console.log('Подробнее о блюде:', this.closest('.dish-text-block').querySelector('.dish-name').textContent);
        }
    });
});

