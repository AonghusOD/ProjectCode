"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/getData";
exports.ids = ["pages/api/getData"];
exports.modules = {

/***/ "(api)/./pages/api/getData.js":
/*!******************************!*\
  !*** ./pages/api/getData.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n// https://nextjs.org/docs/api-routes/introduction\nfunction handler(req, res1) {\n    fetch(\"http://localhost:8000/getNoMessages\", {\n        method: \"POST\"\n    }).then((res)=>res.json()\n    ).then((data)=>{\n        console.log(data);\n        res1.status(200).json(data);\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZ2V0RGF0YS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsa0RBQWtEO0FBRW5DLFNBQVNBLE9BQU8sQ0FBQ0MsR0FBRyxFQUFFQyxJQUFHLEVBQUU7SUFDdENDLEtBQUssQ0FBQyxxQ0FBcUMsRUFBRTtRQUN6Q0MsTUFBTSxFQUFFLE1BQU07S0FDakIsQ0FBQyxDQUNEQyxJQUFJLENBQUMsQ0FBQ0gsR0FBRyxHQUFLQSxHQUFHLENBQUNJLElBQUksRUFBRTtJQUFBLENBQUMsQ0FDekJELElBQUksQ0FBQyxDQUFDRSxJQUFJLEdBQUs7UUFDWkMsT0FBTyxDQUFDQyxHQUFHLENBQUNGLElBQUksQ0FBQztRQUNqQkwsSUFBRyxDQUFDUSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNKLElBQUksQ0FBQ0MsSUFBSSxDQUFDLENBQUM7S0FDOUIsQ0FBQztDQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL2dldERhdGEuanM/MTQzMyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBodHRwczovL25leHRqcy5vcmcvZG9jcy9hcGktcm91dGVzL2ludHJvZHVjdGlvblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XG4gICAgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9nZXROb01lc3NhZ2VzJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJ1xuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihkYXRhKTtcbiAgICB9KVxufVxuIl0sIm5hbWVzIjpbImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJqc29uIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJzdGF0dXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/getData.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/getData.js"));
module.exports = __webpack_exports__;

})();