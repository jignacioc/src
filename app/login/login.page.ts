import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuController, ToastController } from '@ionic/angular';
import { DatabaseService } from '../database/database.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  email: string;
  password: string;

  constructor
  (
    private auth: AuthService,
    private toastr: ToastController,
    public menuCtrl: MenuController,
    private db: DatabaseService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
   }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }

  login()
  { /*
    if(this.email && this.password)
    {
      this.auth.signIn(this.email, this.password);
    } else{
      this.toast('Por favor, ingresa tu email y tu contraseña.', 'warning');
    } 
    */
    
    const path = 'user';
    const parametro = 'userEmail';
    const condicion = '==';
    const busqueda = this.email;

    this.db.getCollectionQuery<User>(path,parametro,condicion,busqueda).subscribe(res=>{
      if(res){res.forEach((estado) => {
       if(estado.status=='0'){
        alert('No puede ingresar.')
       } else{
        if(this.email && this.password)
        {
          this.auth.signIn(this.email, this.password);
        } else{
          this.toast('Por favor, ingresa tu email y tu contraseña.', 'warning');
        } 
       }
      })}
    })
  }

  async toast(message, status)
  {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    })
    toast.present();
  } // end toast

}
