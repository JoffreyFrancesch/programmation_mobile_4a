import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Item } from "../../models/item/item.model";

@Injectable()
export class FilmListService {

    private filmListRef = this.db.list<Item>("film-list");
    constructor(private db : AngularFireDatabase){

    }

    getFilmList(){
        return this.filmListRef;
    }

    addItem(item : Item){
        return this.filmListRef.push(item);
    }
}