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

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})

export class HomePage {
   items : Array<Object>;

  constructor(public navCtrl: NavController, afDB: AngularFireDatabase) {
    afDB
      .list("/film-list")
      .valueChanges()
      .subscribe((data) => {
        this.items = data;
        console.log("items", this.items);
      });
  }

  itemSelected(item: Object) {
    this.navCtrl.push(DetailsPage, {
      data : item
    })
    console.log("Selected Item", item);
  }
}