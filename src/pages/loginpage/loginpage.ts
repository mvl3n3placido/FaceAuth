import { Constants } from './../../providers/constants/constants';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility'
import { Platform } from 'ionic-angular';
// import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
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
  public image: string;
  public loading: boolean;
  public isFirstTimeLogin: boolean;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private utility: UtilityProvider,
    private setAndGet: SettersandgettersProvider,
    private camera: Camera,
    private platform: Platform,
    private service: ServiceRequest) {
      this.isFirstTimeLogin = false;
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
    // else {
    //   //Check if Fingerprint or Face  is available
    //   this.faio.isAvailable()
    //     .then(result => {
    //       console.log(result);
    //       if (result === "finger" || result === "face") {
    //         //Fingerprint or Face Auth is available
    //         console.log("Fingerprint or Face Exist!")
    //         this.faio.show({
    //           clientId: 'DemoBioAuthApp',
    //           clientSecret: 'bioAuthDemo', //Only necessary for Android
    //           disableBackup: true, //Only for Android(optional)
    //           localizedFallbackTitle: 'Use Pin', //Only for iOS
    //           localizedReason: 'Please Authenticate' //Only for iOS
    //         })
    //           .then((result: any) => {
    //             console.log(result);
    //             if (result) {
    //               this.setAndGet.UserName = this.data.userName;
    //               this.navCtrl.setRoot('DashboardPage');
    //             }
    //             else {
    //               //Fingerprint/Face was not successfully verified
    //               this.utility.presentAlert(result);
    //             }
    //           })
    //           .catch((error: any) => {
    //             //Fingerprint/Face was not successfully verified
    //             this.utility.presentAlert(error);
    //           });
    //       }
    //       else {
    //         //Fingerprint or Face Auth is not available
    //         this.utility.presentAlert("Fingerprint/Face Auth is not available on this device!");
    //         console.log("Fingerprint/Face Auth is not available on this device!")
    //       }
    //     })
    // }
    this.analyzeFace();
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
      cameraDirection: 1
    };
  }

  public analyzeFace(): void {
    this.error = null;
    this.takePhoto(
      // If photo was taken
      (photo) => {
        this.image = photo;
        this.loading = true;
        this.sendToImgur(photo);
      },
      // If photo wasn't taken
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

  sendToImgur(image: string) {
    image = image.substring(image.indexOf('base64,') + 'base64,'.length);
    const formData = new FormData();
    formData.append('image', image);
    this.service.sendImageToImgur(image).subscribe((imgurRes) => {
      console.log('imgurRes', imgurRes);
      const serialize = (parameters: object) => Object.keys(parameters).map(key => key + '=' + parameters[key]).join('&');
      const faceParameters: object = {
        returnFaceId: true,
        returnFaceLandmarks: false,
        returnFaceAttributes: Constants.FACE_ATTRIBUTES
      };
      const serializedFaceParameters: string = serialize(faceParameters);
        this.service.analyzeFaceViaAzure(imgurRes.data.link, serializedFaceParameters).subscribe(azure => {
        console.log('azure', azure);
        if(this.isFirstTimeLogin){
          sessionStorage.setItem('faceId1', azure[0].faceId);
        }
        this.loading = false;
        const faceId1 = sessionStorage.getItem('faceId1') ? sessionStorage.getItem('faceId1') : '';
        this.service.verifyFaceViaAzure(faceId1, azure[0].faceId).subscribe(verifyRes => {
          console.log(verifyRes);
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
    this.isFirstTimeLogin = true;
    this.analyzeFace();
  }

}
