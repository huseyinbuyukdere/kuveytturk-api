(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("kuveytturk-api", [], factory);
	else if(typeof exports === 'object')
		exports["kuveytturk-api"] = factory();
	else
		root["kuveytturk-api"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/apiHelper.js":
/*!**************************!*\
  !*** ./src/apiHelper.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareClientCredentialsRequest = prepareClientCredentialsRequest;
exports.prepareGeneralRequest = prepareGeneralRequest;
exports.prepareFetch = prepareFetch;
exports.sendGeneralGetRequest = sendGeneralGetRequest;
exports.isValidToken = isValidToken;

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

function prepareClientCredentialsRequest(scopeList, clientId, secretId) {
  var request = {
    body: '',
    headers: {}
  };
  var body = {};
  body.grant_type = "client_credentials";
  body.scope = (0, _utils.arrayToString)(scopeList);
  body.client_id = clientId;
  body.client_secret = secretId;
  request.headers = Object.assign({}, request.headers, {
    'Content-Type': _constants.URL_ENCODED_TYPE
  });
  request.body = (0, _utils.JSON_to_URLEncoded)(body);
  return request;
}

function prepareGeneralRequest(token, body, privateKey, query) {
  var request = {
    body: '',
    headers: {}
  };
  request.body = "";

  if (body) {
    request.body = JSON.stringify(body);
  }

  request.headers.Authorization = 'Bearer ' + token;
  request.headers.Signature = (0, _utils.generateSignature)(token, request.body, privateKey, query);
  request.headers = Object.assign({}, request.headers, {
    'Content-Type': 'application/json'
  });
  return request;
}

function prepareFetch(request) {
  if (request.body) {
    return {
      method: 'POST',
      // 'GET', 'PUT', 'DELETE', etc.
      body: request.body,
      // Coordinate the body type with 'Content-Type'
      headers: request.headers
    };
  } else {
    return {
      method: 'GET',
      // 'GET', 'PUT', 'DELETE', etc.            
      headers: request.headers
    };
  }
}

function sendGeneralGetRequest(privateKey, url, getCredentialsToken) {
  new Promise(function (resolve, reject) {
    getCredentialsToken().then(function (token) {
      var body;
      var request = prepareGeneralRequest(token, body, privateKey);
      var fetchBody = prepareFetch(request);
      fetch(url, fetchBody).then(function (response) {
        if (response.status != 200) {
          reject(response.statusText);
        }

        response.json().then(function (data) {
          resolve(data);
        });
      });
    });
  });
}

function isValidToken(token) {
  if (!token) {
    return false;
  }

  var now = Date.now();

  if ((0, _utils.getSecondsBetweenDates)(now, token.receivedTime) < token.expiresIn) {
    return true;
  }
}

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BANK_LIST = exports.KUVEYT_TURK_XTMS = exports.KUVEYT_TURK_ATMS = exports.KUVEYT_TURK_BRANCHES = exports.FX_CURRENCY_RATES = exports.FX_CURRENCY_LIST = exports.CLIENT_CREDENTIALS_URL = exports.API_BASE_URL = exports.IDENTITY_BASE_URL = void 0;
var IDENTITY_BASE_URL = 'https://idprep.kuveytturk.com.tr';
exports.IDENTITY_BASE_URL = IDENTITY_BASE_URL;
var API_BASE_URL = 'https://apitest.kuveytturk.com.tr/prep';
exports.API_BASE_URL = API_BASE_URL;
var CLIENT_CREDENTIALS_URL = IDENTITY_BASE_URL + '/api/connect/token';
exports.CLIENT_CREDENTIALS_URL = CLIENT_CREDENTIALS_URL;
var FX_CURRENCY_LIST = API_BASE_URL + '/v1/data/fecs';
exports.FX_CURRENCY_LIST = FX_CURRENCY_LIST;
var FX_CURRENCY_RATES = API_BASE_URL + '/v1/fx/rates';
exports.FX_CURRENCY_RATES = FX_CURRENCY_RATES;
var KUVEYT_TURK_BRANCHES = API_BASE_URL + '/v1/data/branches';
exports.KUVEYT_TURK_BRANCHES = KUVEYT_TURK_BRANCHES;
var KUVEYT_TURK_ATMS = API_BASE_URL + '/v1/data/atms';
exports.KUVEYT_TURK_ATMS = KUVEYT_TURK_ATMS;
var KUVEYT_TURK_XTMS = API_BASE_URL + '/v1/data/xtms';
exports.KUVEYT_TURK_XTMS = KUVEYT_TURK_XTMS;
var BANK_LIST = API_BASE_URL + '/v1/data/banks';
exports.BANK_LIST = BANK_LIST;

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URL_ENCODED_TYPE = void 0;
var URL_ENCODED_TYPE = "application/x-www-form-urlencoded";
exports.URL_ENCODED_TYPE = URL_ENCODED_TYPE;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "KuveytTurkApi", {
  enumerable: true,
  get: function get() {
    return _kuveytturkApi.default;
  }
});

var _kuveytturkApi = _interopRequireDefault(__webpack_require__(/*! ./kuveytturkApi */ "./src/kuveytturkApi.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/kuveytturkApi.js":
/*!******************************!*\
  !*** ./src/kuveytturkApi.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var Helper = _interopRequireWildcard(__webpack_require__(/*! ./apiHelper */ "./src/apiHelper.js"));

