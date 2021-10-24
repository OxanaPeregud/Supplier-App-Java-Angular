import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SupplierHttpService} from '../service/supplier.http.service';
import {Supplier} from '../model/supplier';

@Component({
    selector: 'app-supplier-form',
    templateUrl: './supplier-form.component.html',
    styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent {

    public supplier: Supplier;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private supplierService: SupplierHttpService) {
        this.supplier = new Supplier();
    }

    public onSubmit() {
        this.supplierService.save(this.supplier).subscribe(() => this.goToSupplierList());
    }

    private goToSupplierList() {
        this.router.navigate(['/suppliers']);
    }
}
