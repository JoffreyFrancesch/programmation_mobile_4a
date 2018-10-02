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
import { FilmListService } from '../../services/film-list/film-list.service';
/**
 * Generated class for the AddFilmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-film',
  templateUrl: 'add-film.html',
})
export class AddFilmPage {

  item: Item = {
    name: '',
    description: '',
    year: undefined,
    type: '',
    producer: '',
  }

  types = [{
    value: "action",
    text: "Action"
  }, {
    value: "drame",
    text: "Drame"
  }, {
    value: "comedie",
    text: "Comedie"
  }, {
    value: "romance",
    text : "Romance"
  }, {
    value: "animation",
    text : "Animation"
  }, {
    value: "fantastique",
    text : "Fantastique"
  }]


  constructor(public navCtrl: NavController, public navParams: NavParams, private films : FilmListService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFilmPage');
  }

  addItem(item : Item){
    this.films.addItem(item).then(ref => {
      console.log(ref.key)
    })
  }

}