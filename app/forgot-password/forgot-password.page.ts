import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: string;

  constructor
  (
    private afauth: AngularFireAuth,
    private toastr: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  async resetPassword()
  { 
    if(this.email)
    {
      const loading = await this.loadingCtrl.create({
        message: 'Enviando enlace de reestablecimiento...',
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();

      this.afauth.sendPasswordResetEmail(this.email)
      .then(() => {
        loading.dismiss();
        this.toast('Por favor, revisa tu email!', 'success');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.toast(error.message, 'danger');
      })
    
    } else{
      this.toast('Por favor ingresa tu dirección de email.', 'danger');
    }
  } // end of resset password

  async toast(message, status)
  {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });
    toast.present()
  }
}
