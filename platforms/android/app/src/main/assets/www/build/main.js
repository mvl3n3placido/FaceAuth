webpackJsonp([3],{

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceRequest; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constants_constants__ = __webpack_require__(293);
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
    ServiceRequest.prototype.getData = function (url) {
        // const options = this.setRequestOptions(token);
        return this.http.get(url);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], ServiceRequest);
    return ServiceRequest;
}());

//# sourceMappingURL=request-handler.service.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaceLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_request_handler_service__ = __webpack_require__(114);
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
 * Generated class for the FaceLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FaceLoginPage = /** @class */ (function () {
    function FaceLoginPage(navCtrl, platform, elRef, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.elRef = elRef;
        this.service = service;
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        this.platform.ready().then(function () {
            _this.faceInitialiazed = false;
        });
    }
    FaceLoginPage.prototype.ionViewDidLoad = function () {
        this.picoJsDetector();
    };
    FaceLoginPage.prototype.picoJsDetector = function () {
        if (this.faceInitialiazed) {
            return;
        }
        var update_memory = pico.instantiate_detection_memory(5); // we will use the detecions of the last 5 frames
        var facefinder_classify_region = function (r, c, s, pixels, ldim) { return -1.0; };
        var cascadeurl = 'https://raw.githubusercontent.com/nenadmarkus/pico/c2e81f9d23cc11d1a612fd21e4f9de0921a5d0d9/rnt/cascades/facefinder';
        fetch(cascadeurl).then(function (response) {
            response.arrayBuffer().then(function (buffer) {
                var bytes = new Int8Array(buffer);
                facefinder_classify_region = pico.unpack_cascade(bytes);
                console.log('* cascade loaded');
            });
        });
        /*
          (2) get the drawing context on the canvas and define a function to transform an RGBA image to grayscale
        */
        var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
        function rgba_to_grayscale(rgba, nrows, ncols) {
            var gray = new Uint8Array(nrows * ncols);
            for (var r = 0; r < nrows; ++r)
                for (var c = 0; c < ncols; ++c)
                    // gray = 0.2*red + 0.7*green + 0.1*blue
                    gray[r * ncols + c] = (2 * rgba[r * 4 * ncols + 4 * c + 0] + 7 * rgba[r * 4 * ncols + 4 * c + 1] + 1 * rgba[r * 4 * ncols + 4 * c + 2]) / 10;
            return gray;
        }
        /*
          (3) this function is called each time a video frame becomes available
        */
        var processfn = function (video, dt) {
            // render the video frame to the canvas element and extract RGBA pixel data
            ctx.drawImage(video, 0, 0);
            var rgba = ctx.getImageData(0, 0, 640, 480).data;
            // prepare input to `run_cascade`
            var image = {
                "pixels": rgba_to_grayscale(rgba, 480, 640),
                "nrows": 480,
                "ncols": 640,
                "ldim": 640
            };
            var params = {
                "shiftfactor": 0.1,
                "minsize": 100,
                "maxsize": 1000,
                "scalefactor": 1.1 // for multiscale processing: resize the detection window by 10% when moving to the higher scale
            };
            // run the cascade over the frame and cluster the obtained detections
            // dets is an array that contains (r, c, s, q) quadruplets
            // (representing row, column, scale and detection score)
            var dets = pico.run_cascade(image, facefinder_classify_region, params);
            dets = update_memory(dets);
            dets = pico.cluster_detections(dets, 0.2); // set IoU threshold to 0.2
            // draw detections
            for (var i = 0; i < dets.length; ++i)
                // check the detection score
                // if it's above the threshold, draw it
                // (the constant 50.0 is empirical: other cascades might require a different one)
                if (dets[i][3] > 50.0) {
                    ctx.beginPath();
                    ctx.arc(dets[i][1], dets[i][0], dets[i][2] / 2, 0, 2 * Math.PI, false);
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = 'red';
                    ctx.stroke();
                }
        };
        /*
          (4) instantiate camera handling (see https://github.com/cbrandolino/camvas)
        */
        new camvas(ctx, processfn);
        /*
          (5) it seems that everything went well
        */
        this.faceInitialiazed = true;
    };
    FaceLoginPage.prototype.convertCanvastoImage = function () {
        this.canvasEl;
        var image = new Image();
        image.src = this.canvasEl.nativeElement.toDataURL("image/jpg");
        return image;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('canvas'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], FaceLoginPage.prototype, "canvasEl", void 0);
    FaceLoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-face-login',template:/*ion-inline-start:"D:\Source Codes\Ionic\FaceAuth\src\pages\face-login\face-login.html"*/'<!-- <ion-header>\n  <ion-navbar>\n    <ion-title>\n      Register Face Id\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div class="demo-frame">\n    <div class="demo-container">\n      <video id="video" width="320" height="240" preload autoplay loop muted></video>\n      <canvas id="canvas" width="320" height="240"></canvas>\n    </div>\n  </div>\n</ion-content> -->\n<ion-content id="video">\n  <div class="ion-canvas">\n    <div><input type="button" value="Start real-time face detection" (click)="picoJsDetector()"></div>\n    <div><canvas #canvas width=640 height=480></canvas></div>\n  </div>\n </ion-content>\n'/*ion-inline-end:"D:\Source Codes\Ionic\FaceAuth\src\pages\face-login\face-login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */],
            __WEBPACK_IMPORTED_MODULE_2__providers_services_request_handler_service__["a" /* ServiceRequest */]])
    ], FaceLoginPage);
    return FaceLoginPage;
}());

