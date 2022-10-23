import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterChoferPage } from './register-chofer.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterChoferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterChoferPageRoutingModule {}
