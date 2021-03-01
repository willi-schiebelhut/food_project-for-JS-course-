window.addEventListener('DOMContentLoaded', () => {
    const tabsContent = document.querySelectorAll('.tabcontent'),
        tabsButton = document.querySelectorAll('.tabheader__item'),
        tabsWrapper = document.querySelector('.tabheader__items');

    function hide() {
        tabsContent.forEach(i => {
            i.style.display = 'none';
        });
        tabsButton.forEach(i => {
            i.classList.remove('tabheader__item_active');
        });
    }

    function show(i = 0) {
        tabsContent[i].style.display = 'block';
        tabsButton[i].classList.add('tabheader__item_active');
    }

    hide();
    show();

    tabsWrapper.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabsButton.forEach((item, i) => {
                if (target == item) {
                    hide();
                    show(i);
                }
            });
        }
    });



    //Таймер

    //1 - Создать функцию установки таймера
    //2 - Создать функцию разницы между временем (вычислить время установленное у пользователя и вывести время)
    //3 Создать ф-ю обновления таймера

    //Честные таймеры - используют реальное время
    //Таймеры для продажи - ориентируются на каждого поль-ля


    //1
    const deadline = '2021-02-10'; //переменная - до какой даты работает таймер. Используем строку, для исползования в Input или админ. панели.


    function getTimeRemaining(endtime) { //функция определяющая разницу между deadline и текущим временем пользователя (аргумент - deadline).
        const t = Date.parse(endtime) - Date.parse(new Date()), //техническая переменная. 1 часть - переводит стрку в дату (число), 2 часть - текущая дата. Оператором минус отнимаем два значения.
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //теперь разницу полученную в мск, переводим в часы (разницу делим на произведение (1000 - кол-во мск в секунде * 60 (кол-во мск в минуте * 60 (кол-во мск в часе) * 24 (кол-во мск в сутках). С помощью Math.floor отсекаем нецелое значение.
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), //получаем часы. Нужно число не больше 24 (часов), оператор % возвращает остаток от деления 2-х чисел (общее кол-во мск / кол-во мск в часе / 24 = получить остаток).
            minutes = Math.floor((t / 1000 / 60) % 60), // получаем часы (остаток по тому же принципу)
            seconds = Math.floor((t / 1000) % 60);

        return { //т.к. данные полученые выше работают только внутри ф-ии, с помощью return выводим их наружу, и помещаем в объект.
            'total': t, //общее кол-во мск.
            'days': days, //дней
            'hours': hours, //часов
            'minutes': minutes, //минут
            'seconds': seconds //секунд
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) { //ф-ия установки таймера на страницу. (Селектор, куда будем ставить таймер/deadline)
        const timer = document.querySelector(selector), // получаем элементы со страницы и передаём ар-мент для повторного переиспользования таймера на других селекторах
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); //запускаем ф-ию через каждую секунду
        updateClock();

        function updateClock() { //ф-ия обновления таймера
            const t = getTimeRemaining(endtime), //в переменную получаем значение ф-ции расчёта оставшегося времени, в ар-мент передаём
                numbers = document.querySelectorAll('.timer__block span');


            days.innerHTML = getZero(t.days); //помещаем на страницу результаты
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval); //если время вышло, кол-во млск меньше нуля, то останавливаем интревал.
            }
            if (t.days < 1) {
                numbers.forEach(i => {
                    i.style.color = 'red';
                });
            }
        }
    }
    setClock('.timer', deadline);


    //Модальное окно

    const triggerModal = document.querySelectorAll('[data-modal]'),
        closeModal = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');

    function open() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); // не показывать модальное, если открыл сам
    }

    triggerModal.forEach(i => {
        i.addEventListener('click', open);
    });

    function close() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }



    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            close();
        }
    });

    closeModal.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            close();
        }
    });


    //Отложенная загрузка модального окна

    // const modalTimerId = setTimeout(open, 3000);

    // function showModalByScroll() {
    //     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
    //         open();
    //         window.removeEventListener('scroll', showModalByScroll);
    //     }
    // }

    // //Загрузка после докручивания до конца страницы

    // window.addEventListener('scroll', showModalByScroll);


//Используем классы для карточек меню

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element ='menu__item'
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        'big'

    ).render();

});
