import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Viaje } from '../models/viaje';
import { map } from 'rxjs/operators';

@Injectable()

export class ViajeService {

  viajeCol: AngularFirestoreCollection<Viaje>;
  viajeDoc: AngularFirestoreDocument<Viaje>;
  viajes: Observable<Viaje[]>;
  viaje: Observable<Viaje>; // Viaje singular
  viaje$: any;


  constructor
  (
    private afs: AngularFirestore
  ) 
  {
    this.viajeCol = this.afs.collection('viaje', ref => ref.orderBy('createdAt'));
    this.viajes = this.viajeCol.snapshotChanges().pipe(
      map(action => {
        return action.map(
          a => 
          {
            const data = a.payload.doc.data() as Viaje;
                  data.viajeId =  a.payload.doc.id;
                  return data;
          }
        )
      })
    );
  } // fin del constructor

  getViajes(){
    return this.viajes;
  } // fin de traer lista de viaje

  getViaje(viajeId: any){
    this.viajeDoc = this.afs.doc<Viaje>(' viaje/$(viajeId) ');
    return this.viaje = this.viajeDoc.valueChanges();
  } // fin de traer viaje
}
