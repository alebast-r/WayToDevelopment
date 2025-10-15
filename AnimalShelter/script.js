document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.sliderPetsPage-arrow-prev');
    const nextBtn = document.querySelector('.sliderPetsPage-arrow-next');
    
    let currentIndex = 0;
    const slideWidth = 270 + 90; // 270px карточка + 90px gap
    const slidesToShow = 3;

    function updateSlider() {
        track.style.transition = 'transform 0.5s ease';
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // Вперёд - циклическое переключение
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % (slides.length - slidesToShow + 1);
        updateSlider();
    });

    // Назад - циклическое переключение  
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + (slides.length - slidesToShow + 1)) % (slides.length - slidesToShow + 1);
        updateSlider();
    });

    // Инициализация
    updateSlider();
    console.log('Всего карточек:', slides.length);
console.log('Текущая позиция:', currentIndex);

});

