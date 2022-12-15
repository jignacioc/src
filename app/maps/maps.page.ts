import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { ViajeService } from '../services/viaje.service';
import { ViajePage } from '../viaje/viaje.page';
import { Viaje } from '../models/viaje';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
  providers: [ViajeService]
})

export class MapsPage implements OnInit {

  map = null;
  viajes: Viaje[];

  /* DIRECTIONS API*/

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  // Duoc UC Vespucio
  origin = { lat: -33.51646, lng: -70.599462 }; /* Duoc UC */

  // Destino
  destination = '';
  
  @ViewChild ('mapElement', {static: false}) mapElement;
  /* */

  lat: any;
  lng: any; 
  
  private latitud;
  private longitud;

  constructor(
    private geo: Geolocation,
    private toastr: ToastController,
    private activeRoute: ActivatedRoute,
    private viajeService: ViajeService
  ) 
  {
    this.dondeEstoy();
  }

  ngOnInit() {
    this.viajeService.getViajes().subscribe(viajes => {
    this.viajes = viajes;
    
  })
  }

  dondeEstoy(){
    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then((res) => {
      this.lat = res.coords.latitude;
      this.lng = res.coords.longitude;
      this.loadMap(this.lat,this.lng);
    });
  }

  loadMap(lt,lg) {

    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    const myLatLng = {lat: lt,lng: lg};
    
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    }); 
  
    this.directionsDisplay.setMap(this.map);

    
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      const marker = {
        position: {
          lat: this.lat,
          lng: this.lng
        },
        title: 'punto uno'
      };
      this.addMarker(marker);
      this.calculateRoute();
    });
  }

  private calculateRoute() {
    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        this.toast('(!) Dirección no encontrada.', 'warning');
      }
    });
    }
  
  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

  async toast(message, status)
  {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'bottom',
      duration: 2000
    });
    toast.present()
  }

}
