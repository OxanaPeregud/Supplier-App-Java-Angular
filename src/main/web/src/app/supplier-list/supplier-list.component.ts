import {Component, OnInit, ViewChild} from '@angular/core';
import {Supplier} from '../model/supplier';
import {SupplierHttpService} from '../service/supplier.http.service';
import {Router} from "@angular/router";
import {SupplierService} from "../service/supplier.service";
import {Mode} from "../enum/mode.enum";
import {SupplierDataSource} from "../class/supplier.datasource";
import {MatPaginator} from "@angular/material/paginator";
import {tap} from "rxjs/operators";

@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

    public suppliers: Supplier[];

    public displayedColumns = ['id', 'name', 'email', 'phone', 'delete', 'edit'];

    public supplierDatasource: SupplierDataSource;

    public pageNumber = 0;

    public pageSize = 10;

    public showFirstLastButtons = true;

    @ViewChild(MatPaginator) private paginator: MatPaginator;

    constructor(private supplierHttpService: SupplierHttpService,
                private router: Router,
                private supplierService: SupplierService) {
    }

    public ngOnInit() {
        this.supplierDatasource = new SupplierDataSource(this.supplierHttpService);
        this.supplierDatasource.loadSuppliers(this.pageNumber, this.pageSize);
    }

    public ngAfterViewInit() {
        this.supplierDatasource.counter$
            .pipe(
                tap((count) => {
                    this.paginator.length = count;
                })
            )
            .subscribe();
        this.paginator.page
            .pipe(
                tap(() => this.loadSuppliers())
            )
            .subscribe();
    }

    public loadSuppliers() {
        this.supplierDatasource.loadSuppliers(this.paginator.pageIndex, this.paginator.pageSize);
    }

    public editSupplier(supplier: Supplier, id: number) {
        this.goToSupplierEditForm(supplier, id);
    }

    public deleteSupplier(id: number) {
        this.supplierHttpService.deleteSupplier(id)
            .subscribe(() =>
                this.supplierDatasource.loadSuppliers(this.pageNumber, this.pageSize));
    }

    private loadSupplierList() {
        this.supplierHttpService.findAllSuppliers()
            .subscribe(response => {
                this.suppliers = response;
            });
    }

    private goToSupplierEditForm(supplier: Supplier, id: number) {
        this.supplierService.setSupplierInfo(supplier, id);
        this.supplierService.setMode(Mode.EDIT);
        this.router.navigate(["/add-supplier"]);
    }
}
