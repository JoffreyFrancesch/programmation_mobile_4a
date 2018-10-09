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


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase
  ) {
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

    item.key = this.generatePushID();
    //setting custom key
    const toSend = this.afDB.object(`/film-list/${item.key}`);
    //set item into firebase
    toSend.set(item);
    //go back to home page
    this.navCtrl.pop();
  }

  generatePushID = (function () {
    // Modeled after base64 web-safe chars, but ordered by ASCII.
    var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

    // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
    var lastPushTime = 0;

    // We generate 72-bits of randomness which get turned into 12 characters and appended to the
    // timestamp to prevent collisions with other clients.  We store the last characters we
    // generated because in the event of a collision, we'll use those same characters except
    // "incremented" by one.
    var lastRandChars = [];

    return function () {
      var now = new Date().getTime();
      var duplicateTime = (now === lastPushTime);
      lastPushTime = now;

      var timeStampChars = new Array(8);
      for (var i = 7; i >= 0; i--) {
        timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
        // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
        now = Math.floor(now / 64);
      }
      if (now !== 0) throw new Error('We should have converted the entire timestamp.');

      var id = timeStampChars.join('');

      if (!duplicateTime) {
        for (i = 0; i < 12; i++) {
          lastRandChars[i] = Math.floor(Math.random() * 64);
        }
      } else {
        // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
        for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
          lastRandChars[i] = 0;
        }
        lastRandChars[i]++;
      }
      for (i = 0; i < 12; i++) {
        id += PUSH_CHARS.charAt(lastRandChars[i]);
      }
      if (id.length != 20) throw new Error('Length should be 20.');

      return id;
    };
  })();
}