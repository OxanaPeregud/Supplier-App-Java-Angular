package com.peregud.supplier.controller;

import com.peregud.supplier.domain.Supplier;
import com.peregud.supplier.dto.SupplierDto;
import com.peregud.supplier.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SupplierController {

    private final SupplierService supplierService;

    @GetMapping("/suppliers")
    public ResponseEntity<List<SupplierDto>> getSuppliers() {
        List<SupplierDto> supplierDtoList = supplierService.getSuppliers();
        return ResponseEntity.ok(supplierDtoList);
    }

    @GetMapping("/suppliers/page")
    public ResponseEntity<Page<SupplierDto>> getSuppliersPage(@RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "10") int size,
                                                              @RequestParam String sortOrder,
                                                              @RequestParam String sortProperty) {
        Page<SupplierDto> supplierDtoList = supplierService.getSuppliersPage(page, size, sortOrder, sortProperty);
        return ResponseEntity.ok(supplierDtoList);
    }

    @PostMapping("/suppliers/add-supplier")
    public ResponseEntity<Supplier> addSupplier(@RequestBody SupplierDto supplierDto) {
        Supplier supplier = supplierService.addSupplier(supplierDto);
        return ResponseEntity.ok(supplier);
    }

    @PutMapping("/suppliers/edit-supplier/{supplierId}")
    public ResponseEntity<Supplier> editSupplier(@RequestBody SupplierDto supplierDto,
                                                 @PathVariable(name = "supplierId") Long id) {
        Supplier supplier = supplierService.editSupplier(supplierDto, id);
        return ResponseEntity.ok(supplier);
    }

    @DeleteMapping("/suppliers/delete-supplier/{supplierId}")
    public ResponseEntity<Boolean> deleteSupplier(@PathVariable(name = "supplierId") Long id) {
        Boolean isDeleted = supplierService.deleteSupplier(id);
        return ResponseEntity.ok(isDeleted);
    }
}
