webpackJsonp([2],{

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginpagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utility_utility__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_settersandgetters_settersandgetters__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_services_request_handler_service__ = __webpack_require__(304);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the LoginpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginpagePage = /** @class */ (function () {
    function LoginpagePage(navCtrl, navParams, utility, setAndGet, camera, platform, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.utility = utility;
        this.setAndGet = setAndGet;
        this.camera = camera;
        this.platform = platform;
        this.service = service;
        this.data = {
            userName: ""
        };
        this.error = null;
        this.platform.ready().then(function () {
            _this.options = _this.getCameraOptions();
        });
    }
    LoginpagePage.prototype.login = function () {
        if (!this.data.userName) {
            this.utility.presentAlert("Please enter Username!");
            return;
        }
        this.verifyIfFirstTimeLogin();
    };
    LoginpagePage.prototype.getCameraOptions = function () {
        return {
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 600,
            targetHeight: 600,
            saveToPhotoAlbum: false,
            allowEdit: true,
            sourceType: 1,
            correctOrientation: false,
            cameraDirection: 1
        };
    };
    LoginpagePage.prototype.analyzeFace = function () {
        var _this = this;
        this.takePhoto(function (photo) {
            _this.loading = true;
            _this.analyzePhoto(photo);
        }, function () {
            _this.error = "Error: Phone couldn't take the photo.";
        });
    };
    // Takes a photo and returns it in a callback
    LoginpagePage.prototype.takePhoto = function (taken, notTaken) {
        if (taken === void 0) { taken = null; }
        if (notTaken === void 0) { notTaken = null; }
        this.camera.getPicture(this.options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            if (taken) {
                taken(base64Image);
            }
        }, function (e) {
            if (notTaken) {
                notTaken(e);
            }
        });
    };
    LoginpagePage.prototype.analyzePhoto = function (image) {
        var _this = this;
        debugger;
        image = image.substring(image.indexOf('base64,') + 'base64,'.length);
        this.service.sendImageToImgur(image).subscribe(function (imgurRes) {
            _this.loading = false;
            var serialize = function (parameters) { return Object.keys(parameters).map(function (key) { return key + '=' + parameters[key]; }).join('&'); };
            var faceParameters = {
                returnFaceId: true,
                returnFaceLandmarks: false,
                returnFaceAttributes: __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__["a" /* Constants */].FACE_ATTRIBUTES
            };
            var serializedFaceParameters = serialize(faceParameters);
            _this.loading = true;
            _this.service.analyzeFaceViaAzure(imgurRes.data.link, serializedFaceParameters).subscribe(function (azure) {
                _this.loading = false;
                if (!sessionStorage.getItem('faceId1')) {
                    sessionStorage.setItem('faceId1', azure[0].faceId);
                    _this.utility.presentAlert('Register Succesful');
                    return;
                }
                var faceId1 = sessionStorage.getItem('faceId1') ? sessionStorage.getItem('faceId1') : '';
                _this.service.verifyFaceViaAzure(faceId1, azure[0].faceId).subscribe(function (verifyRes) {
                    if (verifyRes.isIdentical) {
                        _this.setAndGet.UserName = _this.data.userName;
                        _this.navCtrl.setRoot('DashboardPage');
                    }
                });
            }, function (err) {
                console.log(err);
                _this.loading = false;
            }, function () {
            });
        }, function (err) {
            console.log(err);
            _this.loading = false;
        }, function () {
        });
    };
    LoginpagePage.prototype.register = function () {
        this.analyzeFace();
    };
    LoginpagePage.prototype.verifyIfFirstTimeLogin = function () {
        if (!sessionStorage.getItem('faceId1')) {
            this.utility.presentAlert('User not found.');
        }
        else {
            ;
            this.analyzeFace();
        }
    };
    LoginpagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-loginpage',template:/*ion-inline-start:"D:\Source Codes\Ionic\FaceAuth\src\pages\loginpage\loginpage.html"*/'<ion-header>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding style="background-color:silver" >\n\n\n\n  <h1 style="text-align: center; margin-top: 10%;font-style:italic; font-family:Cambria; font-size:30px">Face Auth <br> Demo App</h1>\n\n  <div class="container">\n\n    <ion-spinner *ngIf="loading" name="crescent"></ion-spinner>\n\n  </div>\n\n  <div *ngIf="error" class="error">\n\n        {{ error }}\n\n  </div>\n\n  <form style="margin-top: 10%" >\n\n    <div class="container">\n\n      <label><b>Username</b></label>\n\n      <input type="text" placeholder="Enter Username" name="uname" [(ngModel)]="data.userName" required>\n\n\n\n      <button type="submit" (tap)="login();" >Login</button>\n\n      <label>\n\n        <input type="checkbox" checked="checked"> Remember me\n\n      </label>\n\n      <button type="submit" (tap)="register();" >First time Login</button>\n\n    </div>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Source Codes\Ionic\FaceAuth\src\pages\loginpage\loginpage.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__providers_utility_utility__["a" /* UtilityProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_utility_utility__["a" /* UtilityProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__providers_settersandgetters_settersandgetters__["a" /* SettersandgettersProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_settersandgetters_settersandgetters__["a" /* SettersandgettersProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* Platform */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__providers_services_request_handler_service__["a" /* ServiceRequest */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_services_request_handler_service__["a" /* ServiceRequest */]) === "function" && _g || Object])
    ], LoginpagePage);
    return LoginpagePage;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=loginpage.js.map

