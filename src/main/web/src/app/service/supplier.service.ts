import {Injectable} from '@angular/core';
import {Supplier} from "../model/supplier";
import {SupplierHttpService} from "./supplier.http.service";
import {Router} from "@angular/router";
import {Mode} from "../enum/mode.enum";
import {List} from "../enum/list.enum";

@Injectable({
    providedIn: 'root'
})
export class SupplierService {

    private supplier: Supplier;

    private supplierId: number;

    private mode: Mode;

    private list: List;

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

    public setList(list: List): void {
        this.list = list;
    }

    public getMode(): Mode {
        return this.mode;
    }

    public getList(): List {
        return this.list;
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
        this.setList(List.FULL);
        this.router.navigate(["/suppliers"]);
    }

    public goToSupplierPaginatedList() {
        this.setMode(Mode.READONLY);
        this.setList(List.PAGINATED);
        this.router.navigate(["/suppliers/page"]);
    }
}