var Config = _interopRequireWildcard(__webpack_require__(/*! ./config */ "./src/config.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CLIENT_ID = '';
var CLIENT_SECRET = ''; //var REDIRECT_URI = '';

var PRIVATE_KEY = '';

var kuveytturkApi =
/*#__PURE__*/
function () {
  function kuveytturkApi(client_id, client_secret, redirect_uri, private_key) {
    _classCallCheck(this, kuveytturkApi);

    CLIENT_ID = client_id;
    CLIENT_SECRET = client_secret; // REDIRECT_URI = redirect_uri;

    PRIVATE_KEY = private_key;
  }

  _createClass(kuveytturkApi, [{
    key: "getCredentialsToken",
    value: function getCredentialsToken() {
      var _this = this;

      if (Helper.isValidToken(this.token)) {
        return new Promise(function (resolve) {
          resolve(_this.token.access_token);
        });
      }

      var scopeList = [];
      scopeList.push('public');
      var request = Helper.prepareClientCredentialsRequest(scopeList, CLIENT_ID, CLIENT_SECRET);
      return new Promise(function (resolve, reject) {
        var fetchBody = Helper.prepareFetch(request);
        fetch(Config.CLIENT_CREDENTIALS_URL, fetchBody).then(function (response) {
          if (response.status != 200) {
            reject(response.statusText);
          }

          response.json().then(function (data) {
            _this.token = {};
            _this.token.access_token = data.access_token;
            _this.token.expiresIn = data.expires_in;
            _this.token.receivedTime = Date.now();
            resolve(data.access_token);
          });
        });
      });
    }
  }, {
    key: "fxCurrencyList",
    value: function fxCurrencyList() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.getCredentialsToken().then(function (token) {
          var body;
          var request = Helper.prepareGeneralRequest(token, body, PRIVATE_KEY);
          var fetchBody = Helper.prepareFetch(request);
          fetch(Config.FX_CURRENCY_LIST, fetchBody).then(function (response) {
            if (response.status != 200) {
              reject(response.statusText);
            }

            response.json().then(function (data) {
              resolve(data);
            });
          });
        });
      });
    }
  }, {
    key: "fxCurrencyRates",
    value: function fxCurrencyRates() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.getCredentialsToken().then(function (token) {
          var body;
          var request = Helper.prepareGeneralRequest(token, body, PRIVATE_KEY);
          var fetchBody = Helper.prepareFetch(request);
          fetch(Config.FX_CURRENCY_RATES, fetchBody).then(function (response) {
            if (response.status != 200) {
              reject(response.statusText);
            }

            response.json().then(function (data) {
              resolve(data);
            });
          });
        });
      });
    }
  }, {
    key: "kuveytTurkBranchList",
    value: function kuveytTurkBranchList() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        _this4.getCredentialsToken().then(function (token) {
          var body;
          var request = Helper.prepareGeneralRequest(token, body, PRIVATE_KEY);
          var fetchBody = Helper.prepareFetch(request);
          fetch(Config.KUVEYT_TURK_BRANCHES, fetchBody).then(function (response) {
            if (response.status != 200) {
              reject(response.statusText);
            }

            response.json().then(function (data) {
              resolve(data);
            });
          });
        });
      });
    }
  }, {
    key: "kuveytTurkAtmList",
    value: function kuveytTurkAtmList() {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        _this5.getCredentialsToken().then(function (token) {
          var body;
          var request = Helper.prepareGeneralRequest(token, body, PRIVATE_KEY);
          var fetchBody = Helper.prepareFetch(request);
          fetch(Config.KUVEYT_TURK_ATMS, fetchBody).then(function (response) {
            if (response.status != 200) {
              reject(response.statusText);
            }

            response.json().then(function (data) {
              resolve(data);
            });
          });
        });
      });
    }
  }, {
    key: "kuveytTurkXtmList",
    value: function kuveytTurkXtmList() {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        _this6.getCredentialsToken().then(function (token) {
          var body;
          var request = Helper.prepareGeneralRequest(token, body, PRIVATE_KEY);
          var fetchBody = Helper.prepareFetch(request);
          fetch(Config.KUVEYT_TURK_XTMS, fetchBody).then(function (response) {
            if (response.status != 200) {
              reject(response.statusText);
            }

            response.json().then(function (data) {
              resolve(data);
            });
          });
        });
      });
    }
  }, {
    key: "bankList",
    value: function bankList() {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        _this7.getCredentialsToken().then(function (token) {
          var body;
          var request = Helper.prepareGeneralRequest(token, body, PRIVATE_KEY);
          var fetchBody = Helper.prepareFetch(request);
          fetch(Config.BANK_LIST, fetchBody).then(function (response) {
            if (response.status != 200) {
              reject(response.statusText);
            }

            response.json().then(function (data) {
              resolve(data);
            });
          });
        });
      });
    }
  }, {
    key: "bankBranchList",
    value: function bankBranchList(bankId, cityId) {
      var _this8 = this;

      var apiUrl = Config.BANK_LIST + '/' + bankId + '/branches';
      var query = '?cityId=' + cityId;
      var fullUrl = apiUrl + query;
      return new Promise(function (resolve, reject) {
        _this8.getCredentialsToken().then(function (token) {
          var body;
          var request = Helper.prepareGeneralRequest(token, body, PRIVATE_KEY, query);
          var fetchBody = Helper.prepareFetch(request);
          fetch(fullUrl, fetchBody).then(function (response) {
            if (response.status != 200) {
              reject(response.statusText);
            }

            response.json().then(function (data) {
              resolve(data);
            });
          });
        });
      });
    }
  }]);

  return kuveytturkApi;
}();

