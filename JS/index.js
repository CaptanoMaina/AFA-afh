const togglerIcon = document.querySelector('.toggler i');
const menu = document.querySelector('.nav');

if (togglerIcon && menu) {
    togglerIcon.addEventListener('click', () => {
        menu.classList.toggle('show');
        togglerIcon.classList.toggle('fa-times');
    });

    const navItems = document.querySelectorAll('.nav ul li a');
    navItems.forEach((item) => {
        item.addEventListener('click', () => {
            menu.classList.remove('show');
            togglerIcon.classList.remove('fa-times');
        });
    });
}

if (typeof ScrollReveal !== 'undefined') {
    const scrollReveal = ScrollReveal({
        distance: '70px',
        duration: 1000,
        delay: 120,
        reset: false
    });

    const revealTop = ['#about', '#homes', '#admissions', '#contact'];
    const revealRight = ['#services', '#advantages'];
    const revealLeft = ['#gallery', '#testimonials'];

    revealTop.forEach((selector) => scrollReveal.reveal(selector, { origin: 'top' }));
    revealRight.forEach((selector) => scrollReveal.reveal(selector, { origin: 'right' }));
    revealLeft.forEach((selector) => scrollReveal.reveal(selector, { origin: 'left' }));
}

const carousel = document.querySelector('.gallery-carousel');
const firstImg = carousel ? carousel.querySelectorAll('img')[0] : null;
const arrowIcons = document.querySelectorAll('.wrapper i');

let isDragStart = false;
let isDragging = false;
let prevPageX;
let prevScrollLeft;
let positionDiff;

const showHideIcons = () => {
    if (!carousel || arrowIcons.length < 2) return;
    const scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft <= 0 ? 'none' : 'block';
    arrowIcons[1].style.display = carousel.scrollLeft >= scrollWidth ? 'none' : 'block';
};

if (carousel && firstImg && arrowIcons.length >= 2) {
    arrowIcons.forEach((icon) => {
        icon.addEventListener('click', () => {
            const firstImgWidth = firstImg.clientWidth + 14;
            carousel.scrollLeft += icon.id === 'left' ? -firstImgWidth : firstImgWidth;
            setTimeout(showHideIcons, 60);
        });
    });

    const autoSlide = () => {
        if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) {
            return;
        }

        positionDiff = Math.abs(positionDiff);
        const firstImgWidth = firstImg.clientWidth + 14;
        const valDifference = firstImgWidth - positionDiff;

        if (carousel.scrollLeft > prevScrollLeft) {
            carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        } else {
            carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
        }
    };

    const dragStart = (e) => {
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragStart) return;
        e.preventDefault();
        isDragging = true;
        carousel.classList.add('dragging');
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
    };

    const dragStop = () => {
        isDragStart = false;
        carousel.classList.remove('dragging');
        if (!isDragging) return;
        isDragging = false;
        autoSlide();
    };

    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart);
    document.addEventListener('mousemove', dragging);
    carousel.addEventListener('touchmove', dragging);
    document.addEventListener('mouseup', dragStop);
    carousel.addEventListener('touchend', dragStop);

    showHideIcons();
}
