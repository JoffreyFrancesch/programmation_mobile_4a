import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFilmPage } from './add-film';

@NgModule({
  declarations: [
    AddFilmPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFilmPage),
  ],
})
export class AddFilmPageModule {}
