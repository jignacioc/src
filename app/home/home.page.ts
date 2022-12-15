import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { getElement } from 'ionicons/dist/types/stencil-public-runtime';
import { Viaje } from '../models/viaje';

import { AuthService } from '../services/auth.service';
import { ViajeService } from '../services/viaje.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [ViajeService]
})
export class HomePage implements OnInit{

  user: any;
  viajes: Viaje[];

  constructor
  (
    private auth: AuthService,
    private router: Router,
    private viajeService: ViajeService,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
  )
  {
  }

  ngOnInit(){

    this.auth.user$.subscribe(user => {
      this.user = user;
    })

    this.viajeService.getViajes().subscribe(viajes => {
      this.viajes = viajes;
    })

  }
  ionWillViewEnter(){
    
  }


}
