// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HPMSComponent } from './modules/hpms/hpms.component';
import { GroupIdComponent } from './modules/hpms/components/group-id/group-id.component';
import { LineIdComponent } from './modules/hpms/components/line-id/line-id.component';

const routes: Routes = [
  { path: 'hpms', component: HPMSComponent },
  { path: 'hpms/group-id', component: GroupIdComponent },
  { path: 'hpms/line-id', component: LineIdComponent },
  { path: '', redirectTo: '/hpms', pathMatch: 'full' },
  { path: '**', redirectTo: '/hpms' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }