import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Supplier} from '../model/supplier';
import {Observable} from 'rxjs';
import {AppSettings} from "../app-settings";

@Injectable()
export class SupplierHttpService {

    private suppliersUrl: string;

    constructor(private http: HttpClient) {
        this.suppliersUrl = AppSettings.MAIN_ROUTE + "/suppliers";
    }

    public findAllSuppliers(): Observable<Supplier[]> {
        return this.http.get<Supplier[]>(this.suppliersUrl);
    }

    public listSuppliers(request) {
        const params = request;
        return this.http.get(this.suppliersUrl + "/page", {params});
    }

    public saveSupplier(supplier: Supplier) {
        return this.http.post<Supplier>(this.suppliersUrl + "/add-supplier", supplier);
    }

    public editSupplier(supplier: Supplier, id: number) {
        return this.http.put<Supplier>(this.suppliersUrl + "/edit-supplier/" + id, supplier);
    }

    public deleteSupplier(id: number) {
        return this.http.delete<boolean>(this.suppliersUrl + "/delete-supplier/" + id);
    }

    public getSuppliersSearchResult(name: string): Observable<Supplier[]> {
        const params = new HttpParams()
            .set("name", name)
        return this.http.get<Supplier[]>(this.suppliersUrl + "/search-result", {params});
    }
}
