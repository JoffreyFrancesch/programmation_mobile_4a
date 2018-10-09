import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';

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
  item: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase) {
    this.item = navParams.get('data');
  }

  suppItem(key: number) {
    const toRemove = this.afDB.object(`/film-list/${key}`);
    toRemove.remove();
    this.navCtrl.pop();
  }

  changeTitle() {
    //TODO : implement function to change title with an alert
  }

  changeDesc() {
    //TODO : implement function to change description with an alert
  }

  changeProducer() {
    //TODO : implement function to change producer with an alert
  }

  changeYear() {
    //TODO : implement function to change year with an alert
  }

  changeType() {
    //TODO : implement function to change type with an alert
  }

  addField() {
    //TODO : implement function to add a field with an alert
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }
}