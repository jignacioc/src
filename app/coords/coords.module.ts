import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoordsPageRoutingModule } from './coords-routing.module';

import { CoordsPage } from './coords.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoordsPageRoutingModule
  ],
  declarations: [CoordsPage]
})
export class CoordsPageModule {}
