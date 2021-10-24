import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {SupplierListComponent} from './supplier-list/supplier-list.component';
import {SupplierFormComponent} from './supplier-form/supplier-form.component';
import {SupplierHttpService} from './service/supplier.http.service';

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
        FormsModule
    ],
    providers: [SupplierHttpService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
