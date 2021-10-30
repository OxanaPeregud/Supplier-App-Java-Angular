import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Goods} from "../model/goods";
import {SupplierService} from "../service/supplier.service";
import {Mode} from "../enum/mode.enum";

@Component({
    selector: 'app-suppliers-goods-dialog',
    templateUrl: './suppliers-goods-dialog.component.html',
    styleUrls: ['./suppliers-goods-dialog.component.css']
})
export class SuppliersGoodsDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<SuppliersGoodsDialogComponent>,
        private supplierService: SupplierService) {
    }

    public closeClick(): void {
        this.dialogRef.close();
    }

    public getSuppliersGoods(): Goods[] {
        return this.supplierService.getGoods();
    }

    public isNullMode(): boolean {
        return this.supplierService.getMode() == Mode.NULL;
    }
}
