import {Component, OnInit, ViewChild} from '@angular/core';
import {Supplier} from '../model/supplier';
import {SupplierHttpService} from '../service/supplier.http.service';
import {Router} from "@angular/router";
import {SupplierService} from "../service/supplier.service";
import {Mode} from "../enum/mode.enum";
import {SupplierDataSource} from "../class/supplier.datasource";
import {MatPaginator} from "@angular/material/paginator";
import {tap} from "rxjs/operators";
import {List} from "../enum/list.enum";

@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

    public suppliers: Supplier[];

    public displayedColumns = ['id', 'name', 'email', 'phone'];

    public supplierDatasource: SupplierDataSource;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private supplierHttpService: SupplierHttpService,
                private router: Router,
                private supplierService: SupplierService) {
    }

    public ngOnInit() {
        this.loadSupplierList();
        this.supplierDatasource = new SupplierDataSource(this.supplierHttpService);
        this.supplierDatasource.loadSuppliers();
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
                this.loadSupplierList());
    }

    public isFullList(): boolean {
        return this.supplierService.getList() == List.FULL;
    }

    public isPaginatedList(): boolean {
        return this.supplierService.getList() == List.PAGINATED;
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
