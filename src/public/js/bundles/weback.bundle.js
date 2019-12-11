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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/public/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/public/js/cycle-irrigation-device.js":
/*!**************************************************!*\
  !*** ./src/public/js/cycle-irrigation-device.js ***!
  \**************************************************/
/*! exports provided: CycleIrrigationDevice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CycleIrrigationDevice\", function() { return CycleIrrigationDevice; });\n/* harmony import */ var _device_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./device.js */ \"./src/public/js/device.js\");\n\n\n/**********************************************************************\n * for timed irrigation control\n *********************************************************************/\nclass CycleIrrigationDevice extends _device_js__WEBPACK_IMPORTED_MODULE_0__[\"Device\"]{\n    constructor(id, name, pin, notes, cycleOnTimeHr, cycleOnTimeMin, cycleOnTimeSec, cycleOffTimeHr,\n        cycleOffTimeMin, cycleOffTimeSec, blackoutStartTime, blackoutStopTime) {\n\n        super(id, name, pin, notes);\n\n        this.cycleOnTimeHr = cycleOnTimeHr;\n        this.cycleOnTimeMin = cycleOnTimeMin;\n        this.cycleOnTimeSec = cycleOnTimeSec;\n        this.cycleOffTimeHr = cycleOffTimeHr;\n        this.cycleOffTimeMin = cycleOffTimeMin;\n        this.cycleOffTimeSec = cycleOffTimeSec;\n        this.blackoutStartTime = blackoutStartTime;\n        this.blackoutStopTime = blackoutStopTime;\n        this.btnColor = \"blue\";\n        this.class = \"cycle-irrigation-device-btn\";\n            \n        this.renderBtn();\n    }\n\n    /**********************************************************************\n     * render settings under button on main page to allow adjustment of \n     * the device\n     *********************************************************************/\n    renderDeviceSettings(event) {\n        //console.log(event.target);\n        //event.target.innerHTML = \"something\";\n        //console.log(this.name); // does not know the name here\n        //this.name = \"something\";\n        //console.log(this.name); // does not know the name here\n        //event.target.innerHTML = \"something\";\n        //console.log(Device.deviceList);\n        let formElement = document.createElement(\"form\");\n\n        let form = `\n            <form class=\"deviceForm\"> \n                <label for=\"name\">Name: </label>           \n                <input type=\"text\" id=\"name\" name=\"name\" value=\"${this.name}\">\n\n                <label for=\"pin\">Pin: </label>           \n                <input type=\"number\" id=\"pin\" name=\"pin\" value=\"${this.pin}\">\n\n                <label for=\"notes\">Notes: </label>           \n                <input type=\"textarea\" id=\"notes\" name=\"notes\" value=\"${this.notes}\">\n\n                <div class=\"hr-min-sec-time\">\n                    <label for=\"cycleOnTimeHr\">Cycle On Time Hr:Min:Sec </label>\n                    <input type=\"number\" class\"cycleOnTimeHr\" name=\"cycleOnTimeHr\" step=\"1\" value=\"${this.cycleOnTimeHr}\">\n                    <span class=\"colon\">:</span>   \n                    <input type=\"number\" class\"cycleOnTimeMin\" name=\"cycleOnTimeMin\" step=\"1\" value=\"${this.cycleOnTimeMin}\">\n                    <span class=\"colon\">:</span>   \n                    <input type=\"number\" class\"cycleOnTimeSec\" name=\"cycleOnTimeSec\" step=\"1\" value=\"${this.cycleOnTimeSec}\">\n                </div>\n\n                <div class=\"hr-min-sec-time\">\n                    <label for=\"cycleOffTimeHr\">Cycle Off Time Hr:Min:Sec </label>\n                    <input type=\"number\" class\"cycleOffTimeHr\" name=\"cycleOffTimeHr\" step=\"1\" value=\"${this.cycleOffTimeHr}\">\n                    <span class=\"colon\">:</span>   \n                    <input type=\"number\" class\"cycleOffTimeMin\" name=\"cycleOffTimeMin\" step=\"1\" value=\"${this.cycleOffTimeMin}\">\n                    <span class=\"colon\">:</span>   \n                    <input type=\"number\" class\"cycleOffTimeSec\" name=\"cycleOffTimeSec\" step=\"1\" value=\"${this.cycleOffTimeSec}\">\n                </div>\n\n\n                <label for=\"blackoutStartTime\">Blackout Start Time</label>\n                <input type=\"time\" id\"blackoutStartTime\" name=\"blackoutStartTime\" value=\"${this.blackoutStartTime}\">\n\n                <label for=\"blackoutStopTime\">Blackout Stop Time</label>\n                <input type=\"time\" id\"blackoutStopTime\" name=\"blackoutStopTime\" value=\"${this.blackoutStopTime}\">\n\n                <button type=\"button\" class=\"form-submit\">Submit</button>\n                <button type=\"button\" class=\"form-cancel\">Cancel</button>\n                <button type=\"button\" class=\"form-delete\">Delete</button>\n            </form>\n        `;\n        formElement.innerHTML = form;\n        \n        if (event.target.nextSibling == null || event.target.nextSibling.tagName != \"FORM\") {\n            event.target.insertAdjacentElement(\"afterend\", formElement);\n        } else {\n            event.target.parentNode.removeChild(event.target.nextSibling);\n        }\n        console.log(event.target.nextSibling.tagName);\n        console.log(event.target.parentNode);\n    }\n};\n\n//# sourceURL=webpack:///./src/public/js/cycle-irrigation-device.js?");

