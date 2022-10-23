import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuController, ToastController } from '@ionic/angular';

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
    public menuCtrl: MenuController

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
  {
    if(this.email && this.password)
    {
      this.auth.signIn(this.email, this.password);
    } else{
      this.toast('Por favor, ingresa tu email y tu contraseña.', 'warning');
    }
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
