package com.peregud.supplier.service.impl;

import com.peregud.supplier.domain.Supplier;
import com.peregud.supplier.dto.SupplierDto;
import com.peregud.supplier.repository.SupplierRepository;
import com.peregud.supplier.service.ConvertService;
import com.peregud.supplier.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;

    private final ConvertService convertService;

    @Override
    public List<SupplierDto> getSuppliers() {
        List<Supplier> supplierList = supplierRepository.findAll();
        return convertService.covertList(supplierList, Supplier.class, SupplierDto.class);
    }

    @Override
    public Supplier addSupplier(SupplierDto supplierDto) {
        Supplier supplier = convertService.convertEntity(supplierDto, Supplier.class);
        return supplierRepository.save(supplier);
    }
}
