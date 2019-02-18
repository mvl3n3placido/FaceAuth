import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaceLoginPage } from './face-login';

@NgModule({
  declarations: [
    FaceLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(FaceLoginPage),
  ],
})
export class FaceLoginPageModule {}
