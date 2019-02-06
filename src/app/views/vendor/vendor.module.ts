// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { TablesComponent } from './tables.component';

// Components Routing
import { VendorRoutingModule } from './vendor-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VendorRoutingModule
  ],
  declarations: [
    TablesComponent,

  ]
})
export class VendorModule { }
