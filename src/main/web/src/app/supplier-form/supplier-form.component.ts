import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SupplierHttpService} from '../service/supplier.http.service';
import {Supplier} from '../model/supplier';
import {Mode} from "../enum/mode.enum";
import {SupplierService} from "../service/supplier.service";

@Component({
    selector: 'app-supplier-form',
    templateUrl: './supplier-form.component.html',
    styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent {

    public supplier: Supplier;

    public mode: Mode;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private supplierHttpService: SupplierHttpService,
                private supplierService: SupplierService) {
        this.supplier = new Supplier();
    }

    public isEditMode(): boolean {
        return this.supplierService.getMode() == Mode.EDIT;
    }

    public getSupplierName(): string {
        return this.supplierService.getSupplier().name;
    }

    public getSupplierEmail(): string {
        return this.supplierService.getSupplier().email;
    }

    public saveSupplier() {
        this.supplierHttpService.saveSupplier(this.supplier)
            .subscribe(() =>
                this.goToSupplierList());
    }

    public editSupplier() {
        this.supplierService.editSupplier(this.supplier);
    }

    private goToSupplierList() {
        this.router.navigate(['/suppliers']);
    }
}
