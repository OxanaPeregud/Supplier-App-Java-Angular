import {Injectable} from '@angular/core';
import {Supplier} from "../model/supplier";
import {SupplierHttpService} from "./supplier.http.service";
import {Router} from "@angular/router";
import {Mode} from "../enum/mode.enum";

@Injectable({
    providedIn: 'root'
})
export class SupplierService {

    private supplier: Supplier;

    private supplierId: number;

    private mode: Mode;

    constructor(private supplierHttpService: SupplierHttpService,
                private router: Router) {
    }

    public setSupplierInfo(supplier: Supplier, supplierId: number, mode: Mode): void {
        this.supplier = supplier;
        this.supplierId = supplierId;
        this.mode = mode;
    }

    public getMode(): Mode {
        return this.mode;
    }

    public getSupplier(): Supplier {
        return this.supplier;
    }

    public editSupplier(supplier: Supplier) {
        this.supplierHttpService.editSupplier(supplier, this.supplierId)
            .subscribe(() =>
                this.goToSupplierList());
    }

    private goToSupplierList() {
        this.router.navigate(['/suppliers']);
    }
}
