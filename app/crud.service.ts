import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor( private storage: Storage) { 
    //crear el storage para usarlo
    this.init();
    
  }

  //crear el storage
  async init(){
    await this.storage.create();
  }

  //ingresar datos al storage con key

  async agregarConKey(key: string, valor: string){
    await this.storage.set(key, valor);
  }

  //ingresar datos al storage autoincrementalmente

  async agregar(valor:string){
    let id = await this.storage.length() + 1;
    await this.storage.set(id.toString(), valor)
  }

  //rescatar

  async rescatar(key: string){
    return await this.storage.get(key)
  }
  listar(){
    let listado = []
    this.storage.forEach((v,k) => {listado.push(v); })
    return listado;
  }
  eliminar(key: string){
    //ojo como se agrega cada elemento
    this.storage.remove(key)
  }
}
