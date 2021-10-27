import {Observable, BehaviorSubject, of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {SupplierHttpService} from "../service/supplier.http.service";
import {Supplier} from "../model/supplier";
import {SupplierListResponse} from "./supplier.list.response";

export class SupplierDataSource implements DataSource<Supplier> {

    private supplierSubject = new BehaviorSubject<Supplier[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    private countSubject = new BehaviorSubject<number>(0);

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

    public loadSuppliers(pageNumber: number, pageSize: number) {
        this.loadingSubject.next(true);
        this.supplierService.paginatedListSuppliers({page: pageNumber, size: pageSize})
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
