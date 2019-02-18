import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';
import { CameraPreview } from '@ionic-native/camera-preview';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/loginpage/loginpage';
import { FaceLoginPage } from './../pages/face-login/face-login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SettersandgettersProvider } from '../providers/settersandgetters/settersandgetters';
import { UtilityProvider } from '../providers/utility/utility';
import { ServiceRequest } from './../providers/services/request-handler.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    FaceLoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    FaceLoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    CameraPreview,
    ServiceRequest,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettersandgettersProvider,
    UtilityProvider
  ]
})
export class AppModule {}
