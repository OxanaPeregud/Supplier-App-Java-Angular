import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Mode} from "./enum/mode.enum";
import {SupplierService} from "./service/supplier.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public title: string;

    constructor(private router: Router,
                private supplierService: SupplierService) {
        this.title = "Supplier Application";
    }

    public goToSupplierAddForm() {
        this.supplierService.setMode(Mode.ADD);
        this.router.navigate(["/add-supplier"]);
    }

    public goToSupplierList() {
        this.supplierService.goToSupplierList();
    }
}
