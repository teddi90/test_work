(function () {
    /*=========== Humbeurger ===========*/
    const humbeurger = document.querySelector('.humbeurger');
    humbeurger.addEventListener('click', () => humbeurger.classList.toggle('humbeurger-active'));

    /*=========== Mobile Menu Closing ===========*/
    const mobileLinks = document.querySelectorAll('.menu__link');
    for (let i = 0; i < mobileLinks.length; i++) {
        mobileLinks[i].addEventListener('click', function () {
            humbeurger.classList.remove('humbeurger-active');
        });
    }

    /*=========== Accardion ===========*/
    const acc = document.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            const panel = this.firstElementChild;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    /*=========== Swipe slider  ===========*/
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 2,
        spaceBetween: 30,
        navigation: {
            nextEl: ".swiper-arrow-next",
            prevEl: ".swiper-arrow-prev",
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
        },
    });
    /*=========== Swipe slider2 ===========*/
    const swiperExample = new Swiper(".mySwiper2", {
        slidesPerView: 2,
        spaceBetween: 30,
        navigation: {
            nextEl: ".swiper-arrow-next",
            prevEl: ".swiper-arrow-prev",
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
                spaceBetween: 20,
            },

        },
    });

    /*=========== Smooth Skroll ===========*/
    const anchors = document.querySelectorAll('a[href^="#"]')

    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()

            const blockID = anchor.getAttribute('href');
            if (blockID.length > 1) {
                document.getElementById(blockID.substr(1)).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    /*=========== Form Validation ===========*/
    class Validation {
        constructor(options) {
            this.form = document.querySelector(options.form);
            this.allInputs = document.querySelectorAll('input');
            this.inputName = document.querySelector(options.inputName);
            this.inputEmail = document.querySelector(options.inputEmail);
            this.inputPhone = document.querySelector(options.inputPhone);

            this.form.addEventListener('submit', this.submitForm.bind(this));
            this.inputName.addEventListener('focus', this.removeError);
            this.inputName.addEventListener('blur', this.checkName.bind(this));
            this.inputEmail.addEventListener('focus', this.removeError);
            this.inputEmail.addEventListener('blur', this.checkEmail.bind(this));
            this.inputPhone.addEventListener('focus', this.removeError);
            this.inputPhone.addEventListener('blur', this.checkPhone.bind(this));
        }
        submitForm(e) {
            e.preventDefault();
            this.checkName(this.inputName);
            this.checkEmail(this.inputEmail);
            this.checkPhone(this.inputPhone);
            if (!this.checkName(this.inputName) && !this.checkEmail(this.inputEmail) && !this.checkPhone(this.inputPhone)) {
                this.clearForm();
            }


        }
        // Функція для перевірки Імені
        checkName() {
            const regExp = /^([A-Za-z\-\']{1,50})|([А-Яа-я\-\']{1,50})$/;
            let error = false;

            if (!this.inputName.value) {
                this.setError(this.inputName, 'Это поле обязательно к заполнению');
                error = true;
            } else if (!this.inputName.value.match(regExp)) {
                this.setError(this.inputName, "Имя не может содержать чисел");
                error = true;
            }
            return error;
        }

        // Функція для перевірки пошти
        checkEmail() {
            let error = false;
            const regExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

            if (!this.inputEmail.value) {
                this.setError(this.inputEmail, 'Это поле обязательно к заполнению');
                error = true;
            }
            if (this.inputEmail.value !== '' && !this.inputEmail.value.match(regExp)) {
                this.setError(this.inputEmail, 'Это неверный адрес электронной почты');
                error = true;
            }
            return error;
        }
        // Функція для перевірки Телефону
        checkPhone() {
            let error = false;
            const regExp = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;

            if (!this.inputPhone.value) {
                this.setError(this.inputPhone, 'Это поле обязательно к заполнению');
                error = true;
            }
            if (this.inputPhone.value !== '' && !this.inputPhone.value.match(regExp)) {
                this.setError(this.inputPhone, 'Это неверный номер телефона');
                error = true;
            }
            return error;
        }
        setError(elem, errorMessage) {
            if (elem.classList.contains('error')) return;
            elem.parentElement.classList.add('error');
            elem.nextElementSibling.textContent = errorMessage;
        }

        removeError() {
            if (this.parentElement.classList.contains('error')) {
                this.parentElement.classList.remove('error');
                this.nextElementSibling.textContent = '';
            }
        }
        clearForm() {
            this.allInputs.forEach((elem) => {
                elem.value = '';
            })
        }
    }

    const formValidation = new Validation({
        form: '.form',
        inputName: '.input-name',
        inputEmail: '.input-email',
        inputPhone: '.input-tell',
    });
})();
