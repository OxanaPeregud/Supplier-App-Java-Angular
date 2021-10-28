import {Observable, BehaviorSubject, of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {SupplierHttpService} from "../service/supplier.http.service";
import {Supplier} from "../model/supplier";
import {SupplierListResponse} from "./supplier.list.response";

export class SupplierDataSource implements DataSource<Supplier> {

    public supplierSubject = new BehaviorSubject<Supplier[]>([]);

    public loadingSubject = new BehaviorSubject<boolean>(false);

    public countSubject = new BehaviorSubject<number>(0);

    public counter$ = this.countSubject.asObservable();

    constructor(private supplierService: SupplierHttpService) {
    }

    public connect(collectionViewer: CollectionViewer): Observable<Supplier[]> {
        return this.supplierSubject.asObservable();
    }

    public disconnect(collectionViewer: CollectionViewer): void {
        this.supplierSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    public loadSuppliers(pageNumber: number, pageSize: number, sortOrder: string, sortProperty: string) {
        if (sortOrder == null) {
            sortOrder = "asc";
        }
        if (sortProperty == null) {
            sortProperty = "id";
        }
        this.loadingSubject.next(true);
        this.supplierService.listSuppliers({
            page: pageNumber,
            size: pageSize,
            sortOrder: sortOrder.toUpperCase(),
            sortProperty: sortProperty
        })
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((result: SupplierListResponse) => {
                    this.supplierSubject.next(result.content);
                    this.countSubject.next(result.totalElements);
                }
            );
    }
}
