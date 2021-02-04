window.addEventListener('DOMContentLoaded', () => {

    //Три задачи логическим языком:
    //1 - скрывать ненужные табы
    //2 - показать нужный таб
    //3 - назначить обработчик на кнопку, по клике на которую будет показываться таб

    const tabs = document.querySelectorAll('.tabheader__item'), //получаем кнопки табов
        tabsContent = document.querySelectorAll('.tabcontent'), //получаем содержимое табов
        tabsParent = document.querySelector('.tabheader__items'); //получаем обёртку кнопок табов


    //1-создаём функцию скрытия табов
    function hideTabContent() {
        tabsContent.forEach(item => { //перебираем табы, у всех ставим display = none
            item.style.display = 'none';
            //с использованием классов
            // item.classList.add('hide');
            // item.classList('show');
        });
        tabs.forEach(item => { //удаляем класс активности
            item.classList.remove('tabheader__item_active');
        });
    }

    //2-функция показа табов
    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block'; //назначаем первому (через i=0) табу видимость
        tabs[i].classList.add('tabheader__item_active'); //добавляем первому (через i=0) табу класс активности
        //с использованием классов
        // tabsContent[i].classList.add('show');
        // tabsContent[i].classList.remove('hide');
    }
    hideTabContent();
    showTabContent();

    //3-обрабочтик события клика

    tabsParent.addEventListener('click', (e) => { //навешиваем обработчик события и передаём событие
        const target = e.target; //из e.target делаем переменную, для переиспользования

        if (target && target.classList.contains('tabheader__item')) { //если обёртка содержит нужный класс 
            //перебираем все табы, и если элемент в псевдомассиве совпадаем с элементом на который кликнули,
            //берём его номер и показываем на странице
            tabs.forEach((item, i) => { //проверяем с аргументами - 1: каждый элемент, 2: порядковый номер
                if (target == item) { //если элемент в который кликнули == элемент который перебираем
                    hideTabContent(); //вызываем функции (т.е. скрываем и показываем)
                    showTabContent(i);
                }
            });
        }
    });

//Дополнительно: 1 - используем не стили а классы, 2 - плавное переключение
//1 - Добавляем классы в css (hide и show)
//2 - Добавляем класс с анимацией в css, и добавляем в js при показе таба 
});