/***/ }),

/***/ 160:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 160;

/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/dashboard/dashboard.module": [
		680,
		0
	],
	"../pages/loginpage/loginpage.module": [
		681,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 205;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
var newLocal = "\ndata:image/jpeg;base64,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\n    ";
var Constants = /** @class */ (function () {
    function Constants() {
    }
    // Imgur image upload endpoint
    // This is the same for everybody.
    Constants.IMGUR_ENDPOINT = 'https://api.imgur.com/3/image';
    // Imgur client ID
    Constants.IMGUR_CLIENT_ID = 'ee25e6c79b22423';
    // Azure Face API endpoint
    Constants.AZURE_ENDPOINT = 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0';
    // Azure Face API key
    Constants.AZURE_API_KEY = '034211f6b08e4e75ae9285e5fc02c369';
    // temp faceId
    // public static faceId = '0dd308d4-5a06-42d7-9363-42026953b5f6';
    Constants.FACE_ATTRIBUTES = "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise";
    Constants.BASE_64 = newLocal;
    return Constants;
}());

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilityProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI. */
var UtilityProvider = /** @class */ (function () {
    function UtilityProvider(alertCtrl) {
        this.alertCtrl = alertCtrl;
    }
    //Show popup alert
    UtilityProvider.prototype.presentAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: msg,
            buttons: ['Ok']
        });
        alert.present();
    };
    UtilityProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _a || Object])
    ], UtilityProvider);
    return UtilityProvider;
    var _a;
}());

//# sourceMappingURL=utility.js.map

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceRequest; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_constants__ = __webpack_require__(206);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ServiceRequest = /** @class */ (function () {
    function ServiceRequest(http) {
        this.http = http;
    }
    /** post data */
    ServiceRequest.prototype.postData = function (url, body, token) {
        var options = this.setRequestOptions(token);
        return this.http.post(url, body, options).map(function (response) { return response.json(); });
    };
    /** get data */
    ServiceRequest.prototype.getData = function (url, token) {
        var options = this.setRequestOptions(token);
        return this.http.get(url, options).map(function (response) { return response.json(); });
    };
    /** update data */
    ServiceRequest.prototype.putData = function (url, body, token) {
        var options = this.setRequestOptions(token);
        return this.http.put(url, body, options).map(function (response) { return response.json(); });
    };
    /** set request Options */
    ServiceRequest.prototype.setRequestOptions = function (token) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return options;
    };
    ServiceRequest.prototype.sendImageToImgur = function (image) {
        var auth = "Client-ID " + __WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* Constants */].IMGUR_CLIENT_ID;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Authorization': auth
        });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* Constants */].IMGUR_ENDPOINT, image, options).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (response) { return response.json(); }));
    };
    ServiceRequest.prototype.analyzeFaceViaAzure = function (link, serializedFaceParameters) {
        var url = __WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* Constants */].AZURE_ENDPOINT + "/detect?" + serializedFaceParameters;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': __WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* Constants */].AZURE_API_KEY
        });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var payload = JSON.stringify({ 'url': link });
        return this.http.post(url, payload, options).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (response) { return response.json(); }));
    };
    ServiceRequest.prototype.verifyFaceViaAzure = function (faceId1, faceId2) {
        var url = __WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* Constants */].AZURE_ENDPOINT + "/verify";
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': __WEBPACK_IMPORTED_MODULE_3__constants_constants__["a" /* Constants */].AZURE_API_KEY
        });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var payload = {
            'faceId1': faceId1,
            'faceId2': faceId2
        };
        return this.http.post(url, payload, options).pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (response) { return response.json(); }));
    };
    ServiceRequest = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], ServiceRequest);
    return ServiceRequest;
    var _a;
}());

