import {Injectable} from '@angular/core';
import {Supplier} from "../model/supplier";
import {SupplierHttpService} from "./supplier.http.service";
import {Router} from "@angular/router";
import {Mode} from "../enum/mode.enum";
import {Goods} from "../model/goods";

@Injectable({
    providedIn: 'root'
})
export class SupplierService {

    private supplier: Supplier;

    private supplierId: number;

    private mode: Mode;

    private data: Goods[];

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

    public setSupplierId(id: number): void {
        this.supplierId = id;
    }

    public getSupplierId(): number {
        return this.supplierId;
    }

    public setGoods(goods: Goods[]): void {
        this.data = goods;
    }

    public getGoods(): Goods[] {
        return this.data;
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
        if (this.mode == Mode.SEARCH) {
            window.location.reload();
        }
        this.setMode(Mode.READONLY);
        this.router.navigate(["/suppliers"]);
    }
}