//# sourceMappingURL=face-login.js.map

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_constants_constants__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utility_utility__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_settersandgetters_settersandgetters__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_services_request_handler_service__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__face_login_face_login__ = __webpack_require__(150);
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
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, utility, setAndGet, camera, platform, service) {
        var _this = this;
        this.navCtrl = navCtrl;
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
    LoginPage.prototype.login = function () {
        if (!this.data.userName) {
            this.utility.presentAlert("Please enter Username!");
            return;
        }
        this.verifyIfFirstTimeLogin();
    };
    LoginPage.prototype.getCameraOptions = function () {
        return {
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 600,
            targetHeight: 600,
            saveToPhotoAlbum: false,
            allowEdit: true,
            sourceType: this.camera.PictureSourceType.CAMERA,
            correctOrientation: false,
            cameraDirection: this.camera.Direction.FRONT
        };
    };
    LoginPage.prototype.analyzeFace = function () {
        var _this = this;
        this.takePhoto(function (photo) {
            _this.loading = true;
            _this.analyzePhoto(photo);
        }, function () {
            _this.error = "Error: Phone couldn't take the photo.";
        });
    };
    // Takes a photo and returns it in a callback
    LoginPage.prototype.takePhoto = function (taken, notTaken) {
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
    LoginPage.prototype.analyzePhoto = function (image) {
        var _this = this;
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
                if (azure.length === 0) {
                    _this.utility.presentAlert('Please try again.');
                    return;
                }
                if (!sessionStorage.getItem('faceId1') && azure[0].faceId) {
                    sessionStorage.setItem('faceId1', azure[0].faceId);
                    _this.utility.presentAlert('Register Succesful');
                    _this.navigateToDashBoard();
                }
                var faceId1 = sessionStorage.getItem('faceId1') ? sessionStorage.getItem('faceId1') : '';
                _this.service.verifyFaceViaAzure(faceId1, azure[0].faceId).subscribe(function (verifyRes) {
                    if (verifyRes.isIdentical) {
                        _this.navigateToDashBoard();
                    }
                    else {
                        _this.utility.presentAlert("Invalid FaceId!");
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
    LoginPage.prototype.register = function () {
        if (!this.data.userName) {
            this.utility.presentAlert("Please enter Username!");
            return;
        }
        this.analyzeFace();
    };
    LoginPage.prototype.verifyIfFirstTimeLogin = function () {
        // if (!sessionStorage.getItem('faceId1')) {
        //   this.utility.presentAlert('User not found.');
        // } else {
        //   this.analyzeFace();
        // }
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__face_login_face_login__["a" /* FaceLoginPage */]);
    };
    LoginPage.prototype.navigateToDashBoard = function () {
        this.setAndGet.UserName = this.data.userName;
        this.navCtrl.setRoot('DashboardPage');
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-loginpage',template:/*ion-inline-start:"D:\Source Codes\Ionic\FaceAuth\src\pages\loginpage\loginpage.html"*/'<ion-header>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding style="background-color:silver" >\n\n\n\n  <h1>Face Auth <br> Demo App</h1>\n\n  <div class="container">\n\n    <ion-spinner *ngIf="loading" name="dots"></ion-spinner>\n\n    <div *ngIf="error" class="error">\n\n      {{ error }}\n\n    </div>\n\n  </div>\n\n\n\n  <form >\n\n    <div class="container">\n\n      <label><b>Username</b></label>\n\n      <input type="text" placeholder="Enter Username" name="uname" [(ngModel)]="data.userName" required>\n\n\n\n      <button type="submit" (tap)="login();" >Login</button>\n\n      <label>\n\n        <input type="checkbox" checked="checked"> Remember me\n\n      </label>\n\n      <button type="submit" (tap)="register();" >Sign up</button>\n\n    </div>\n\n  </form>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Source Codes\Ionic\FaceAuth\src\pages\loginpage\loginpage.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_utility_utility__["a" /* UtilityProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_settersandgetters_settersandgetters__["a" /* SettersandgettersProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__providers_services_request_handler_service__["a" /* ServiceRequest */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=loginpage.js.map

/***/ }),

/***/ 162:
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
webpackEmptyAsyncContext.id = 162;

/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/dashboard/dashboard.module": [
		681,
		0
	],
	"../pages/face-login/face-login.module": [
		682,
		2
	],
	"../pages/loginpage/loginpage.module": [
		683,
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
webpackAsyncContext.id = 207;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
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
    Constants.PICOJS_CASCADE_URL = "https://raw.githubusercontent.com/nenadmarkus/pico/c2e81f9d23cc11d1a612fd21e4f9de0921a5d0d9/rnt/cascades/facefinder";
    return Constants;
}());

//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilityProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], UtilityProvider);
    return UtilityProvider;
}());

//# sourceMappingURL=utility.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
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
            selector: 'page-home',template:/*ion-inline-start:"D:\Source Codes\Ionic\FaceAuth\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Face Auth Demo App</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-card>\n\n      <ion-card-header>\n\n          <h1 style="text-align: center">Welcome {{ data.name }}</h1>\n\n      </ion-card-header>\n\n      <ion-card-content>\n\n        You have arrived at the future!\n\n      </ion-card-content>\n\n    </ion-card>\n\n\n\n    <br>\n\n\n\n    <ion-card>\n\n        <ion-card-header>\n\n         Features\n\n        </ion-card-header>\n\n\n\n        <ion-list>\n\n          <button ion-item (click)="gotToPage(1)">\n\n            <ion-icon name="md-globe" item-start></ion-icon>\n\n            World Transfers\n\n          </button>\n\n\n\n        </ion-list>\n\n      </ion-card>\n\n</ion-content>\n\n<ion-footer>\n\n    <ion-toolbar>\n\n      <ion-title>Demo 2019.</ion-title>\n\n    </ion-toolbar>\n\n  </ion-footer>\n\n\n\n\n\n'/*ion-inline-end:"D:\Source Codes\Ionic\FaceAuth\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_settersandgetters_settersandgetters__["a" /* SettersandgettersProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(355);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera_preview__ = __webpack_require__(679);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(680);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_list_list__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_loginpage_loginpage__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_face_login_face_login__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_settersandgetters_settersandgetters__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_utility_utility__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_services_request_handler_service__ = __webpack_require__(114);
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
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_loginpage_loginpage__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_face_login_face_login__["a" /* FaceLoginPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/face-login/face-login.module#FaceLoginPageModule', name: 'FaceLoginPage', segment: 'face-login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/loginpage/loginpage.module#LoginpagePageModule', name: 'LoginPage', segment: 'loginpage', priority: 'low', defaultHistory: [] }
                    ]
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_loginpage_loginpage__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_face_login_face_login__["a" /* FaceLoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera_preview__["a" /* CameraPreview */],
                __WEBPACK_IMPORTED_MODULE_15__providers_services_request_handler_service__["a" /* ServiceRequest */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_13__providers_settersandgetters_settersandgetters__["a" /* SettersandgettersProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_utility_utility__["a" /* UtilityProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 680:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_loginpage_loginpage__ = __webpack_require__(151);
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
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_loginpage_loginpage__["a" /* LoginPage */];
        this.initializeApp();
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'List', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] },
            { title: 'Logout', component: null }
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
        if (page.component) {
            this.nav.setRoot(page.component);
        }
        else {
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_loginpage_loginpage__["a" /* LoginPage */]);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Source Codes\Ionic\FaceAuth\src\app\app.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Menu</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-list>\n\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n        {{p.title}}\n\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"D:\Source Codes\Ionic\FaceAuth\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
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

},[350]);
//# sourceMappingURL=main.js.map