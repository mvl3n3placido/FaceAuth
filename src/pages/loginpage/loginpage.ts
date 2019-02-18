import { Constants } from './../../providers/constants/constants';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility/utility'
import { Platform } from 'ionic-angular';
import 'rxjs/Rx';
import { SettersandgettersProvider } from '../../providers/settersandgetters/settersandgetters';
import { ServiceRequest } from './../../providers/services/request-handler.service';
import { FaceLoginPage } from './../face-login/face-login';
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
export class LoginPage {

  public error: string;
  public loading: boolean;
  constructor(
    private navCtrl: NavController,
    private utility: UtilityProvider,
    private setAndGet: SettersandgettersProvider,
    private platform: Platform,
    private service: ServiceRequest) {
    this.error = null;
    this.platform.ready().then(() => {
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
    this.setAndGet.UserName = this.data.userName;
    this.verifyIfFirstTimeLogin();
  }

  register() {
    if (!this.data.userName) {
      this.utility.presentAlert("Please enter Username!");
      return;
    }
    this.setAndGet.UserName = this.data.userName;
    this.navCtrl.push(FaceLoginPage)
  }
  verifyIfFirstTimeLogin() {
    if (!sessionStorage.getItem('faceId1')) {
      this.utility.presentAlert('User not found.');
    }else{
      this.navCtrl.push(FaceLoginPage);
    }
  }
}