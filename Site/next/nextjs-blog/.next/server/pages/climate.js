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
exports.id = "pages/climate";
exports.ids = ["pages/climate"];
exports.modules = {

/***/ "./components/climate/getClimateData.js":
/*!**********************************************!*\
  !*** ./components/climate/getClimateData.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-chartjs-2 */ \"react-chartjs-2\");\n/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_chartjs_2__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _getClimateList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getClimateList */ \"./components/climate/getClimateList.js\");\n\n\n\n\nconst GetClimateData = (props)=>{\n    const { items  } = props;\n    const { 0: data1 , 1: setData  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const { 0: isLoading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        setLoading(true);\n        fetch(\"api/getAir\").then((res)=>res.json()\n        ).then((data)=>{\n            const air = [];\n            for(const key in data){\n                const allData = {\n                    id: key,\n                    ...data[key]\n                };\n                console.log(allData);\n                air.push(allData);\n            }\n            //console.log(data)\n            setData(air);\n            //console.log(air)\n            setLoading(false);\n        });\n    }, []);\n    if (isLoading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n        children: \"Loading...\"\n    }, void 0, false, {\n        fileName: \"C:\\\\fsd\\\\next\\\\next-blog\\\\components\\\\climate\\\\getClimateData.js\",\n        lineNumber: 34,\n        columnNumber: 25\n    }, undefined);\n    if (!data1) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n        children: \"No profile data\"\n    }, void 0, false, {\n        fileName: \"C:\\\\fsd\\\\next\\\\next-blog\\\\components\\\\climate\\\\getClimateData.js\",\n        lineNumber: 35,\n        columnNumber: 21\n    }, undefined);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_getClimateList__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                items: data1\n            }, void 0, false, {\n                fileName: \"C:\\\\fsd\\\\next\\\\next-blog\\\\components\\\\climate\\\\getClimateData.js\",\n                lineNumber: 41,\n                columnNumber: 10\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"C:\\\\fsd\\\\next\\\\next-blog\\\\components\\\\climate\\\\getClimateData.js\",\n            lineNumber: 39,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\fsd\\\\next\\\\next-blog\\\\components\\\\climate\\\\getClimateData.js\",\n        lineNumber: 38,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GetClimateData);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2NsaW1hdGUvZ2V0Q2xpbWF0ZURhdGEuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFtRDtBQUNaO0FBQ087QUFFOUMsTUFBTUssY0FBYyxHQUFJLENBQUNDLEtBQUssR0FBSztJQUNqQyxNQUFNLEVBQUVDLEtBQUssR0FBRSxHQUFHRCxLQUFLO0lBQ3ZCLE1BQU0sRUFOUixHQU1TRSxLQUFJLEdBTmIsR0FNZUMsT0FBTyxNQUFJUiwrQ0FBUSxDQUFDLElBQUksQ0FBQztJQUN0QyxNQUFNLEVBUFIsR0FPU1MsU0FBUyxHQVBsQixHQU9vQkMsVUFBVSxNQUFJViwrQ0FBUSxDQUFDLEtBQUssQ0FBQztJQUUvQ0MsZ0RBQVMsQ0FBQyxJQUFNO1FBQ2RTLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDaEJDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FDaEJDLElBQUksQ0FBQyxDQUFDQyxHQUFHLEdBQUtBLEdBQUcsQ0FBQ0MsSUFBSSxFQUFFO1FBQUEsQ0FBQyxDQUN6QkYsSUFBSSxDQUFDLENBQUNMLElBQUksR0FBSztZQUNkLE1BQU1RLEdBQUcsR0FBRyxFQUFFO1lBRWQsSUFBSyxNQUFNQyxHQUFHLElBQUlULElBQUksQ0FBRTtnQkFDdEIsTUFBTVUsT0FBTyxHQUFHO29CQUNkQyxFQUFFLEVBQUVGLEdBQUc7b0JBQ1AsR0FBR1QsSUFBSSxDQUFDUyxHQUFHLENBQUM7aUJBRWI7Z0JBQ0RHLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSCxPQUFPLENBQUM7Z0JBQ3BCRixHQUFHLENBQUNNLElBQUksQ0FBQ0osT0FBTyxDQUFDLENBQUM7YUFDbkI7WUFDRCxtQkFBbUI7WUFDbkJULE9BQU8sQ0FBQ08sR0FBRyxDQUFDO1lBQ1osa0JBQWtCO1lBRWxCTCxVQUFVLENBQUMsS0FBSyxDQUFDO1NBQ2xCLENBQUM7S0FDTCxFQUFFLEVBQUUsQ0FBQztJQUVOLElBQUlELFNBQVMsRUFBRSxxQkFBTyw4REFBQ2EsR0FBQztrQkFBQyxZQUFVOzs7OztpQkFBSTtJQUN2QyxJQUFJLENBQUNmLEtBQUksRUFBRSxxQkFBTyw4REFBQ2UsR0FBQztrQkFBQyxpQkFBZTs7Ozs7aUJBQUk7SUFFeEMscUJBQ0UsOERBQUNDLFNBQU87a0JBQ04sNEVBQUNDLEtBQUc7c0JBRUQsNEVBQUNyQix1REFBYztnQkFBQ0csS0FBSyxFQUFHQyxLQUFJOzs7Ozt5QkFBSTs7Ozs7cUJBRTdCOzs7OztpQkFDRSxDQUNWO0NBQ0g7QUFFRCxpRUFBZUgsY0FBYyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9jbGltYXRlL2dldENsaW1hdGVEYXRhLmpzPzE2ZWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVhY3QsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgTGluZSB9IGZyb20gXCJyZWFjdC1jaGFydGpzLTJcIjtcclxuaW1wb3J0IEdldENsaW1hdGVMaXN0IGZyb20gXCIuL2dldENsaW1hdGVMaXN0XCI7XHJcblxyXG5jb25zdCBHZXRDbGltYXRlRGF0YSAgPSAocHJvcHMpID0+IHtcclxuICBjb25zdCB7IGl0ZW1zIH0gPSBwcm9wcztcclxuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShudWxsKVxyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpXHJcbiAgXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldExvYWRpbmcodHJ1ZSlcclxuICAgIGZldGNoKCdhcGkvZ2V0QWlyJylcclxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICBjb25zdCBhaXIgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgY29uc3QgYWxsRGF0YSA9IHtcclxuICAgICAgICAgICAgaWQ6IGtleSxcclxuICAgICAgICAgICAgLi4uZGF0YVtrZXldXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGFsbERhdGEpXHJcbiAgICAgICAgICBhaXIucHVzaChhbGxEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKVxyXG4gICAgICAgIHNldERhdGEoYWlyKVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coYWlyKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpXHJcbiAgICAgIH0pXHJcbiAgfSwgW10pXHJcblxyXG4gIGlmIChpc0xvYWRpbmcpIHJldHVybiA8cD5Mb2FkaW5nLi4uPC9wPlxyXG4gIGlmICghZGF0YSkgcmV0dXJuIDxwPk5vIHByb2ZpbGUgZGF0YTwvcD5cclxuICBcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgIFxyXG4gICAgICAgICA8R2V0Q2xpbWF0ZUxpc3QgaXRlbXMgPXtkYXRhfSAvPlxyXG4gICAgICAgIFxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHZXRDbGltYXRlRGF0YTsiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIkxpbmUiLCJHZXRDbGltYXRlTGlzdCIsIkdldENsaW1hdGVEYXRhIiwicHJvcHMiLCJpdGVtcyIsImRhdGEiLCJzZXREYXRhIiwiaXNMb2FkaW5nIiwic2V0TG9hZGluZyIsImZldGNoIiwidGhlbiIsInJlcyIsImpzb24iLCJhaXIiLCJrZXkiLCJhbGxEYXRhIiwiaWQiLCJjb25zb2xlIiwibG9nIiwicHVzaCIsInAiLCJzZWN0aW9uIiwiZGl2Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/climate/getClimateData.js\n");

