/*=========== Header scroll style ===========*/
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else if (this.scrollY < 50 && header.classList.contains('scroll-header')) {
        header.classList.remove('scroll-header');

    }
}
window.addEventListener('scroll', scrollHeader);

/*=========== Humbeurger ===========*/
const humbeurger = document.querySelector('.humbeurger');
humbeurger.addEventListener('click', () => humbeurger.classList.toggle('humbeurger-active'));


/*=========== Swipe slider  ===========*/
const swiper = new Swiper(".mySwiper", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,

        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },

    },
});

/*=========== Smooth Skroll ===========*/
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}


