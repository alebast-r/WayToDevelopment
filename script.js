document.addEventListener('DOMContentLoaded', function() {
    // ==================== СЛАЙДЕР НА ГЛАВНОЙ ====================
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.sliderPetsPage-arrow-prev');
    const nextBtn = document.querySelector('.sliderPetsPage-arrow-next');
    
    if (track && prevBtn && nextBtn) {
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
        }
        
        // Обработчики событий с цикличной прокруткой
        nextBtn.addEventListener('click', function() {
            const maxIndex = getMaxIndex();
            
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider();
        });
        
        prevBtn.addEventListener('click', function() {
            const maxIndex = getMaxIndex();
            
            if (currentIndex > 0) {
                currentIndex--;
            } else {
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
    }

    // ==================== БУРГЕР-МЕНЮ ====================
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    
    if (burgerMenu && mobileNav) {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
        
        function toggleMenu() {
            burgerMenu.classList.toggle('active');
            mobileNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = burgerMenu.classList.contains('active') ? 'hidden' : '';
        }
        
        burgerMenu.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                toggleMenu();
            });
        });
    }

    // ==================== ПАГИНАЦИЯ (только на странице Our Pets) ====================
    const petsGrid = document.querySelector('.petsGrid');
    const pageNumbersContainer = document.querySelector('.pageNumbers');
    
    if (petsGrid && pageNumbersContainer) {
        const prevBtn = document.querySelector('.prevBtn');
        const nextBtn = document.querySelector('.nextBtn');
        const firstBtn = document.querySelector('.firstBtn');
        const lastBtn = document.querySelector('.lastBtn');
        
        const allCards = Array.from(document.querySelectorAll('.petCard'));
        let currentPage = 1;
        let cardsPerPage = 8;
        
        function getCardsPerPage() {
            const width = window.innerWidth;
            if (width >= 1280) return 8;
            if (width >= 768) return 6;
            return 3;
        }
        
        function getTotalPages() {
            return Math.ceil(allCards.length / cardsPerPage);
        }
        
        function showCurrentPage() {
            cardsPerPage = getCardsPerPage();
            const totalPages = getTotalPages();
            
            allCards.forEach(card => card.style.display = 'none');
            
            const startIndex = (currentPage - 1) * cardsPerPage;
            const endIndex = startIndex + cardsPerPage;
            
            allCards.slice(startIndex, endIndex).forEach(card => {
                card.style.display = 'block';
            });
            
            updatePagination(totalPages);
            updateButtons(totalPages);
            
            const title = document.querySelector('.ourPetsContent h1');
            if (title) {
                title.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }
        }
        
        function updatePagination(totalPages) {
            pageNumbersContainer.innerHTML = '';
            
            const pageBtn = document.createElement('button');
            pageBtn.className = 'pageNumber active';
            pageBtn.textContent = currentPage;
            pageNumbersContainer.appendChild(pageBtn);
        }
        
        function updateButtons(totalPages) {
            if (prevBtn) prevBtn.disabled = currentPage === 1;
            if (nextBtn) nextBtn.disabled = currentPage === totalPages;
            if (firstBtn) firstBtn.disabled = currentPage === 1;
            if (lastBtn) lastBtn.disabled = currentPage === totalPages;
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    showCurrentPage();
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentPage < getTotalPages()) {
                    currentPage++;
                    showCurrentPage();
                }
            });
        }
        
        if (firstBtn) {
            firstBtn.addEventListener('click', () => {
                currentPage = 1;
                showCurrentPage();
            });
        }
        
        if (lastBtn) {
            lastBtn.addEventListener('click', () => {
                currentPage = getTotalPages();
                showCurrentPage();
            });
        }
        
        window.addEventListener('resize', function() {
            const oldCardsPerPage = cardsPerPage;
            cardsPerPage = getCardsPerPage();
            
            if (oldCardsPerPage !== cardsPerPage) {
                const firstCardIndex = (currentPage - 1) * oldCardsPerPage;
                currentPage = Math.floor(firstCardIndex / cardsPerPage) + 1;
                showCurrentPage();
            }
        });
        
        showCurrentPage();
    }

    // ==================== МОДАЛЬНЫЕ ОКНА ====================
    function initModals() {
        const slideButtons = document.querySelectorAll('.slide button');
        const learnMoreButtons = document.querySelectorAll('.learnMoreBtn');
        const allModalButtons = [...slideButtons, ...learnMoreButtons];
        
        const modalCloseBtns = document.querySelectorAll('.modal-close-btn');
        const modalOverlays = document.querySelectorAll('.modal-overlay');

        if (allModalButtons.length === 0) return;

        // Открытие модалки
        allModalButtons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const modalIndex = (index % 8) + 1;
                const modal = document.getElementById(`modal-${modalIndex}`);
                
                if (modal) {
                    modalOverlays.forEach(m => m.classList.remove('active'));
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Закрытие по крестику
        modalCloseBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal-overlay');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Закрытие по клику на фон
        modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modalOverlays.forEach(modal => {
                    modal.classList.remove('active');
                });
                document.body.style.overflow = '';
            }
        });
    }

    // Инициализируем модалки
    initModals();



    // ==================== КОПИРОВАНИЕ КОНТАКТОВ ====================
        // Элементы, которые копируем
        const contacts = [
            { selector: '.footerContactsMail a', text: 'email@shelter.com' },
            { selector: '.footerContactsPhone a', text: '+13 674 567 75 54' },
            { selector: '.footerLocationsBoston a', text: '1 Central Street, Boston (entrance from the store)' },
            { selector: '.footerLocationsLondon a', text: '18 South Park, London' },
            { selector: '.donationCreditCard a', text: '8380 2880 8028 8791 7435'}
        ];

        contacts.forEach(contact => {
            const element = document.querySelector(contact.selector);
            if (!element) return;

            element.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Создаём временное поле для копирования
                const tempInput = document.createElement('input');
                tempInput.value = contact.text;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
            });

            // Добавляем курсор и подсказку
            element.style.cursor = 'pointer';
            element.title = 'Кликните, чтобы скопировать';
        });
    });