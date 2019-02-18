import { Constants } from './../../providers/constants/constants';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility'
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
declare var camvas;
declare var pico;
import { ServiceRequest } from './../../providers/services/request-handler.service';

/**
 * Generated class for the FaceLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-face-login',
  templateUrl: 'face-login.html',
})
export class FaceLoginPage {
  public faceInitialiazed: boolean;
  public loading: boolean;
  public externalThis: any;
  public imageCaptured: boolean;
  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private service: ServiceRequest,
    private utility: UtilityProvider
  ) {
    this.loading = false;
    this.imageCaptured = false;
    this.platform.ready().then(() => {
      this.faceInitialiazed = false;
    })
    this.externalThis = this;

  }
  ionViewDidLoad() {
    this.picoJsDetector();
  }

  picoJsDetector() {
    if (this.faceInitialiazed) {
      return;
    }
    const externalThis = this.externalThis;
    const update_memory = pico.instantiate_detection_memory(5); // we will use the detecions of the last 5 frames
    let facefinder_classify_region = function (r, c, s, pixels, ldim) { return -1.0; };
    const cascadeurl = Constants.PICOJS_CASCADE_URL;
    fetch(cascadeurl).then(function (response) {
      response.arrayBuffer().then(function (buffer) {
        var bytes = new Int8Array(buffer);
        facefinder_classify_region = pico.unpack_cascade(bytes);
        console.log('* cascade loaded');
      })
    })
    /*
      (2) get the drawing context on the canvas and define a function to transform an RGBA image to grayscale
    */
    let ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
    /*
      (3) this function is called each time a video frame becomes available
    */
    const processfn = function (video, dt) {
      // render the video frame to the canvas element and extract RGBA pixel data
      ctx.drawImage(video, 0, 0);
      const rgba = ctx.getImageData(0, 0, 640, 480).data;
      let image = {
        "pixels": externalThis.rgba_to_grayscale(rgba, 480, 640),
        "nrows": 480,
        "ncols": 640,
        "ldim": 640
      }
      let params = {
        "shiftfactor": 0.1, // move the detection window by 10% of its size
        "minsize": 100,     // minimum size of a face
        "maxsize": 1000,    // maximum size of a face
        "scalefactor": 1.1  // for multiscale processing: resize the detection window by 10% when moving to the higher scale
      }
      let dets = pico.run_cascade(image, facefinder_classify_region, params);
      dets = update_memory(dets);
      dets = pico.cluster_detections(dets, 0.2); // set IoU threshold to 0.2
      // draw detections
      for (let i = 0; i < dets.length; ++i)
        // if it's above the threshold, draw it
        if (dets[i][3] > 50.0) {
          ctx.beginPath();
          ctx.arc(dets[i][1], dets[i][0], dets[i][2] / 2, 0, 2 * Math.PI, false);
          ctx.lineWidth = 3;
          ctx.strokeStyle = 'green';
          ctx.stroke();
          externalThis.convertCanvastoImage(dets[i][3] > 50.0);
        }

    }
    /*
      (4) instantiate camera handling (see https://github.com/cbrandolino/camvas)
    */
    new camvas(ctx, processfn);
    this.faceInitialiazed = true;
  }

  navigateToDashBoard() {
    this.navCtrl.setRoot('DashboardPage');
  }
   analyzePhoto(image: string) {
    this.imageCaptured = false;
    image = image.substring(image.indexOf('base64,') + 'base64,'.length);
    this.service.sendImageToImgur(image).subscribe((imgurRes) => {
      const serialize = (parameters: object) => Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');
      const faceParameters: object = {
        returnFaceId: true,
        returnFaceLandmarks: false,
        returnFaceAttributes: Constants.FACE_ATTRIBUTES
      };
      const serializedFaceParameters: string = serialize(faceParameters);
      this.service.analyzeFaceViaAzure(imgurRes.data.link, serializedFaceParameters).subscribe(azure => {
        if (azure.length === 0) {
          this.utility.presentAlert('Please try again.');
          return;
        }
        if (!sessionStorage.getItem('faceId1') && azure[0].faceId) {
          sessionStorage.setItem('faceId1', azure[0].faceId);
          this.utility.presentAlert('Register Succesful');
          this.navigateToDashBoard();
          return;
        }
        const faceId1 = sessionStorage.getItem('faceId1') ? sessionStorage.getItem('faceId1') : '';
        this.service.verifyFaceViaAzure(faceId1, azure[0].faceId).subscribe(verifyRes => {
          if (verifyRes.isIdentical) {
            this.navigateToDashBoard();
          } else {
            this.utility.presentAlert("Invalid FaceId!");
            this.navCtrl.pop();
          }
        });
      }, (err) => {
        console.log(err);
        this.loading = false;
      }, () => {
      });
    }, (err) => {
      console.log(err);
      this.loading = false;
    }, () => {
    });
  }
  rgba_to_grayscale(rgba, nrows, ncols) {
    var gray = new Uint8Array(nrows * ncols);
    for (var r = 0; r < nrows; ++r)
      for (var c = 0; c < ncols; ++c)
        // gray = 0.2*red + 0.7*green + 0.1*blue
        gray[r * ncols + c] = (2 * rgba[r * 4 * ncols + 4 * c + 0] + 7 * rgba[r * 4 * ncols + 4 * c + 1] + 1 * rgba[r * 4 * ncols + 4 * c + 2]) / 10;
    return gray;
  }

  convertCanvastoImage(dets) {
    if (!this.imageCaptured && dets) {
      const canvas = <HTMLCanvasElement>document.getElementById('canvas');
      const dataURL = canvas.toDataURL('image/jpeg', 1.0);
      this.analyzePhoto(dataURL);
      this.imageCaptured = true;
    }
  }
}

