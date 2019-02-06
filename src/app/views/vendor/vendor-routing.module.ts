import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Vendor'
        },
        children: [
            {
                path: '',
                redirectTo: 'list'
            },


            {
                path: 'list',
                component: TablesComponent,
                data: {
                    title: 'Tables'
                }
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VendorRoutingModule { }
