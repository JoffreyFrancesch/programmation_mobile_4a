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

import {
  AngularFireDatabase
} from "@angular/fire/database";

@IonicPage()
@Component({
  selector: "page-add-film",
  templateUrl: "add-film.html"
})
export class AddFilmPage {
  //item to set into firebase
  item: Item = {
    key: null,
    name: "",
    description: "",
    year: null,
    type: "",
    producer: "",
    src: ""
  };

  //type for movies
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

  //size of items in firebase
  taille: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase
  ) {
    this.taille = navParams.get("taille");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddFilmPage");
  }

  //add item to firebase
  addItem(item: Item) {
    //setting image if url = ""
    if (item.src == "") {
      switch (item.type) {
        case "action":
          item.src = "../assets/imgs/action.png";
          break;
        case "drame":
          item.src = "../assets/imgs/drame.png";
          break;
        case "comedie":
          item.src = "../assets/imgs/comedie.png";
          break;
        case "romance":
          item.src = "../assets/imgs/romance.png";
          break;
        case "animation":
          item.src = "../assets/imgs/animation.png";
          break;
        case "fantastique":
          item.src = "../assets/imgs/fantastique.png";
          break;
        default:
          item.src = "../assets/imgs/default.png";
      }
    }
    item.key = this.taille;
    //setting custom key
    const toSend = this.afDB.object(`/film-list/${item.key}`);
    //set item into firebase
    toSend.set(item);
    //go back to home page
    this.navCtrl.pop();
  }
}