/***/ }),

/***/ "./src/public/js/device.js":
/*!*********************************!*\
  !*** ./src/public/js/device.js ***!
  \*********************************/
/*! exports provided: Device */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Device\", function() { return Device; });\nclass Device {\n\n    constructor(id, name, pin, notes) {\n        this.id = id;\n        this.name = name;\n        this.pin = pin;\n        this.notes = notes;\n    }\n\n    /**********************************************************************\n     * add button to list of buttons that are being displayed \n     *********************************************************************/\n    renderBtn() {\n        let btnElement = document.createElement(\"button\");\n        let btnTxt = document.createTextNode(this.name);\n        btnElement.appendChild(btnTxt);\n        //btnElement.setAttribute(\"class\", \"deviceBtn\");\n        btnElement.setAttribute(\"style\", `background-color: ${this.btnColor}`);\n        btnElement.setAttribute(\"class\", `${this.class}`)\n\n        btnElement.addEventListener(\"click\", (event) => {\n            this.renderDeviceSettings(event);\n        });\n\n        document.getElementById(\"main-area\").appendChild(btnElement);\n    }\n};\n\n//# sourceURL=webpack:///./src/public/js/device.js?");

/***/ }),

/***/ "./src/public/js/main.js":
/*!*******************************!*\
  !*** ./src/public/js/main.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cycle_irrigation_device_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cycle-irrigation-device.js */ \"./src/public/js/cycle-irrigation-device.js\");\n\n\nconst addDeviceBtn = document.getElementById(\"drop-btn\");\nconst dropdownContent = document.getElementById(\"dropdown-content\");\n\n//TODO: temporary button to test \ndocument.getElementById(\"make-appear\").addEventListener(\"click\",() => {\n    let button1 = new _cycle_irrigation_device_js__WEBPACK_IMPORTED_MODULE_0__[\"CycleIrrigationDevice\"](2, \"a name\");\n});\n\naddDeviceBtn.addEventListener(\"click\", () => {\n    if (dropdownContent.classList.contains(\"show\")) {\n        dropdownContent.classList.remove(\"show\");\n        dropdownContent.classList.add(\"noshow\");\n    } else {\n        dropdownContent.classList.add(\"show\");\n        dropdownContent.classList.remove(\"noshow\");\n    }\n})\n\n//# sourceURL=webpack:///./src/public/js/main.js?");

/***/ })

/******/ });