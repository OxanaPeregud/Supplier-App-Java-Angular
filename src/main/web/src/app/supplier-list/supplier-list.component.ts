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
import {MatDialog} from "@angular/material/dialog";
import {SuppliersGoodsDialogComponent} from "../suppliers-goods-dialog/suppliers-goods-dialog.component";

@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

    public suppliers: Supplier[];

    public searchedSuppliers: Supplier[];

    public supplierName: string;

    public displayedColumns = ['id', 'name', 'email', 'phone', 'edit', 'delete'];

    public dataSource: SupplierDataSource;

    public pageNumber: number = 0;

    public pageSize: number = 10;

    public showFirstLastButtons: boolean = true;

    private sortOrder: string;

    private sortProperty: string;

    private activeRowId: number;

    private goodsName: string;

    private pricePerUnit: number;

    @ViewChild(MatPaginator) private paginator: MatPaginator;

    @ViewChild(MatSort) private sort: MatSort;

    constructor(private supplierHttpService: SupplierHttpService,
                private router: Router,
                private supplierService: SupplierService,
                public dialog: MatDialog) {
    }

    public ngOnInit() {
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
        merge(this.paginator.page, this.sort.sortChange)
            .pipe(
                tap(() => this.dataSource.loadSuppliers(
                    this.paginator.pageIndex,
                    this.paginator.pageSize,
                    this.sort.direction,
                    this.sort.active))
            )
            .subscribe();
    }

    public editSupplier(supplier: Supplier, id: number) {
        this.goToSupplierEditForm(supplier, id);
    }

    public deleteSupplier(id: number) {
        this.supplierService.setMode(Mode.DELETE);
        this.supplierHttpService.deleteSupplier(id)
            .subscribe(() =>
                this.dataSource.loadSuppliers(
                    this.pageNumber,
                    this.pageSize,
                    this.sortOrder,
                    this.sortProperty));
        this.supplierService.reload();
    }

    public onRowClicked(row) {
        if (this.supplierService.getMode() != Mode.DELETE) {
            this.activeRowId = row.id;
            this.supplierService.setSupplierId(this.activeRowId);
            this.getSuppliersGoods();
            this.dialog.open(SuppliersGoodsDialogComponent, {
                width: '80%',
                closeOnNavigation: true,
                data: {name: this.goodsName, pricePerUnit: this.pricePerUnit}
            });
        }
    }

    public loadSuppliersSearchResult() {
        this.supplierService.setMode(Mode.SEARCH);
        this.supplierHttpService.getSuppliersSearchResult(this.supplierName)
            .subscribe(response => {
                this.searchedSuppliers = response;
            });
    }

    public isSearchMode(): boolean {
        return this.supplierService.getMode() == Mode.SEARCH;
    }

    private loadSuppliers() {
        this.dataSource.loadSuppliers(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.sortOrder,
            this.sortProperty);
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

    private getSuppliersGoods() {
        this.supplierHttpService.displaySuppliersGoods(this.supplierService.getSupplierId())
            .subscribe(response => {
                if (response[0].name == null) {
                    this.supplierService.setMode(Mode.NULL);
                } else {
                    this.supplierService.setMode(Mode.READONLY);
                    this.supplierService.setGoods(response);
                }
            });
    }
}
