/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener('DOMContentLoaded', () => {
  //Три задачи логическим языком:
  //1 - скрывать ненужные табы
  //2 - показать нужный таб
  //3 - назначить обработчик на кнопку, по клике на которую будет показываться таб
  const tabs = document.querySelectorAll('.tabheader__item'),
        //получаем кнопки табов
  tabsContent = document.querySelectorAll('.tabcontent'),
        //получаем содержимое табов
  tabsParent = document.querySelector('.tabheader__items'); //получаем обёртку кнопок табов
  //1-создаём функцию скрытия табов

  function hideTabContent() {
    tabsContent.forEach(item => {
      //перебираем табы, у всех ставим display = none
      item.style.display = 'none'; //с использованием классов
      // item.classList.add('hide');
      // item.classList('show');
    });
    tabs.forEach(item => {
      //удаляем класс активности
      item.classList.remove('tabheader__item_active');
    });
  } //2-функция показа табов


  function showTabContent(i = 0) {
    tabsContent[i].style.display = 'block'; //назначаем первому (через i=0) табу видимость

    tabs[i].classList.add('tabheader__item_active'); //добавляем первому (через i=0) табу класс активности
    //с использованием классов
    // tabsContent[i].classList.add('show');
    // tabsContent[i].classList.remove('hide');
  }

  hideTabContent();
  showTabContent(); //3-обрабочтик события клика

  tabsParent.addEventListener('click', e => {
    //навешиваем обработчик события и передаём событие
    const target = e.target; //из e.target делаем переменную, для переиспользования

    if (target && target.classList.contains('tabheader__item')) {
      //если обёртка содержит нужный класс 
      //перебираем все табы, и если элемент в псевдомассиве совпадаем с элементом на который кликнули,
      //берём его номер и показываем на странице
      tabs.forEach((item, i) => {
        //проверяем с аргументами - 1: каждый элемент, 2: порядковый номер
        if (target == item) {
          //если элемент в который кликнули == элемент который перебираем
          hideTabContent(); //вызываем функции (т.е. скрываем и показываем)

          showTabContent(i);
        }
      });
    }
  }); //Дополнительно: 1 - используем не стили а классы, 2 - плавное переключение
  //1 - Добавляем классы в css (hide и show)
  //2 - Добавляем класс с анимацией в css, и добавляем в js при показе таба 
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map