//# sourceMappingURL=request-handler.service.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_settersandgetters_settersandgetters__ = __webpack_require__(86);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, setAndGet) {
        this.navCtrl = navCtrl;
        this.setAndGet = setAndGet;
        this.data = { name: "" };
        console.log(this.setAndGet.UserName);
        this.data.name = this.setAndGet.UserName;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\Source Codes\Ionic\FaceAuth\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Fingerprint Auth Demo App</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-card>\n\n      <ion-card-header>\n\n          <h1 style="text-align: center">Welcome {{ data.name }}</h1>\n\n      </ion-card-header>\n\n      <ion-card-content>\n\n        You have arrived at the future!\n\n      </ion-card-content>\n\n    </ion-card>\n\n\n\n    <br>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n         Features\n\n        </ion-card-header>\n\n      \n\n        <ion-list>\n\n          <button ion-item (click)="gotToPage(1)">\n\n            <ion-icon name="md-globe" item-start></ion-icon>\n\n            World Transfers\n\n          </button>\n\n      \n\n        </ion-list>\n\n      </ion-card>\n\n</ion-content>\n\n<ion-footer>\n\n    <ion-toolbar>\n\n      <ion-title>Demo 2018.</ion-title>\n\n    </ion-toolbar>\n\n  </ion-footer>\n\n\n\n\n\n'/*ion-inline-end:"D:\Source Codes\Ionic\FaceAuth\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_settersandgetters_settersandgetters__["a" /* SettersandgettersProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_settersandgetters_settersandgetters__["a" /* SettersandgettersProvider */]) === "function" && _b || Object])
    ], HomePage);
    return HomePage;
    var _a, _b;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"D:\Source Codes\Ionic\FaceAuth\src\pages\list\list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>List</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n\n      {{item.title}}\n\n      <div class="item-note" item-end>\n\n        {{item.note}}\n\n      </div>\n\n    </button>\n\n  </ion-list>\n\n  <div *ngIf="selectedItem" padding>\n\n    You navigated here from <b>{{selectedItem.title}}</b>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Source Codes\Ionic\FaceAuth\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object])
    ], ListPage);
    return ListPage;
    var ListPage_1, _a, _b;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(354);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_list_list__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_loginpage_loginpage__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_settersandgetters_settersandgetters__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_fingerprint_aio__ = __webpack_require__(679);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_utility_utility__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_services_request_handler_service__ = __webpack_require__(304);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_loginpage_loginpage__["a" /* LoginpagePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/loginpage/loginpage.module#LoginpagePageModule', name: 'LoginpagePage', segment: 'loginpage', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_loginpage_loginpage__["a" /* LoginpagePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_14__providers_services_request_handler_service__["a" /* ServiceRequest */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_11__providers_settersandgetters_settersandgetters__["a" /* SettersandgettersProvider */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_fingerprint_aio__["a" /* FingerprintAIO */],
                __WEBPACK_IMPORTED_MODULE_13__providers_utility_utility__["a" /* UtilityProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 678:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_loginpage_loginpage__ = __webpack_require__(149);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_loginpage_loginpage__["a" /* LoginpagePage */];
        this.initializeApp();
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'List', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]) === "function" && _a || Object)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Source Codes\Ionic\FaceAuth\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Menu</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-list>\n\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n\n\n</ion-menu>\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"D:\Source Codes\Ionic\FaceAuth\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _d || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettersandgettersProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*
  Generated class for the SettersandgettersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var SettersandgettersProvider = /** @class */ (function () {
    function SettersandgettersProvider() {
        console.log('Hello SettersandgettersProvider Provider');
    }
    Object.defineProperty(SettersandgettersProvider.prototype, "UserName", {
        get: function () {
            return this.username;
        },
        set: function (val) {
            this.username = val;
        },
        enumerable: true,
        configurable: true
    });
    SettersandgettersProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], SettersandgettersProvider);
    return SettersandgettersProvider;
}());

//# sourceMappingURL=settersandgetters.js.map

/***/ })

},[349]);
//# sourceMappingURL=main.js.map