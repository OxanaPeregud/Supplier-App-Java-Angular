import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Supplier} from '../model/supplier';
import {Observable} from 'rxjs';
import {AppSettings} from "../app-settings";

@Injectable()
export class SupplierHttpService {

    private suppliersUrl: string;

    constructor(private http: HttpClient) {
        this.suppliersUrl = AppSettings.MAIN_ROUTE + "/suppliers";
    }

    public findAll(): Observable<Supplier[]> {
        return this.http.get<Supplier[]>(this.suppliersUrl);
    }

    public save(supplier: Supplier) {
        return this.http.post<Supplier>(this.suppliersUrl + "/add-supplier", supplier);
    }

    public delete(id: number) {
        return this.http.delete<boolean>(this.suppliersUrl + "/delete-supplier/" + id);
    }
}
