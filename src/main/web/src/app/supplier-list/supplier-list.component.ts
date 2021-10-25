import {Component, OnInit} from '@angular/core';
import {Supplier} from '../model/supplier';
import {SupplierHttpService} from '../service/supplier.http.service';
import {Router} from "@angular/router";
import {SupplierService} from "../service/supplier.service";
import {Mode} from "../enum/mode.enum";

@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

    public suppliers: Supplier[];

    private mode: Mode;

    constructor(private supplierHttpService: SupplierHttpService,
                private router: Router,
                private supplierService: SupplierService) {
    }

    public ngOnInit() {
        this.loadSupplierList();
    }

    public editSupplier(supplier: Supplier, id: number) {
        this.goToSupplierForm(supplier, id);
    }

    public deleteSupplier(id: number) {
        this.supplierHttpService.deleteSupplier(id)
            .subscribe(() =>
                this.loadSupplierList());
    }

    private loadSupplierList() {
        this.supplierHttpService.findAllSuppliers()
            .subscribe(response => {
                this.suppliers = response;
            });
    }

    private goToSupplierForm(supplier: Supplier, id: number) {
        this.supplierService.setSupplierInfo(supplier, id, Mode.EDIT);
        this.router.navigate(['/add-supplier']);
    }
}