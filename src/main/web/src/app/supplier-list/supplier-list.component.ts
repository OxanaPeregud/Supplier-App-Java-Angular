import {Component, OnInit} from '@angular/core';
import {Supplier} from '../model/supplier';
import {SupplierHttpService} from '../service/supplier.http.service';

@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

    public suppliers: Supplier[];

    constructor(private supplierService: SupplierHttpService) {
    }

    public ngOnInit() {
        this.loadSupplierList();
    }

    public delete(id: number) {
        this.supplierService.delete(id)
            .subscribe(() =>
                this.loadSupplierList());
    }

    private loadSupplierList() {
        this.supplierService.findAll()
            .subscribe(response => {
                this.suppliers = response;
            });
    }
}
