/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _logout = __webpack_require__(2);
	
	var _auth = __webpack_require__(3);
	
	var _form = __webpack_require__(4);
	
	//Валидация формы авторизации/регистрации
	_auth.cAuth.init();
	
	//Post запрос на выход
	_logout.cLogout.init();
	
	_form.cImgs.init();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var cLogout = exports.cLogout = function () {
	    var logout = document.getElementById('logout');
	
	    return {
	        xhrLogout: function xhrLogout(e) {
	            e.preventDefault();
	
	            var xhr = new XMLHttpRequest(),
	                url = '/logout';
	
	            xhr.open('POST', url, true);
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState != 4) return;
	                if (xhr.status != 200) {
	                    alert("Ошибка!");
	                } else {
	                    location.href = "/";
	                }
	            };
	            xhr.send();
	        },
	        event: function event() {
	            logout.addEventListener('click', this.xhrLogout);
	        },
	        init: function init() {
	            logout && this.event();
	        }
	    };
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var cAuth = exports.cAuth = function () {
	    var email = document.getElementById('email'),
	        password = document.getElementById('password'),
	        password2 = document.getElementById('repeat_password'),
	        form = document.getElementById('auth-form');
	
	    return {
	        testHtml: function testHtml(s) {
	            return s.search(/[<>&"']/ig) == -1;
	        },
	        checkLength: function checkLength(el, length) {
	            return el.value.length > length;
	        },
	        checkEmail: function checkEmail() {
	            if (!this.checkLength(email, 5) || !this.testHtml(email.value)) {
	                email.parentElement.classList.add('has-error');
	                return false;
	            }
	
	            email.parentElement.classList.remove('has-error');
	            return true;
	        },
	        checkPassword: function checkPassword() {
	            if (password2) {
	                if (!this.checkLength(password, 5) || password.value !== password2.value || !this.testHtml(password2.value)) {
	                    password.parentElement.classList.add('has-error');
	                    password2.parentElement.classList.add('has-error');
	                    return false;
	                }
	
	                password.parentElement.classList.remove('has-error');
	                password2.parentElement.classList.remove('has-error');
	                return true;
	            } else {
	                if (!this.checkLength(password, 5) || !this.testHtml(password.value)) {
	                    password.parentElement.classList.add('has-error');
	                    return false;
	                }
	            }
	
	            password.parentElement.classList.remove('has-error');
	            return true;
	        },
	        event: function event() {
	            var _this = this;
	
	            form.onsubmit = function () {
	                return _this.checkEmail() && _this.checkPassword();
	            };
	        },
	        init: function init() {
	            form && this.event();
	        }
	    };
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var cImgs = exports.cImgs = function () {
	
	    var imgsPanel = document.getElementById('imgs-panel');
	
	    return {
	        xhrAdd: function xhrAdd(button) {
	            var xhr = new XMLHttpRequest(),
	                url = '/uploads',
	                form = button.parentNode,
	                input = form.elements.img_file,
	                data = new FormData(form);
	
	            if (input.value == '') return;
	
	            data.append('img_file', input.name);
	
	            xhr.open('POST', url, true);
	
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState != 4) return;
	                if (xhr.status != 200) {
	                    alert("Ошибка, попробуйте позже!");
	                } else {
	                    var _url = "/i/" + xhr.responseText;
	                    form.parentNode.parentNode.innerHTML = "<a class='thumbnail' href='#'><img src='" + _url + "'</a>";
	                }
	            };
	
	            xhr.send(data);
	        },
	        xhrRemove: function xhrRemove(button) {
	            var xhr = new XMLHttpRequest(),
	                url = '/removeimg',
	                imgNum = button.parentNode.parentNode.dataset.imgform,
	                data = JSON.stringify({ imgNum: imgNum });
	
	            xhr.open('POST', url, true);
	
	            xhr.setRequestHeader('Content-Type', 'application/json');
	            xhr.onreadystatechange = function () {
	                if (xhr.readyState != 4) return;
	                if (xhr.status != 200) {
	                    alert("Попробуйте позже");
	                } else {
	                    location.reload();
	                }
	            };
	
	            xhr.send(data);
	        },
	        events: function events() {
	            var _this = this;
	
	            imgsPanel.onclick = function (e) {
	                var target = e.target;
	
	                if (target.type == 'submit') {
	                    e.preventDefault();
	                    _this.xhrAdd(target);
	                } else if (target.className == 'remove_img') {
	                    _this.xhrRemove(target);
	                } else {
	                    return;
	                }
	            };
	        },
	        init: function init() {
	            imgsPanel && this.events();
	        }
	    };
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map