import {
  Component
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';
import {
  AngularFireDatabase
} from "@angular/fire/database";


@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
   items : Object;

  constructor(public navCtrl: NavController, afDB: AngularFireDatabase) {
    afDB
      .list("/film-list")
      .valueChanges()
      .subscribe(data => {
        this.items = data;
        console.log("items", this.items);
      });
  }

  itemSelected(item: string) {
    console.log("Selected Item", item);
  }
}