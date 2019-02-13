import { Constants } from './../../providers/constants/constants';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility'
import { Platform } from 'ionic-angular';
import 'rxjs/Rx';
import { SettersandgettersProvider } from '../../providers/settersandgetters/settersandgetters';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ServiceRequest } from './../../providers/services/request-handler.service';

/**
 * Generated class for the LoginpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginpage',
  templateUrl: 'loginpage.html',
})
export class LoginpagePage {

  public options: CameraOptions;
  public error: string;
  public loading: boolean;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private utility: UtilityProvider,
    private setAndGet: SettersandgettersProvider,
    private camera: Camera,
    private platform: Platform,
    private service: ServiceRequest) {
    this.error = null;
    this.platform.ready().then(() => {
      this.options = this.getCameraOptions();
    });
  }
  data = {
    userName: ""
  }

  login() {
    if (!this.data.userName) {
      this.utility.presentAlert("Please enter Username!");
      return;
    }
    this.verifyIfFirstTimeLogin();
  }
  getCameraOptions() {
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
      cameraDirection: this.camera.Direction.FRONT
    };
  }

  public analyzeFace(): void {
    this.takePhoto(
      (photo) => {
        this.loading = true;
        this.analyzePhoto(photo);
      },
      () => {
        this.error = `Error: Phone couldn't take the photo.`;
      }
    );
  }


  // Takes a photo and returns it in a callback
  public takePhoto(taken: Function = null, notTaken: Function = null): void {
    this.camera.getPicture(this.options).then((imageData) => {
      const base64Image: string = 'data:image/jpeg;base64,' + imageData;
      if (taken) {
        taken(base64Image);
      }
    }, (e) => {
      if (notTaken) {
        notTaken(e);
      }
    });
  }

  analyzePhoto(image: string) {
    image = image.substring(image.indexOf('base64,') + 'base64,'.length);
    this.service.sendImageToImgur(image).subscribe((imgurRes) => {
      this.loading = false;
      const serialize = (parameters: object) => Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');
      const faceParameters: object = {
        returnFaceId: true,
        returnFaceLandmarks: false,
        returnFaceAttributes: Constants.FACE_ATTRIBUTES
      };
      const serializedFaceParameters: string = serialize(faceParameters);
      this.loading = true;
      this.service.analyzeFaceViaAzure(imgurRes.data.link, serializedFaceParameters).subscribe(azure => {
        this.loading = false;
        if (!sessionStorage.getItem('faceId1')) {
          sessionStorage.setItem('faceId1', azure[0].faceId);
          this.utility.presentAlert('Register Succesful');
          this.navigateToDashBoard();
        }
        const faceId1 = sessionStorage.getItem('faceId1') ? sessionStorage.getItem('faceId1') : '';
        this.service.verifyFaceViaAzure(faceId1, azure[0].faceId).subscribe(verifyRes => {
          if (verifyRes.isIdentical) {
            this.navigateToDashBoard();
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

  register() {
    if (!this.data.userName) {
      this.utility.presentAlert("Please enter Username!");
      return;
    }
    this.analyzeFace();
  }
  verifyIfFirstTimeLogin() {
    if (!sessionStorage.getItem('faceId1')) {
      this.utility.presentAlert('User not found.');
    } else {
      ;
      this.analyzeFace();
    }
  }

  navigateToDashBoard() {
    this.setAndGet.UserName = this.data.userName;
    this.navCtrl.setRoot('DashboardPage');
  }

}