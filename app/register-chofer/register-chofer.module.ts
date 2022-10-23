import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterChoferPageRoutingModule } from './register-chofer-routing.module';

import { RegisterChoferPage } from './register-chofer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterChoferPageRoutingModule
  ],
  declarations: [RegisterChoferPage]
})
export class RegisterChoferPageModule {}
