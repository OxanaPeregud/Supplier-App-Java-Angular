import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SupplierListComponent} from './supplier-list/supplier-list.component';
import {SupplierFormComponent} from './supplier-form/supplier-form.component';

const routes: Routes = [
    {path: "suppliers", component: SupplierListComponent},
    {path: "add-supplier", component: SupplierFormComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