/***/ }),

/***/ "./components/climate/getClimateItem.js":
/*!**********************************************!*\
  !*** ./components/climate/getClimateItem.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ \"./node_modules/bootstrap/dist/css/bootstrap.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_bootstrap_table_next_dist_react_bootstrap_table2_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap-table-next/dist/react-bootstrap-table2.min.css */ \"./node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css\");\n/* harmony import */ var react_bootstrap_table_next_dist_react_bootstrap_table2_min_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_table_next_dist_react_bootstrap_table2_min_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_bootstrap_table_next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap-table-next */ \"react-bootstrap-table-next\");\n/* harmony import */ var react_bootstrap_table_next__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap_table_next__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst columns = [\n    {\n        dataField: \"id\",\n        text: \"Sensor ID\",\n        sort: true\n    },\n    {\n        dataField: \"name\",\n        text: \"Reading\",\n        sort: true\n    },\n    {\n        dataField: \"price\",\n        text: \"Date & Time\"\n    }\n];\nfunction GetClimateItem(props) {\n    const { items  } = props;\n    const products = [\n        {\n            id: \"Temperature\",\n            name: props.TEMP,\n            price: props.TIME\n        },\n        {\n            id: \"Humidity\",\n            name: props.HUM,\n            price: props.TIME\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"App\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((react_bootstrap_table_next__WEBPACK_IMPORTED_MODULE_4___default()), {\n            bootstrap4: true,\n            keyField: \"id\",\n            data: products,\n            columns: columns\n        }, void 0, false, {\n            fileName: \"C:\\\\fsd\\\\next\\\\next-blog\\\\components\\\\climate\\\\getClimateItem.js\",\n            lineNumber: 32,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\fsd\\\\next\\\\next-blog\\\\components\\\\climate\\\\getClimateItem.js\",\n        lineNumber: 31,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GetClimateItem);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2NsaW1hdGUvZ2V0Q2xpbWF0ZUl0ZW0uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFtRDtBQUNUO0FBQzhCO0FBQ2hCO0FBR3hELE1BQU1JLE9BQU8sR0FBRztJQUNkO1FBQ0VDLFNBQVMsRUFBRSxJQUFJO1FBQ2ZDLElBQUksRUFBRSxXQUFXO1FBQ2pCQyxJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0Q7UUFDRUYsU0FBUyxFQUFFLE1BQU07UUFDakJDLElBQUksRUFBRSxTQUFTO1FBQ2ZDLElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRDtRQUNFRixTQUFTLEVBQUUsT0FBTztRQUNsQkMsSUFBSSxFQUFFLGFBQWE7S0FDcEI7Q0FDRjtBQUVELFNBQVNFLGNBQWMsQ0FBQ0MsS0FBSyxFQUFFO0lBQzdCLE1BQU0sRUFBRUMsS0FBSyxHQUFFLEdBQUdELEtBQUs7SUFDdkIsTUFBTUUsUUFBUSxHQUFHO1FBQ2Y7WUFBRUMsRUFBRSxFQUFFLGFBQWE7WUFBRUMsSUFBSSxFQUFFSixLQUFLLENBQUNLLElBQUk7WUFBRUMsS0FBSyxFQUFFTixLQUFLLENBQUNPLElBQUk7U0FBRTtRQUMxRDtZQUFFSixFQUFFLEVBQUUsVUFBVTtZQUFFQyxJQUFJLEVBQUVKLEtBQUssQ0FBQ1EsR0FBRztZQUFFRixLQUFLLEVBQUVOLEtBQUssQ0FBQ08sSUFBSTtTQUFFO0tBQ3ZEO0lBQ0QscUJBQ0UsOERBQUNFLEtBQUc7UUFBQ0MsU0FBUyxFQUFDLEtBQUs7a0JBQ2xCLDRFQUFDaEIsbUVBQWM7WUFDYmlCLFVBQVU7WUFDVkMsUUFBUSxFQUFDLElBQUk7WUFDYkMsSUFBSSxFQUFFWCxRQUFRO1lBQ2RQLE9BQU8sRUFBRUEsT0FBTzs7Ozs7Z0JBQ2hCOzs7OztZQUNFLENBQ047Q0FDSDtBQUNELGlFQUFlSSxjQUFjLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2NsaW1hdGUvZ2V0Q2xpbWF0ZUl0ZW0uanM/OGRhYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgXCJib290c3RyYXAvZGlzdC9jc3MvYm9vdHN0cmFwLmNzc1wiO1xyXG5pbXBvcnQgXCJyZWFjdC1ib290c3RyYXAtdGFibGUtbmV4dC9kaXN0L3JlYWN0LWJvb3RzdHJhcC10YWJsZTIubWluLmNzc1wiO1xyXG5pbXBvcnQgQm9vdHN0cmFwVGFibGUgZnJvbSBcInJlYWN0LWJvb3RzdHJhcC10YWJsZS1uZXh0XCI7XHJcblxyXG5cclxuY29uc3QgY29sdW1ucyA9IFtcclxuICB7XHJcbiAgICBkYXRhRmllbGQ6IFwiaWRcIixcclxuICAgIHRleHQ6IFwiU2Vuc29yIElEXCIsXHJcbiAgICBzb3J0OiB0cnVlXHJcbiAgfSxcclxuICB7XHJcbiAgICBkYXRhRmllbGQ6IFwibmFtZVwiLFxyXG4gICAgdGV4dDogXCJSZWFkaW5nXCIsXHJcbiAgICBzb3J0OiB0cnVlXHJcbiAgfSxcclxuICB7XHJcbiAgICBkYXRhRmllbGQ6IFwicHJpY2VcIixcclxuICAgIHRleHQ6IFwiRGF0ZSAmIFRpbWVcIlxyXG4gIH1cclxuXTtcclxuXHJcbmZ1bmN0aW9uIEdldENsaW1hdGVJdGVtKHByb3BzKSB7XHJcbiAgY29uc3QgeyBpdGVtcyB9ID0gcHJvcHM7XHJcbiAgY29uc3QgcHJvZHVjdHMgPSBbXHJcbiAgICB7IGlkOiBcIlRlbXBlcmF0dXJlXCIsIG5hbWU6IHByb3BzLlRFTVAsIHByaWNlOiBwcm9wcy5USU1FIH0sXHJcbiAgICB7IGlkOiBcIkh1bWlkaXR5XCIsIG5hbWU6IHByb3BzLkhVTSwgcHJpY2U6IHByb3BzLlRJTUUgfVxyXG4gIF07XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiQXBwXCI+XHJcbiAgICAgIDxCb290c3RyYXBUYWJsZVxyXG4gICAgICAgIGJvb3RzdHJhcDRcclxuICAgICAgICBrZXlGaWVsZD1cImlkXCJcclxuICAgICAgICBkYXRhPXtwcm9kdWN0c31cclxuICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBHZXRDbGltYXRlSXRlbTsiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkJvb3RzdHJhcFRhYmxlIiwiY29sdW1ucyIsImRhdGFGaWVsZCIsInRleHQiLCJzb3J0IiwiR2V0Q2xpbWF0ZUl0ZW0iLCJwcm9wcyIsIml0ZW1zIiwicHJvZHVjdHMiLCJpZCIsIm5hbWUiLCJURU1QIiwicHJpY2UiLCJUSU1FIiwiSFVNIiwiZGl2IiwiY2xhc3NOYW1lIiwiYm9vdHN0cmFwNCIsImtleUZpZWxkIiwiZGF0YSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/climate/getClimateItem.js\n");

/***/ }),