exports.default = kuveytturkApi;

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayToString = arrayToString;
exports.JSON_to_URLEncoded = JSON_to_URLEncoded;
exports.generateSignature = generateSignature;
exports.getSecondsBetweenDates = getSecondsBetweenDates;

var crypto = _interopRequireWildcard(__webpack_require__(/*! crypto */ "crypto"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function arrayToString(list) {
  var result = '';
  list.forEach(function (item) {
    result += item + ' ';
  });
  result = result.substr(0, result.length - 1);
  return result;
}

function JSON_to_URLEncoded(element, key, list) {
  list = list || [];

  if (_typeof(element) == 'object') {
    for (var idx in element) {
      JSON_to_URLEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list);
    }
  } else {
    list.push(key + '=' + encodeURIComponent(element));
  }

  return list.join('&');
}

function generateSignature(token, body, privateKey, query) {
  var encryptedText = token + body;

  if (query) {
    encryptedText += query;
  }

  var sign = crypto.createSign('RSA-SHA256');
  sign.write(encryptedText);
  sign.end();
  var signature = sign.sign(privateKey, 'base64');
  return signature;
}

function getSecondsBetweenDates(date1, date2) {
  if (date1 > date2) {
    return (date1 - date2) / 1000;
  }

  return (date2 - date1) / 1000;
}

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9rdXZleXR0dXJrLWFwaS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8va3V2ZXl0dHVyay1hcGkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8va3V2ZXl0dHVyay1hcGkvLi9zcmMvYXBpSGVscGVyLmpzIiwid2VicGFjazovL2t1dmV5dHR1cmstYXBpLy4vc3JjL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly9rdXZleXR0dXJrLWFwaS8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8va3V2ZXl0dHVyay1hcGkvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8va3V2ZXl0dHVyay1hcGkvLi9zcmMva3V2ZXl0dHVya0FwaS5qcyIsIndlYnBhY2s6Ly9rdXZleXR0dXJrLWFwaS8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly9rdXZleXR0dXJrLWFwaS9leHRlcm5hbCBcImNyeXB0b1wiIl0sIm5hbWVzIjpbInByZXBhcmVDbGllbnRDcmVkZW50aWFsc1JlcXVlc3QiLCJzY29wZUxpc3QiLCJjbGllbnRJZCIsInNlY3JldElkIiwicmVxdWVzdCIsImJvZHkiLCJoZWFkZXJzIiwiZ3JhbnRfdHlwZSIsInNjb3BlIiwiY2xpZW50X2lkIiwiY2xpZW50X3NlY3JldCIsIk9iamVjdCIsImFzc2lnbiIsInByZXBhcmVHZW5lcmFsUmVxdWVzdCIsInRva2VuIiwicHJpdmF0ZUtleSIsInF1ZXJ5IiwiSlNPTiIsInN0cmluZ2lmeSIsIkF1dGhvcml6YXRpb24iLCJTaWduYXR1cmUiLCJwcmVwYXJlRmV0Y2giLCJtZXRob2QiLCJzZW5kR2VuZXJhbEdldFJlcXVlc3QiLCJ1cmwiLCJnZXRDcmVkZW50aWFsc1Rva2VuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ0aGVuIiwiZmV0Y2hCb2R5IiwiZmV0Y2giLCJyZXNwb25zZSIsInN0YXR1cyIsInN0YXR1c1RleHQiLCJqc29uIiwiZGF0YSIsImlzVmFsaWRUb2tlbiIsIm5vdyIsIkRhdGUiLCJyZWNlaXZlZFRpbWUiLCJleHBpcmVzSW4iLCJJREVOVElUWV9CQVNFX1VSTCIsIkFQSV9CQVNFX1VSTCIsIkNMSUVOVF9DUkVERU5USUFMU19VUkwiLCJGWF9DVVJSRU5DWV9MSVNUIiwiRlhfQ1VSUkVOQ1lfUkFURVMiLCJLVVZFWVRfVFVSS19CUkFOQ0hFUyIsIktVVkVZVF9UVVJLX0FUTVMiLCJLVVZFWVRfVFVSS19YVE1TIiwiQkFOS19MSVNUIiwiVVJMX0VOQ09ERURfVFlQRSIsIkNMSUVOVF9JRCIsIkNMSUVOVF9TRUNSRVQiLCJQUklWQVRFX0tFWSIsImt1dmV5dHR1cmtBcGkiLCJyZWRpcmVjdF91cmkiLCJwcml2YXRlX2tleSIsIkhlbHBlciIsImFjY2Vzc190b2tlbiIsInB1c2giLCJDb25maWciLCJleHBpcmVzX2luIiwiYmFua0lkIiwiY2l0eUlkIiwiYXBpVXJsIiwiZnVsbFVybCIsImFycmF5VG9TdHJpbmciLCJsaXN0IiwicmVzdWx0IiwiZm9yRWFjaCIsIml0ZW0iLCJzdWJzdHIiLCJsZW5ndGgiLCJKU09OX3RvX1VSTEVuY29kZWQiLCJlbGVtZW50Iiwia2V5IiwiaWR4IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsImdlbmVyYXRlU2lnbmF0dXJlIiwiZW5jcnlwdGVkVGV4dCIsInNpZ24iLCJjcnlwdG8iLCJjcmVhdGVTaWduIiwid3JpdGUiLCJlbmQiLCJzaWduYXR1cmUiLCJnZXRTZWNvbmRzQmV0d2VlbkRhdGVzIiwiZGF0ZTEiLCJkYXRlMiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztB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QUssR0FBQ0MsS0FBUCxJQUFjLElBQXJCO0FBQ0g7O0FBRUQsU0FBTyxDQUFDQSxLQUFLLEdBQUNELEtBQVAsSUFBYyxJQUFyQjtBQUNILEM7Ozs7Ozs7Ozs7O0FDaERELG1DIiwiZmlsZSI6Imt1dmV5dHR1cmstYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJrdXZleXR0dXJrLWFwaVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJrdXZleXR0dXJrLWFwaVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJrdXZleXR0dXJrLWFwaVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIlxyXG5pbXBvcnQgeyBhcnJheVRvU3RyaW5nLCBKU09OX3RvX1VSTEVuY29kZWQsIGdlbmVyYXRlU2lnbmF0dXJlICwgZ2V0U2Vjb25kc0JldHdlZW5EYXRlcyB9IGZyb20gJy4vdXRpbHMnO1xyXG5pbXBvcnQgeyBVUkxfRU5DT0RFRF9UWVBFfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJlcGFyZUNsaWVudENyZWRlbnRpYWxzUmVxdWVzdChzY29wZUxpc3QsIGNsaWVudElkLCBzZWNyZXRJZCkge1xyXG4gICAgdmFyIHJlcXVlc3QgPSB7XHJcbiAgICAgICAgYm9keTogJycsXHJcbiAgICAgICAgaGVhZGVyczoge31cclxuICAgIH07XHJcbiAgICB2YXIgYm9keSA9IHt9O1xyXG4gICAgYm9keS5ncmFudF90eXBlID0gXCJjbGllbnRfY3JlZGVudGlhbHNcIjtcclxuICAgIGJvZHkuc2NvcGUgPSBhcnJheVRvU3RyaW5nKHNjb3BlTGlzdCk7XHJcbiAgICBib2R5LmNsaWVudF9pZCA9IGNsaWVudElkO1xyXG4gICAgYm9keS5jbGllbnRfc2VjcmV0ID0gc2VjcmV0SWQ7XHJcbiAgICByZXF1ZXN0LmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCByZXF1ZXN0LmhlYWRlcnMgLCB7J0NvbnRlbnQtVHlwZSc6IFVSTF9FTkNPREVEX1RZUEV9KVxyXG4gICAgcmVxdWVzdC5ib2R5ID0gSlNPTl90b19VUkxFbmNvZGVkKGJvZHkpO1xyXG4gICAgcmV0dXJuIHJlcXVlc3Q7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmVwYXJlR2VuZXJhbFJlcXVlc3QodG9rZW4sYm9keSxwcml2YXRlS2V5LHF1ZXJ5KVxyXG57XHJcbiAgICB2YXIgcmVxdWVzdCA9IHtcclxuICAgICAgICBib2R5IDogJycsXHJcbiAgICAgICAgaGVhZGVyczoge31cclxuICAgIH07XHJcbiAgICByZXF1ZXN0LmJvZHkgPSBcIlwiO1xyXG4gICAgaWYoYm9keSlcclxuICAgIHtcclxuICAgICAgICByZXF1ZXN0LmJvZHkgPSBKU09OLnN0cmluZ2lmeShib2R5KTtcclxuICAgIH1cclxuICAgIHJlcXVlc3QuaGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnK3Rva2VuO1xyXG4gICAgcmVxdWVzdC5oZWFkZXJzLlNpZ25hdHVyZSA9IGdlbmVyYXRlU2lnbmF0dXJlKHRva2VuLHJlcXVlc3QuYm9keSxwcml2YXRlS2V5LHF1ZXJ5KTsgICAgXHJcbiAgICByZXF1ZXN0LmhlYWRlcnMgPSBPYmplY3QuYXNzaWduKHt9LCByZXF1ZXN0LmhlYWRlcnMsIHtcclxuICAgICAgICAnQ29udGVudC1UeXBlJyA6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gcmVxdWVzdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByZXBhcmVGZXRjaChyZXF1ZXN0KSB7XHJcbiAgICBpZiAocmVxdWVzdC5ib2R5KSB7XHJcblxyXG4gICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJywgLy8gJ0dFVCcsICdQVVQnLCAnREVMRVRFJywgZXRjLlxyXG4gICAgICAgICAgICBib2R5OiByZXF1ZXN0LmJvZHksIC8vIENvb3JkaW5hdGUgdGhlIGJvZHkgdHlwZSB3aXRoICdDb250ZW50LVR5cGUnXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHJlcXVlc3QuaGVhZGVyc1xyXG4gICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJywgLy8gJ0dFVCcsICdQVVQnLCAnREVMRVRFJywgZXRjLiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBoZWFkZXJzOiByZXF1ZXN0LmhlYWRlcnMsXHJcbiAgICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2VuZEdlbmVyYWxHZXRSZXF1ZXN0KHByaXZhdGVLZXksdXJsLGdldENyZWRlbnRpYWxzVG9rZW4pXHJcbntcclxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBnZXRDcmVkZW50aWFsc1Rva2VuKCkudGhlbigodG9rZW4pID0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYm9keTtcclxuICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSBwcmVwYXJlR2VuZXJhbFJlcXVlc3QodG9rZW4sYm9keSxwcml2YXRlS2V5KTtcclxuICAgICAgICAgICAgdmFyIGZldGNoQm9keSA9IHByZXBhcmVGZXRjaChyZXF1ZXN0KTtcclxuICAgICAgICAgICAgZmV0Y2godXJsLCBmZXRjaEJvZHkpLlxyXG4gICAgICAgICAgICAgICAgdGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkVG9rZW4odG9rZW4pXHJcbntcclxuICAgIGlmKCF0b2tlbilcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcclxuICAgIGlmKGdldFNlY29uZHNCZXR3ZWVuRGF0ZXMobm93LHRva2VuLnJlY2VpdmVkVGltZSk8dG9rZW4uZXhwaXJlc0luKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IElERU5USVRZX0JBU0VfVVJMID0gJ2h0dHBzOi8vaWRwcmVwLmt1dmV5dHR1cmsuY29tLnRyJztcclxuZXhwb3J0IGNvbnN0IEFQSV9CQVNFX1VSTCA9ICdodHRwczovL2FwaXRlc3Qua3V2ZXl0dHVyay5jb20udHIvcHJlcCc7XHJcbmV4cG9ydCBjb25zdCBDTElFTlRfQ1JFREVOVElBTFNfVVJMID0gSURFTlRJVFlfQkFTRV9VUkwgKyAnL2FwaS9jb25uZWN0L3Rva2VuJztcclxuZXhwb3J0IGNvbnN0IEZYX0NVUlJFTkNZX0xJU1QgPSBBUElfQkFTRV9VUkwgKyAnL3YxL2RhdGEvZmVjcyc7XHJcbmV4cG9ydCBjb25zdCBGWF9DVVJSRU5DWV9SQVRFUyA9IEFQSV9CQVNFX1VSTCArICcvdjEvZngvcmF0ZXMnO1xyXG5leHBvcnQgY29uc3QgS1VWRVlUX1RVUktfQlJBTkNIRVMgPSBBUElfQkFTRV9VUkwgKyAnL3YxL2RhdGEvYnJhbmNoZXMnO1xyXG5leHBvcnQgY29uc3QgS1VWRVlUX1RVUktfQVRNUyA9IEFQSV9CQVNFX1VSTCArICcvdjEvZGF0YS9hdG1zJztcclxuZXhwb3J0IGNvbnN0IEtVVkVZVF9UVVJLX1hUTVMgPSBBUElfQkFTRV9VUkwgKyAnL3YxL2RhdGEveHRtcyc7XHJcbmV4cG9ydCBjb25zdCBCQU5LX0xJU1QgPSBBUElfQkFTRV9VUkwgKyAnL3YxL2RhdGEvYmFua3MnO1xyXG5cclxuIiwiXHJcbmV4cG9ydCBjb25zdCBVUkxfRU5DT0RFRF9UWVBFPSBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiOyIsImltcG9ydCBLdXZleXRUdXJrQXBpIGZyb20gJy4va3V2ZXl0dHVya0FwaSc7XHJcbmV4cG9ydCB7IEt1dmV5dFR1cmtBcGkgfTtcclxuIiwiaW1wb3J0ICogYXMgSGVscGVyIGZyb20gJy4vYXBpSGVscGVyJ1xyXG5pbXBvcnQgKiBhcyBDb25maWcgZnJvbSAnLi9jb25maWcnO1xyXG5cclxudmFyIENMSUVOVF9JRCA9ICcnO1xyXG52YXIgQ0xJRU5UX1NFQ1JFVCA9ICcnO1xyXG4vL3ZhciBSRURJUkVDVF9VUkkgPSAnJztcclxudmFyIFBSSVZBVEVfS0VZID0gJyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBrdXZleXR0dXJrQXBpIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjbGllbnRfaWQsIGNsaWVudF9zZWNyZXQsIHJlZGlyZWN0X3VyaSwgcHJpdmF0ZV9rZXkpIHtcclxuICAgICAgICBDTElFTlRfSUQgPSBjbGllbnRfaWQ7XHJcbiAgICAgICAgQ0xJRU5UX1NFQ1JFVCA9IGNsaWVudF9zZWNyZXQ7XHJcbiAgICAgICAvLyBSRURJUkVDVF9VUkkgPSByZWRpcmVjdF91cmk7XHJcbiAgICAgICAgUFJJVkFURV9LRVkgPSBwcml2YXRlX2tleTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldENyZWRlbnRpYWxzVG9rZW4oKSB7XHJcbiAgICAgICAgaWYoSGVscGVyLmlzVmFsaWRUb2tlbih0aGlzLnRva2VuKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4geyByZXNvbHZlKHRoaXMudG9rZW4uYWNjZXNzX3Rva2VuKX0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzY29wZUxpc3QgPSBbXTtcclxuICAgICAgICBzY29wZUxpc3QucHVzaCgncHVibGljJyk7XHJcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBIZWxwZXIucHJlcGFyZUNsaWVudENyZWRlbnRpYWxzUmVxdWVzdChzY29wZUxpc3QsIENMSUVOVF9JRCwgQ0xJRU5UX1NFQ1JFVCk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdmFyIGZldGNoQm9keSA9IEhlbHBlci5wcmVwYXJlRmV0Y2gocmVxdWVzdCk7XHJcbiAgICAgICAgICAgIGZldGNoKENvbmZpZy5DTElFTlRfQ1JFREVOVElBTFNfVVJMLCBmZXRjaEJvZHkpLlxyXG4gICAgICAgICAgICAgICAgdGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW4gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbi5hY2Nlc3NfdG9rZW4gPSBkYXRhLmFjY2Vzc190b2tlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbi5leHBpcmVzSW49IGRhdGEuZXhwaXJlc19pblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRva2VuLnJlY2VpdmVkVGltZSA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YS5hY2Nlc3NfdG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZnhDdXJyZW5jeUxpc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZXRDcmVkZW50aWFsc1Rva2VuKCkudGhlbigodG9rZW4pID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBib2R5O1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSBIZWxwZXIucHJlcGFyZUdlbmVyYWxSZXF1ZXN0KHRva2VuLGJvZHksUFJJVkFURV9LRVkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZldGNoQm9keSA9IEhlbHBlci5wcmVwYXJlRmV0Y2gocmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICBmZXRjaChDb25maWcuRlhfQ1VSUkVOQ1lfTElTVCwgZmV0Y2hCb2R5KS5cclxuICAgICAgICAgICAgICAgICAgICB0aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlLnN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBmeEN1cnJlbmN5UmF0ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZXRDcmVkZW50aWFsc1Rva2VuKCkudGhlbigodG9rZW4pID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBib2R5O1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSBIZWxwZXIucHJlcGFyZUdlbmVyYWxSZXF1ZXN0KHRva2VuLGJvZHksUFJJVkFURV9LRVkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZldGNoQm9keSA9IEhlbHBlci5wcmVwYXJlRmV0Y2gocmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICBmZXRjaChDb25maWcuRlhfQ1VSUkVOQ1lfUkFURVMsIGZldGNoQm9keSkuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXNwb25zZS5zdGF0dXNUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5qc29uKCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAga3V2ZXl0VHVya0JyYW5jaExpc3QoKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q3JlZGVudGlhbHNUb2tlbigpLnRoZW4oKHRva2VuKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYm9keTtcclxuICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gSGVscGVyLnByZXBhcmVHZW5lcmFsUmVxdWVzdCh0b2tlbixib2R5LFBSSVZBVEVfS0VZKTtcclxuICAgICAgICAgICAgICAgIHZhciBmZXRjaEJvZHkgPSBIZWxwZXIucHJlcGFyZUZldGNoKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgZmV0Y2goQ29uZmlnLktVVkVZVF9UVVJLX0JSQU5DSEVTLCBmZXRjaEJvZHkpLlxyXG4gICAgICAgICAgICAgICAgICAgIHRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGt1dmV5dFR1cmtBdG1MaXN0KClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldENyZWRlbnRpYWxzVG9rZW4oKS50aGVuKCh0b2tlbikgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJvZHk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVxdWVzdCA9IEhlbHBlci5wcmVwYXJlR2VuZXJhbFJlcXVlc3QodG9rZW4sYm9keSxQUklWQVRFX0tFWSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZmV0Y2hCb2R5ID0gSGVscGVyLnByZXBhcmVGZXRjaChyZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIGZldGNoKENvbmZpZy5LVVZFWVRfVFVSS19BVE1TLCBmZXRjaEJvZHkpLlxyXG4gICAgICAgICAgICAgICAgICAgIHRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBrdXZleXRUdXJrWHRtTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZXRDcmVkZW50aWFsc1Rva2VuKCkudGhlbigodG9rZW4pID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBib2R5O1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSBIZWxwZXIucHJlcGFyZUdlbmVyYWxSZXF1ZXN0KHRva2VuLGJvZHksUFJJVkFURV9LRVkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZldGNoQm9keSA9IEhlbHBlci5wcmVwYXJlRmV0Y2gocmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICBmZXRjaChDb25maWcuS1VWRVlUX1RVUktfWFRNUywgZmV0Y2hCb2R5KS5cclxuICAgICAgICAgICAgICAgICAgICB0aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlLnN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBiYW5rTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZXRDcmVkZW50aWFsc1Rva2VuKCkudGhlbigodG9rZW4pID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBib2R5O1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlcXVlc3QgPSBIZWxwZXIucHJlcGFyZUdlbmVyYWxSZXF1ZXN0KHRva2VuLGJvZHksUFJJVkFURV9LRVkpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGZldGNoQm9keSA9IEhlbHBlci5wcmVwYXJlRmV0Y2gocmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICBmZXRjaChDb25maWcuQkFOS19MSVNULCBmZXRjaEJvZHkpLlxyXG4gICAgICAgICAgICAgICAgICAgIHRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGJhbmtCcmFuY2hMaXN0KGJhbmtJZCwgY2l0eUlkKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBhcGlVcmwgPSBDb25maWcuQkFOS19MSVNUICsgJy8nK2JhbmtJZCsnL2JyYW5jaGVzJztcclxuICAgICAgICB2YXIgcXVlcnkgPSAnP2NpdHlJZD0nK2NpdHlJZDtcclxuICAgICAgICB2YXIgZnVsbFVybCA9IGFwaVVybCArIHF1ZXJ5O1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q3JlZGVudGlhbHNUb2tlbigpLnRoZW4oKHRva2VuKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYm9keTtcclxuICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gSGVscGVyLnByZXBhcmVHZW5lcmFsUmVxdWVzdCh0b2tlbixib2R5LFBSSVZBVEVfS0VZLHF1ZXJ5KTtcclxuICAgICAgICAgICAgICAgIHZhciBmZXRjaEJvZHkgPSBIZWxwZXIucHJlcGFyZUZldGNoKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgZmV0Y2goZnVsbFVybCwgZmV0Y2hCb2R5KS5cclxuICAgICAgICAgICAgICAgICAgICB0aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlLnN0YXR1c1RleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG4iLCJcclxuaW1wb3J0ICAqIGFzIGNyeXB0byBmcm9tICdjcnlwdG8nXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlUb1N0cmluZyhsaXN0KVxyXG57XHJcblxyXG4gICAgdmFyIHJlc3VsdCA9Jyc7XHJcbiAgICBsaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgcmVzdWx0ICs9IGl0ZW0gKyAnICc7XHJcbiAgICB9KTtcclxuICAgIHJlc3VsdCA9IHJlc3VsdC5zdWJzdHIoMCwgcmVzdWx0Lmxlbmd0aC0xKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBKU09OX3RvX1VSTEVuY29kZWQoZWxlbWVudCxrZXksbGlzdCl7XHJcbiAgICBsaXN0ID0gbGlzdCB8fCBbXTtcclxuICAgIGlmKHR5cGVvZihlbGVtZW50KT09J29iamVjdCcpe1xyXG4gICAgICBmb3IgKHZhciBpZHggaW4gZWxlbWVudClcclxuICAgICAgICBKU09OX3RvX1VSTEVuY29kZWQoZWxlbWVudFtpZHhdLGtleT9rZXkrJ1snK2lkeCsnXSc6aWR4LGxpc3QpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGlzdC5wdXNoKGtleSsnPScrZW5jb2RlVVJJQ29tcG9uZW50KGVsZW1lbnQpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBsaXN0LmpvaW4oJyYnKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU2lnbmF0dXJlKHRva2VuLGJvZHkscHJpdmF0ZUtleSxxdWVyeSl7XHJcblxyXG4gICAgdmFyIGVuY3J5cHRlZFRleHQgPSB0b2tlbitib2R5O1xyXG4gICAgaWYocXVlcnkpXHJcbiAgICB7XHJcbiAgICAgICAgZW5jcnlwdGVkVGV4dCArPSBxdWVyeTtcclxuICAgIH1cclxuICAgIHZhciBzaWduID0gY3J5cHRvLmNyZWF0ZVNpZ24oJ1JTQS1TSEEyNTYnKTtcclxuICAgIHNpZ24ud3JpdGUoZW5jcnlwdGVkVGV4dCk7XHJcbiAgICBzaWduLmVuZCgpO1xyXG4gICAgdmFyIHNpZ25hdHVyZSA9IHNpZ24uc2lnbihwcml2YXRlS2V5LCAnYmFzZTY0Jyk7XHJcbiAgICByZXR1cm4gc2lnbmF0dXJlO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlY29uZHNCZXR3ZWVuRGF0ZXMoZGF0ZTEsZGF0ZTIpXHJcbntcclxuICAgIGlmKGRhdGUxPmRhdGUyKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAoZGF0ZTEtZGF0ZTIpLzEwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChkYXRlMi1kYXRlMSkvMTAwMDtcclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==