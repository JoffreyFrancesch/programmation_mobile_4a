import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ActionSheetController,
  ToastController
} from "ionic-angular";

import {
  AngularFireDatabase
} from "@angular/fire/database";

import {
  Item
} from "../../models/item/item.model"

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
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl : ToastController
  ) {
    this.item = navParams.get("data");
  }

  suppItem(key: number) {
    const toRemove = this.afDB.object(`/film-list/${key}`);
    toRemove.remove();
    this.navCtrl.pop();
  }

  changeTitle() {
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
    const alert = this.alertCtrl.create({
      title: "Changer l'année",
      message: "veuillez entrer la nouvelle année ",
      inputs: [{
        name: "annee",
        placeholder: "Annee"
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
          if(Number(data.annee)){
            console.log("OK", Number(data.annee))
            this.item.year = Number(data.annee);
            this.updateToFirebase(this.item.key);
          } else {
            console.log("No")
            const toast = this.toastCtrl.create({
              message:
                "L'année doit uniquement contenir des chiffres",
              duration: 3000,
              position: "top"
            });
            toast.present();
          }
        }
      }
      ]
    });
    alert.present();
  }

  changeType() {
    const alert = this.alertCtrl.create();
    alert.setTitle("Changer le genre");
    alert.setMessage("Veuillez selectioner le nouveau genre du film")
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