/***/ "./components/climate/getClimateList.js":
/*!**********************************************!*\
  !*** ./components/climate/getClimateList.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _getClimateItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getClimateItem */ \"./components/climate/getClimateItem.js\");\n\n\nfunction GetClimateList(props) {\n    const { items  } = props;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n        children: items.map((air)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_getClimateItem__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                PH: air.PH,\n                TDS: air.TDS,\n                LUX: air.LUX,\n                TEMP: air.TEMP,\n                HUM: air.HUM,\n                CO2: air.CO2,\n                HVOC: air.HVOC,\n                TIME: air.TIME\n            }, air._id, false, {\n                fileName: \"C:\\\\fsd\\\\next\\\\next-blog\\\\components\\\\climate\\\\getClimateList.js\",\n                lineNumber: 9,\n                columnNumber: 9\n            }, this)\n        )\n    }, void 0, false, {\n        fileName: \"C:\\\\fsd\\\\next\\\\next-blog\\\\components\\\\climate\\\\getClimateList.js\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GetClimateList);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2NsaW1hdGUvZ2V0Q2xpbWF0ZUxpc3QuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQThDO0FBRTlDLFNBQVNDLGNBQWMsQ0FBQ0MsS0FBSyxFQUFFO0lBQzdCLE1BQU0sRUFBRUMsS0FBSyxHQUFFLEdBQUdELEtBQUs7SUFFdkIscUJBQ0UsOERBQUNFLElBQUU7a0JBQ0FELEtBQUssQ0FBQ0UsR0FBRyxDQUFDLENBQUNDLEdBQUcsaUJBQ2IsOERBQUNOLHVEQUFjO2dCQUViTyxFQUFFLEVBQUVELEdBQUcsQ0FBQ0MsRUFBRTtnQkFDVkMsR0FBRyxFQUFFRixHQUFHLENBQUNFLEdBQUc7Z0JBQ1pDLEdBQUcsRUFBRUgsR0FBRyxDQUFDRyxHQUFHO2dCQUNaQyxJQUFJLEVBQUVKLEdBQUcsQ0FBQ0ksSUFBSTtnQkFDZEMsR0FBRyxFQUFFTCxHQUFHLENBQUNLLEdBQUc7Z0JBQ1pDLEdBQUcsRUFBRU4sR0FBRyxDQUFDTSxHQUFHO2dCQUNaQyxJQUFJLEVBQUVQLEdBQUcsQ0FBQ08sSUFBSTtnQkFDZEMsSUFBSSxFQUFFUixHQUFHLENBQUNRLElBQUk7ZUFSVFIsR0FBRyxDQUFDUyxHQUFHOzs7O29CQVNaO1FBQ0gsQ0FBQzs7Ozs7WUFDQyxDQUNMO0NBQ0g7QUFFRCxpRUFBZWQsY0FBYyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9jbGltYXRlL2dldENsaW1hdGVMaXN0LmpzPzcyNDEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEdldENsaW1hdGVJdGVtIGZyb20gJy4vZ2V0Q2xpbWF0ZUl0ZW0nO1xyXG5cclxuZnVuY3Rpb24gR2V0Q2xpbWF0ZUxpc3QocHJvcHMpIHtcclxuICBjb25zdCB7IGl0ZW1zIH0gPSBwcm9wcztcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDx1bD5cclxuICAgICAge2l0ZW1zLm1hcCgoYWlyKSA9PiAoXHJcbiAgICAgICAgPEdldENsaW1hdGVJdGVtXHJcbiAgICAgICAgICBrZXk9e2Fpci5faWR9XHJcbiAgICAgICAgICBQSD17YWlyLlBIfVxyXG4gICAgICAgICAgVERTPXthaXIuVERTfVxyXG4gICAgICAgICAgTFVYPXthaXIuTFVYfVxyXG4gICAgICAgICAgVEVNUD17YWlyLlRFTVB9XHJcbiAgICAgICAgICBIVU09e2Fpci5IVU19XHJcbiAgICAgICAgICBDTzI9e2Fpci5DTzJ9XHJcbiAgICAgICAgICBIVk9DPXthaXIuSFZPQ31cclxuICAgICAgICAgIFRJTUU9e2Fpci5USU1FfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkpfVxyXG4gICAgPC91bD5cclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHZXRDbGltYXRlTGlzdDsiXSwibmFtZXMiOlsiR2V0Q2xpbWF0ZUl0ZW0iLCJHZXRDbGltYXRlTGlzdCIsInByb3BzIiwiaXRlbXMiLCJ1bCIsIm1hcCIsImFpciIsIlBIIiwiVERTIiwiTFVYIiwiVEVNUCIsIkhVTSIsIkNPMiIsIkhWT0MiLCJUSU1FIiwiX2lkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/climate/getClimateList.js\n");

