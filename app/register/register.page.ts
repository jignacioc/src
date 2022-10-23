import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string;
  email: string;
  phone: string;
  password: string;
  type: string = 'Pasajero';
  
  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) { }

  ngOnInit() {
  }


  async register()
  {
    if(this.name && this.email && this.phone && this.password)
    {
      const loading = await this.loadingCtrl.create({
        message: 'procesando...',
        spinner: 'crescent',
        showBackdrop: true,
        duration: 2000
      });

      loading.present();
      this.afauth.createUserWithEmailAndPassword(this.email, this.password)
      .then((data) => {
        data.user.sendEmailVerification();
        this.afs.collection('user').doc(data.user.uid).set({
          'userId': data.user.uid,
          'userName': this.name,
          'userEmail': this.email,
          'userPhone': this.phone,
          'userType': this.type,
          'createdAt': Date.now()
        })
        .then(() => {
          this.toast('Registro exitoso. Por favor verifica tu email ;)', 'Exitoso');
          this.router.navigate(['/login']);
        })
        .catch(error => {
          loading.dismiss()
          this.toast(error.message, 'danger');
        })
      })
      .catch(error => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      })
    } else{
      this.toast('Por favor completa el formulario entero.', 'warning');
    }
  } //end of register

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
