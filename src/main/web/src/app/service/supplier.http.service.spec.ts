import {TestBed, inject} from '@angular/core/testing';

import {SupplierHttpService} from './supplier.http.service';

describe('SupplierHttpService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SupplierHttpService]
        });
    });

    it('should be created', inject([SupplierHttpService], (service: SupplierHttpService) => {
        expect(service).toBeTruthy();
    }));
});
