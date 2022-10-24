import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


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
})
export class MapsPage implements OnInit {

  map = null;
  
  lat;
  lng; 
  
  private latitud = this.geo.getCurrentPosition({timeout: 10000, enableHighAccuracy: true}).then((res) => { res.coords.latitude;});
  private longitud = this.geo.getCurrentPosition({timeout: 10000, enableHighAccuracy: true}).then((res) => { res.coords.longitude;});;

  constructor(
    private geo: Geolocation
  ) { }

  ngOnInit() {
    this.loadMap();
  }



  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: -33.5172636, lng: -70.5991192};
    
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      const marker = {
        position: {
          lat: -33.5172636,
          lng: -70.5991192
        },
        title: 'punto uno'
      };
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

}
