import {
  Component
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';
import {
  AngularFireDatabase
} from "@angular/fire/database";

import { Item } from "../../models/item/item.model";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  // items = [
  //   {
  //     name: "Film 1",
  //     description: "Description 1",
  //     src: "./assets/imgs/film1.jpg"
  //   },
  //   {
  //     name: "Film 2",
  //     description: "Description 2",
  //     src: "./assets/imgs/film1.jpg"
  //   },
  //   {
  //     name: "Film 3",
  //     description: "Description 3",
  //     src: "./assets/imgs/film1.jpg"
  //   },
  //   {
  //     name: "Film 4",
  //     description: "Description 4",
  //     src: "./assets/imgs/film1.jpg"
  //   }
  // ];

  items: [];

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