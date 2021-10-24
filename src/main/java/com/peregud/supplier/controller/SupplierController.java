package com.peregud.supplier.controller;

import com.peregud.supplier.domain.Supplier;
import com.peregud.supplier.dto.SupplierDto;
import com.peregud.supplier.service.SupplierService;
import lombok.RequiredArgsConstructor;
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

    @PostMapping("/suppliers/add-supplier")
    public ResponseEntity<Supplier> addSupplier(@RequestBody SupplierDto supplierDto) {
        Supplier supplier = supplierService.addSupplier(supplierDto);
        return ResponseEntity.ok(supplier);
    }
}
