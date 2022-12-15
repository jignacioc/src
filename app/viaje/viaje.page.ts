import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  destino: string;
  asientos: number;
  valor: number;

  constructor
  (
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) 
  { }

  ngOnInit() {
  }

  async guardar()
  {
    if(this.destino && this.asientos && this.valor){
      const loading = await this.loadingCtrl.create({
        message: 'Guardando...',
        spinner: 'crescent',
        showBackdrop: true
      });
      
      loading.present();

      const viajeId = this.afs.createId();

      this.afs.collection('viaje').doc(viajeId).set({
        'viajeId': viajeId,
        'destino': this.destino,
        'asientos': this.asientos,
        'valor': this.valor,
        'status': '',
        'createdAt': Date.now()
      })
      .then(()=> {
        loading.dismiss();
        this.toast('¡Viaje guardado exitosamente!', 'success');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
      loading.dismiss();
      this.toast(error.message, 'danger')
      })
    }
  } // fin

  async toast(message, status)
  {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'middle',
      duration: 2000
    });
    toast.present()
  }
} 
