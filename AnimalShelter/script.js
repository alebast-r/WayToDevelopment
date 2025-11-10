document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.sliderPetsPage-arrow-prev');
    const nextBtn = document.querySelector('.sliderPetsPage-arrow-next');
    
    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    
    function getSlidesToShow() {
        const width = window.innerWidth;
        if (width >= 1280) return 3;
        if (width >= 768) return 2;
        return 1;
    }
    
    function getSlideStep() {
        const slide = document.querySelector('.slide');
        if (!slide) return 270 + 90;
        
        const slideWidth = slide.offsetWidth;
        const trackStyle = getComputedStyle(track);
        const gap = parseInt(trackStyle.gap) || 90;
        
        return slideWidth + gap;
    }
    
    function getMaxIndex() {
        return Math.max(0, slides.length - getSlidesToShow());
    }
    
    function updateSlider() {
        const maxIndex = getMaxIndex();
        const step = getSlideStep();
        
        track.style.transition = 'transform 0.5s ease';
        track.style.transform = `translateX(-${currentIndex * step}px)`;
        
        updateButtons();
    }
    
    function updateButtons() {
        const maxIndex = getMaxIndex();
        // Убираем disabled для бесконечной прокрутки
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
    }
    
    // Обработчики событий с цикличной прокруткой
    nextBtn.addEventListener('click', function() {
        const maxIndex = getMaxIndex();
        
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            // Достигли конца - возвращаемся в начало
            currentIndex = 0;
        }
        updateSlider();
    });
    
    prevBtn.addEventListener('click', function() {
        const maxIndex = getMaxIndex();
        
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // Находимся в начале - переходим в конец
            currentIndex = maxIndex;
        }
        updateSlider();
    });
    
    window.addEventListener('resize', function() {
        currentIndex = Math.min(currentIndex, getMaxIndex());
        updateSlider();
    });
    
    // Инициализация
    updateSlider();
});