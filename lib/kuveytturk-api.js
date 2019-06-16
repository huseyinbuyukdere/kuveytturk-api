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
exports.getClientCredentialsRequest = getClientCredentialsRequest;
exports.getAuthorizationCodeRequest = getAuthorizationCodeRequest;
exports.getRefreshTokenRequest = getRefreshTokenRequest;
exports.getGeneralRequest = getGeneralRequest;
exports.getFetch = getFetch;
exports.getGeneralGetRequest = getGeneralGetRequest;
exports.isValidToken = isValidToken;

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

function getClientCredentialsRequest(scopeList, clientId, secretId) {
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

function getAuthorizationCodeRequest(code, clientId, secretId, redirectUri) {
  var request = {
    body: '',
    headers: {}
  };
  var body = {};
  body.grant_type = "authorization_code";
  body.client_id = clientId;
  body.client_secret = secretId;
  body.redirect_uri = redirectUri;
  body.code = code;
  request.headers = Object.assign({}, request.headers, {
    'Content-Type': _constants.URL_ENCODED_TYPE
  });
  request.body = (0, _utils.JSON_to_URLEncoded)(body);
  return request;
}

function getRefreshTokenRequest(refreshToken, clientId, secretId) {
  var request = {
    body: '',
    headers: {}
  };
  var body = {};
  body.grant_type = "refresh_token";
  body.refresh_token = refreshToken;
  body.client_id = clientId;
  body.client_secret = secretId;
  request.headers = Object.assign({}, request.headers, {
    'Content-Type': _constants.URL_ENCODED_TYPE
  });
  request.body = (0, _utils.JSON_to_URLEncoded)(body);
  return request;
}

function getGeneralRequest(token, body, privateKey, query) {
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

function getFetch(request) {
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

function getGeneralGetRequest(privateKey, url, getCredentialsToken) {
  new Promise(function (resolve, reject) {
    getCredentialsToken().then(function (token) {
      var body;
      var request = getGeneralRequest(token, body, privateKey);
      var fetchBody = getFetch(request);
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
exports.BANK_LIST = exports.KUVEYT_TURK_XTMS = exports.KUVEYT_TURK_ATMS = exports.KUVEYT_TURK_BRANCHES = exports.FX_CURRENCY_RATES = exports.FX_CURRENCY_LIST = exports.AUTHORIZATION_URL = exports.AUTHORIZATIN_FLOW_URL = exports.CLIENT_CREDENTIALS_URL = exports.API_BASE_URL = exports.IDENTITY_BASE_URL = void 0;
var IDENTITY_BASE_URL = 'https://idprep.kuveytturk.com.tr';
exports.IDENTITY_BASE_URL = IDENTITY_BASE_URL;
var API_BASE_URL = 'https://apitest.kuveytturk.com.tr/prep';
exports.API_BASE_URL = API_BASE_URL;
var CLIENT_CREDENTIALS_URL = IDENTITY_BASE_URL + '/api/connect/token';
exports.CLIENT_CREDENTIALS_URL = CLIENT_CREDENTIALS_URL;
var AUTHORIZATIN_FLOW_URL = IDENTITY_BASE_URL + '/api/connect/token';
exports.AUTHORIZATIN_FLOW_URL = AUTHORIZATIN_FLOW_URL;
var AUTHORIZATION_URL = IDENTITY_BASE_URL + '/api/connect/authorize';
exports.AUTHORIZATION_URL = AUTHORIZATION_URL;
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
Object.defineProperty(exports, "KuveytturkApi", {
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

var UtilsHelper = _interopRequireWildcard(__webpack_require__(/*! ./utils */ "./src/utils.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CLIENT_ID = '';
var CLIENT_SECRET = '';
var REDIRECT_URI = '';
var PRIVATE_KEY = '';

var kuveytturkApi =
/*#__PURE__*/
function () {
  function kuveytturkApi(client_id, client_secret, redirect_uri, private_key) {
    _classCallCheck(this, kuveytturkApi);

    CLIENT_ID = client_id;
    CLIENT_SECRET = client_secret;
    REDIRECT_URI = redirect_uri;
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
      var request = Helper.getClientCredentialsRequest(scopeList, CLIENT_ID, CLIENT_SECRET);
      return new Promise(function (resolve, reject) {
        var fetchBody = Helper.getFetch(request);
        fetch(Config.CLIENT_CREDENTIALS_URL, fetchBody).then(function (response) {
          if (response.status != 200) {
            reject(response.statusText);
          } else {
            response.json().then(function (data) {
              _this.token = {};
              _this.token.access_token = data.access_token;
              _this.token.expiresIn = data.expires_in;
              _this.token.receivedTime = Date.now();
              resolve(data.access_token);
            });
          }
        });
      });
    }
  }, {
    key: "getAuthorizationToken",
    value: function getAuthorizationToken(code) {
      var _this2 = this;

      var request = {};

      if (this.authorizedToken && this.authorizedToken.code == code) {
        if (Helper.isValidToken(this.authorizedToken)) {
          return new Promise(function (resolve) {
            resolve(_this2.authorizedToken.access_token);
          });
        }

        request = Helper.getRefreshTokenRequest(this.authorizedToken.refresh_token, CLIENT_ID, CLIENT_SECRET);
      } else {
        request = Helper.getAuthorizationCodeRequest(code, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
      }

      return new Promise(function (resolve, reject) {
        var fetchBody = Helper.getFetch(request);
        fetch(Config.AUTHORIZATIN_FLOW_URL, fetchBody).then(function (response) {
          if (response.status != 200) {
            reject(response.statusText);
          } else {
            response.json().then(function (data) {
              _this2.authorizedToken = {};
              _this2.authorizedToken.access_token = data.access_token;
              _this2.authorizedToken.code = code;
              _this2.authorizedToken.expiresIn = data.expires_in;
              _this2.authorizedToken.receivedTime = Date.now();
              _this2.authorizedToken.refresh_token = data.refresh_token;
              resolve(data.access_token);
            });
          }
        });
      });
    }
  }, {
    key: "fxCurrencyList",
    value: function fxCurrencyList() {
      return this.sendGeneralGetRequest(Config.FX_CURRENCY_LIST);
    }
  }, {
    key: "fxCurrencyRates",
    value: function fxCurrencyRates() {
      return this.sendGeneralGetRequest(Config.FX_CURRENCY_RATES);
    }
  }, {
    key: "kuveytTurkBranchList",
    value: function kuveytTurkBranchList() {
      return this.sendGeneralGetRequest(Config.KUVEYT_TURK_BRANCHES);
    }
  }, {
    key: "kuveytTurkAtmList",
    value: function kuveytTurkAtmList() {
      return this.sendGeneralGetRequest(Config.KUVEYT_TURK_ATMS);
    }
  }, {
    key: "kuveytTurkXtmList",
    value: function kuveytTurkXtmList() {
      return this.sendGeneralGetRequest(Config.KUVEYT_TURK_XTMS);
    }
  }, {
    key: "bankList",
    value: function bankList() {
      return this.sendGeneralGetRequest(Config.BANK_LIST);
    }
  }, {
    key: "bankBranchList",
    value: function bankBranchList(bankId, cityId) {
      var apiUrl = Config.BANK_LIST + '/' + bankId + '/branches';
      var query = '?cityId=' + cityId;
      var fullUrl = apiUrl + query;
      return this.sendGeneralGetRequest(fullUrl, query);
    }
  }, {
    key: "sendGeneralGetRequest",
    value: function sendGeneralGetRequest(url, query) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        _this3.getCredentialsToken().then(function (token) {
          var body;
          var request = Helper.getGeneralRequest(token, body, PRIVATE_KEY, query);
          var fetchBody = Helper.getFetch(request);
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
  }, {
    key: "getAuthorizationUrl",
    value: function getAuthorizationUrl(scopeList, state) {
      var params = {};
      params.client_id = CLIENT_ID;
      params.response_type = 'code', params.redirect_uri = REDIRECT_URI;
      params.state = state;
      params.scope = UtilsHelper.arrayToString(scopeList);
      var fullUrl = UtilsHelper.addParamsToUrl(params, Config.AUTHORIZATION_URL);
      return fullUrl;
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
exports.addParamsToUrl = addParamsToUrl;

var crypto = _interopRequireWildcard(__webpack_require__(/*! crypto */ "crypto"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function arrayToString(list) {
  var result = '';

  if (list) {
    list.forEach(function (item) {
      result += item + ' ';
    });
    result = result.substr(0, result.length - 1);
  }

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

function addParamsToUrl(paramObject, url) {
  var resultUrl = '';

  if (url) {
    resultUrl = url;

    if (paramObject) {
      resultUrl += '?';
      Object.keys(paramObject).forEach(function (key) {
        if (paramObject[key]) {
          resultUrl += key + '=' + paramObject[key];
          resultUrl += '&';
        }
      });
      resultUrl = resultUrl.substr(0, resultUrl.length - 1);
    }
  }

  return resultUrl;
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
//# sourceMappingURL=kuveytturk-api.js.map