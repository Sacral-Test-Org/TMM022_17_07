// src/app/modules/hpms/hpms.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { PartMasterComponent } from './components/part-master/part-master.component';
import { GroupIdComponent } from './components/group-id/group-id.component';
import { LineIdComponent } from './components/line-id/line-id.component';
import { HpmsService } from './services/hpms.service';

const routes: Routes = [
  { path: 'part-master', component: PartMasterComponent },
  { path: 'group-id', component: GroupIdComponent },
  { path: 'line-id', component: LineIdComponent }
];

@NgModule({
  declarations: [
    PartMasterComponent,
    GroupIdComponent,
    LineIdComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG })
  ],
  providers: [HpmsService]
})
export class HpmsModule { }
