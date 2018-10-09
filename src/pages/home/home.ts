import {
  Component
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';
import {
  AngularFireDatabase
} from "@angular/fire/database";

import { DetailsPage } from "../../pages/details/details" 
import { AddFilmPage } from "../../pages/add-film/add-film"

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})

export class HomePage {
  //Array of all items in firebase
   items : Array<Object>;

  constructor(public navCtrl: NavController, afDB: AngularFireDatabase) {
    //getting all items into firebase
    afDB
      .list("/film-list")
      .valueChanges()
      .subscribe((data) => {
        this.items = data;
      });
  }

  //change page to addPage
  addPage(){
    this.navCtrl.push(AddFilmPage);
  }

  //change page to show more details
  itemSelected(item: Object) {
    this.navCtrl.push(DetailsPage, {
      data : item
    })
  }
}