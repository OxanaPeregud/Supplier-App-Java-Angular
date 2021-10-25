import {Component} from '@angular/core';
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

    public isAddMode(): boolean {
        return this.supplierService.getMode() == Mode.ADD;
    }

    public saveSupplier(): void {
        this.supplierHttpService.saveSupplier(this.supplier)
            .subscribe(() =>
                this.supplierService.goToSupplierList());
    }

    public editSupplier(): void {
        if (this.supplier.name == null) {
            this.supplier.name = this.supplierService.getSupplier().name;
        }
        if (this.supplier.email == null) {
            this.supplier.email = this.supplierService.getSupplier().email;
        }
        if (this.supplier.phone == null) {
            this.supplier.phone = this.supplierService.getSupplier().phone;
        }
        this.supplierService.editSupplier(this.supplier);
    }

    public getSupplierName(): string {
        return this.supplierService.getSupplier().name;
    }

    public getSupplierEmail(): string {
        return this.supplierService.getSupplier().email;
    }

    public getSupplierPhone(): string {
        return this.supplierService.getSupplier().phone;
    }

    public updateSupplierName(name: string) {
        this.supplier.name = name;
    }

    public updateSupplierEmail(email: string) {
        this.supplier.email = email;
    }

    public updateSupplierPhone(phone: string) {
        this.supplier.phone = phone;
    }
}
