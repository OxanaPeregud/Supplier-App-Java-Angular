import {Component, OnInit, ViewChild} from '@angular/core';
import {Supplier} from '../model/supplier';
import {SupplierHttpService} from '../service/supplier.http.service';
import {Router} from "@angular/router";
import {SupplierService} from "../service/supplier.service";
import {Mode} from "../enum/mode.enum";
import {SupplierDataSource} from "../class/supplier.datasource";
import {MatPaginator} from "@angular/material/paginator";
import {tap} from "rxjs/operators";
import {MatSort} from "@angular/material/sort";
import {merge} from "rxjs";

@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

    public suppliers: Supplier[];

    public displayedColumns = ['id', 'name', 'email', 'phone', 'edit', 'delete'];

    public dataSource: SupplierDataSource;

    public pageNumber: number = 0;

    public pageSize: number = 10;

    public sortOrder: string;

    public sortProperty: string;

    public showFirstLastButtons: boolean = true;

    @ViewChild(MatPaginator) private paginator: MatPaginator;

    @ViewChild(MatSort) private sort: MatSort;

    constructor(private supplierHttpService: SupplierHttpService,
                private router: Router,
                private supplierService: SupplierService) {
    }

    public ngOnInit() {
        this.setSortingOrder("ASC");
        this.sortById();
        this.dataSource = new SupplierDataSource(this.supplierHttpService);
        this.dataSource.loadSuppliers(
            this.pageNumber,
            this.pageSize,
            this.sortOrder,
            this.sortProperty);
    }

    public ngAfterViewInit() {
        this.dataSource.counter$
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
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadSuppliers())
            )
            .subscribe();
    }

    public editSupplier(supplier: Supplier, id: number) {
        this.goToSupplierEditForm(supplier, id);
    }

    public deleteSupplier(id: number) {
        this.supplierHttpService.deleteSupplier(id)
            .subscribe(() =>
                this.dataSource.loadSuppliers(
                    this.pageNumber,
                    this.pageSize,
                    this.sortOrder,
                    this.sortProperty));
    }

    public setSortingOrder(sortOrder: string) {
        this.sortOrder = sortOrder;
    }

    public sortById() {
        this.sortProperty = "id";
    }

    public setSortingProperty(sortProperty: string) {
       this.sortProperty = sortProperty;
    }

    public onRowClicked(row) {
        console.log('Row clicked: ', row);
    }

    private loadSuppliers() {
        if (this.sortOrder == "ASC") {
            this.setSortingOrder("DESC");
            this.dataSource.loadSuppliers(
                this.paginator.pageIndex,
                this.paginator.pageSize,
                this.sortOrder,
                this.sortProperty);
        } else {
            this.setSortingOrder("ASC");
            this.dataSource.loadSuppliers(
                this.paginator.pageIndex,
                this.paginator.pageSize,
                this.sortOrder,
                this.sortProperty);
        }
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
