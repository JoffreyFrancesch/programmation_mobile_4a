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
    producer: "",
    src : ""
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
    if(item.src == ""){
      switch(item.type){
        case "action" : item.src = "../assets/imgs/action.png"; break;
        case "drame": item.src = "../assets/imgs/drame.png"; break;
        case "comedie": item.src = "../assets/imgs/comedie.png"; break;
        case "romance": item.src = "../assets/imgs/romance.png"; break;
        case "animation": item.src = "../assets/imgs/animation.png"; break;
        case "fantastique": item.src = "../assets/imgs/fantastique.png"; break;
        default : item.src = "../assets/imgs/default.png";
      }
    }
    this.afDB.list("/film-list").valueChanges().subscribe(data => {
      item.key = data.length;
      // console.log(item.key)
    });
    this.afDB.list("/film-list").push(item);
    this.navCtrl.pop();
  }
}