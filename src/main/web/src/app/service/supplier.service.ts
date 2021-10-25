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

    public setSupplierInfo(supplier: Supplier, supplierId: number): void {
        this.supplier = supplier;
        this.supplierId = supplierId;
    }

    public setMode(mode: Mode): void {
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

    public goToSupplierList() {
        this.setMode(Mode.READONLY);
        this.router.navigate(["/suppliers"]);
    }
}
