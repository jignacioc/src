import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { type } from 'os';

@Component({
  selector: 'app-register-chofer',
  templateUrl: './register-chofer.page.html',
  styleUrls: ['./register-chofer.page.scss'],
})
export class RegisterChoferPage implements OnInit {

  name: string;
  email: string;
  phone: string;
  car: string;
  patente: string;
  licencia: string;
  type: string = 'Chofer';
  status: string= '0';
  domicilio: string;
  password: string;

  constructor
  (
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) { }

  ngOnInit() {
  } 

  async registerChofer()
  {
    if(this.name && this.email && this.phone && this.car && this.patente && this.password)
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
          'userCar': this.car,
          'userPatente': this.patente,
          'userLicencia': this.licencia,
          'userType': this.type,
          'status': this.status,
          'domicilio': this.domicilio,
          'createdAt': Date.now()
        })
        .then(() => {
          this.toast('¡Registro exitoso! Verifica tu email y espera la validación del administrador.', 'success');
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
 