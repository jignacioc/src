import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';



@Component({
  selector: 'app-coords',
  templateUrl: './coords.page.html',
  styleUrls: ['./coords.page.scss'],
})
export class CoordsPage implements OnInit {

  private lat;
  private lng;

  constructor
  (
    private geo: Geolocation
  ) { }

  ngOnInit() {
  }

  dondeEstoy(){
    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then((res) => {
      this.lat = res.coords.latitude;
      this.lng = res.coords.longitude;
    });
  }

}
