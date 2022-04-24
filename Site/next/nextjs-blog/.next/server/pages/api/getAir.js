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
exports.id = "pages/api/getAir";
exports.ids = ["pages/api/getAir"];
exports.modules = {

/***/ "(api)/./pages/api/getAir.js":
/*!*****************************!*\
  !*** ./pages/api/getAir.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n// https://nextjs.org/docs/api-routes/introduction\nfunction handler(req, res1) {\n    fetch(\"http://localhost:8000/getAir\", {\n        method: \"POST\"\n    }).then((res)=>res.json()\n    ).then((data)=>{\n        //console.log(data)\n        res1.status(200).json(data);\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZ2V0QWlyLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxrREFBa0Q7QUFFbkMsU0FBU0EsT0FBTyxDQUFDQyxHQUFHLEVBQUVDLElBQUcsRUFBRTtJQUN0Q0MsS0FBSyxDQUFDLDhCQUE4QixFQUFFO1FBQ2xDQyxNQUFNLEVBQUUsTUFBTTtLQUNqQixDQUFDLENBQ0RDLElBQUksQ0FBQyxDQUFDSCxHQUFHLEdBQUtBLEdBQUcsQ0FBQ0ksSUFBSSxFQUFFO0lBQUEsQ0FBQyxDQUN6QkQsSUFBSSxDQUFDLENBQUNFLElBQUksR0FBSztRQUNaLG1CQUFtQjtRQUNuQkwsSUFBRyxDQUFDTSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNGLElBQUksQ0FBQ0MsSUFBSSxDQUFDLENBQUM7S0FDOUIsQ0FBQztDQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL2dldEFpci5qcz9mNjQwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL2FwaS1yb3V0ZXMvaW50cm9kdWN0aW9uXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDAwL2dldEFpcicsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCdcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihkYXRhKTtcbiAgICB9KVxufVxuIl0sIm5hbWVzIjpbImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJqc29uIiwiZGF0YSIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/getAir.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/getAir.js"));
module.exports = __webpack_exports__;

})();