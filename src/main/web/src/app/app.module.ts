import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {SupplierListComponent} from './supplier-list/supplier-list.component';
import {SupplierFormComponent} from './supplier-form/supplier-form.component';
import {SupplierHttpService} from './service/supplier.http.service';
import {NgxMaskModule} from "ngx-mask";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
        SupplierListComponent,
        SupplierFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        NgxMaskModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        BrowserAnimationsModule
    ],
    providers: [SupplierHttpService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