/***/ }),

/***/ "./pages/climate.js":
/*!**************************!*\
  !*** ./pages/climate.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Climate)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_climate_getClimateData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/climate/getClimateData */ \"./components/climate/getClimateData.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction Climate() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"Climate Readings\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\fsd\\\\next\\\\next-blog\\\\pages\\\\climate.js\",\n                    lineNumber: 8,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\fsd\\\\next\\\\next-blog\\\\pages\\\\climate.js\",\n                lineNumber: 7,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_climate_getClimateData__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\fsd\\\\next\\\\next-blog\\\\pages\\\\climate.js\",\n                lineNumber: 10,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9jbGltYXRlLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQWlFO0FBQ3JDO0FBRWIsU0FBU0UsT0FBTyxHQUFHO0lBQ2hDLHFCQUNFOzswQkFDRSw4REFBQ0Qsa0RBQUk7MEJBQ0gsNEVBQUNFLE9BQUs7OEJBQUMsa0JBQWdCOzs7Ozt3QkFBUTs7Ozs7b0JBQzFCOzBCQUNQLDhEQUFDSCwwRUFBYzs7OztvQkFBRzs7b0JBQ2pCLENBQ0o7Q0FDRiIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2VzL2NsaW1hdGUuanM/MDcwZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2V0Q2xpbWF0ZURhdGEgZnJvbSAnLi4vY29tcG9uZW50cy9jbGltYXRlL2dldENsaW1hdGVEYXRhJ1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDbGltYXRlKCkge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPHRpdGxlPkNsaW1hdGUgUmVhZGluZ3M8L3RpdGxlPlxuICAgICAgPC9IZWFkPlxuICAgICAgPEdldENsaW1hdGVEYXRhIC8+XG4gICAgPC8+XG4gIClcbn1cbiJdLCJuYW1lcyI6WyJHZXRDbGltYXRlRGF0YSIsIkhlYWQiLCJDbGltYXRlIiwidGl0bGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/climate.js\n");

/***/ }),

/***/ "./node_modules/bootstrap/dist/css/bootstrap.css":
/*!*******************************************************!*\
  !*** ./node_modules/bootstrap/dist/css/bootstrap.css ***!
  \*******************************************************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css":
/*!*************************************************************************************!*\
  !*** ./node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css ***!
  \*************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-bootstrap-table-next":
/*!*********************************************!*\
  !*** external "react-bootstrap-table-next" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-bootstrap-table-next");

/***/ }),

/***/ "react-chartjs-2":
/*!**********************************!*\
  !*** external "react-chartjs-2" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-chartjs-2");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/climate.js"));
module.exports = __webpack_exports__;

})();