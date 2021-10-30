import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SuppliersGoodsDialogComponent} from './suppliers-goods-dialog.component';

describe('SuppliersGoodsDialogComponent', () => {
    let component: SuppliersGoodsDialogComponent;
    let fixture: ComponentFixture<SuppliersGoodsDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SuppliersGoodsDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SuppliersGoodsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
