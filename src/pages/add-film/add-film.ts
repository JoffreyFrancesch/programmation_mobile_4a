import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import {
  Item
} from "../../models/item/item.model";

import { AngularFireDatabase } from "@angular/fire/database";

@IonicPage()
@Component({
  selector: "page-add-film",
  templateUrl: "add-film.html"
})
export class AddFilmPage {
  
  item: Item = {
    key : null,
    name: "",
    description: "",
    year: null,
    type: "",
    producer: ""
  };

  types = [
    {
      value: "action",
      text: "Action"
    },
    {
      value: "drame",
      text: "Drame"
    },
    {
      value: "comedie",
      text: "Comedie"
    },
    {
      value: "romance",
      text: "Romance"
    },
    {
      value: "animation",
      text: "Animation"
    },
    {
      value: "fantastique",
      text: "Fantastique"
    }
  ];

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddFilmPage");
  }

  addItem(item: Item) {
    this.afDB.list("/film-list").valueChanges().subscribe(data => {
      item.key = data.length;
      console.log(item.key)
    });
    this.afDB.list("/film-list").push(item);
    // this.afDB.object("/film-list/" + item.key).set(item);
    // console.log("Item", item + " push");
  }
}