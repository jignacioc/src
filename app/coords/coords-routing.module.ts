import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoordsPage } from './coords.page';

const routes: Routes = [
  {
    path: '',
    component: CoordsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoordsPageRoutingModule {}
