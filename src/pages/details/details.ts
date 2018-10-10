import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ActionSheetController
} from "ionic-angular";

import {
  AngularFireDatabase
} from "@angular/fire/database";

import {
  Item
} from "../../models/item/item.model"

import {
  DatePicker
} from "@ionic-native/date-picker";

@IonicPage()
@Component({
  selector: "page-details",
  templateUrl: "details.html"
})
export class DetailsPage {
  //getting the item to show more details
  item: Item;

  types = [{
      value: "action",
      label: "Action"
    },
    {
      value: "drame",
      label: "Drame"
    },
    {
      value: "comedie",
      label: "Comedie"
    },
    {
      value: "romance",
      label: "Romance"
    },
    {
      value: "animation",
      label: "Animation"
    },
    {
      value: "fantastique",
      label: "Fantastique"
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public alertCtrl: AlertController,
    private datePicker: DatePicker,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.item = navParams.get("data");
  }

  suppItem(key: number) {
    const toRemove = this.afDB.object(`/film-list/${key}`);
    toRemove.remove();
    this.navCtrl.pop();
  }

  changeTitle() {
    //TODO : implement function to change title with an alert
    const alert = this.alertCtrl.create({
      title: "Changer le titre",
      message: "veuillez entrer le nouveau titre",
      inputs: [{
        name: "titre",
        placeholder: "Titre"
      }],
      buttons: [{
          text: "Annuler",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Enregistrer",
          handler: data => {
            this.item.name = data.titre;
            this.updateToFirebase(this.item.key);
            console.log(data);
          }
        }
      ]
    });
    alert.present();
  }

  changeDesc() {
    //TODO : implement function to change description with an alert
    const alert = this.alertCtrl.create({
      title: "Changer la description",
      message: "veuillez entrer la nouvelle description",
      inputs: [{
        name: "description",
        placeholder: "Description"
      }],
      buttons: [{
          text: "Annuler",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Enregistrer",
          handler: data => {
            this.item.description = data.description;
            this.updateToFirebase(this.item.key);
            console.log(data);
          }
        }
      ]
    });
    alert.present();
  }

  changeProducer() {
    //TODO : implement function to change producer with an alert
    const alert = this.alertCtrl.create({
      title: "Changer le réalisateur",
      message: "veuillez entrer le nouveau réalisateur",
      inputs: [{
        name: "realisateur",
        placeholder: "Realisateur"
      }],
      buttons: [{
          text: "Annuler",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Enregistrer",
          handler: data => {
            this.item.producer = data.realisateur;
            this.updateToFirebase(this.item.key);
            console.log(data);
          }
        }
      ]
    });
    alert.present();
  }

  changeYear() {
    // //TODO : implement function to change year with an alert
    // this.datePicker.show({
    //   date: new Date('YYYY'),
    //   mode: 'date',
    //   titleText : "Changer l'année",
    //   okText : "Valider",
    //   cancelText : "Annuler",
    //   androidTheme: this.datePicker.ANDROID_THEMES.THEME_TRADITIONAL
    // }).then(
    //   date => console.log('Got date: ', date),
    //   err => console.log('Error occurred while getting date: ', err)
    // );
  }

  changeType() {
    //TODO : implement function to change type with an alert
    const alert = this.alertCtrl.create();
    alert.setTitle("Lightsaber color");

    this.types.forEach(element => {
      alert.addInput({
        type: "radio",
        label: element.label,
        value: element.value
      })
    })

    alert.addButton("Cancel");
    alert.addButton({
      text: "OK",
      handler: data => {
        console.log(data);
        this.item.type = data;
        this.updateToFirebase(this.item.key);
      }
    });
    alert.present();
  }

  addField() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Quel champs voullez vous ajouter ?'
    });
    if (this.item.name == "") {
      actionSheet.addButton({
        text: 'Titre',
        handler: () => {
          this.changeTitle();
        }
      });
    }
    if (this.item.description == "") {
      actionSheet.addButton({
        text: 'Description',
        handler: () => {
          this.changeDesc();
        }
      });
    }
    if (this.item.producer == "") {
      actionSheet.addButton({
        text: 'Réalisateur',
        handler: () => {
          this.changeProducer();
        }
      });
    }
    if (this.item.type == "") {
      actionSheet.addButton({
        text: 'Genre',
        handler: () => {
          this.changeType();
        }
      });
    }
    if (this.item.year == null) {
      actionSheet.addButton({
        text: 'Année',
        handler: () => {
          console.log('Not implemented yet');
        }
      });
    }
    actionSheet.present();
  }

  updateToFirebase(key: string) {
    const toUpdate = this.afDB.object(`/film-list/${key}`);
    toUpdate.update(this.item);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DetailsPage");
  }
}