import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@Angular/fire/compat/auth';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor
  (
    private auth: AuthService,
    private router: Router
  ) {}



  logout(){
    this.auth.signOut();
    localStorage.removeItem('estado');
  }

  gotoProfile(){
    this.router.navigate(['/profile']);
  }
}
