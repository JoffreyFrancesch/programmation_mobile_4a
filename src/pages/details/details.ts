import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {
  AngularFireDatabase
} from "@angular/fire/database";

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  //getting the item to show more details
  item : Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB : AngularFireDatabase) {
    this.item = navParams.get('data');
  }

  suppItem(key : number){
   const toRemove = this.afDB.object(`/film-list/${key}`);
   toRemove.remove();
   this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
