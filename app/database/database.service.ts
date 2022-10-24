import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection,Query, } from '@angular/fire/compat/firestore/'


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor
  (
    public DataBase: AngularFirestore
  ) { }

  getCollectionQuery<tipo>(path: string, parametro: string, condicion: any, busqueda: string) {
    const collection = this.DataBase.collection<tipo>(path, 
      ref => ref.where( parametro, condicion, busqueda));
    return collection.valueChanges();
  }
}
