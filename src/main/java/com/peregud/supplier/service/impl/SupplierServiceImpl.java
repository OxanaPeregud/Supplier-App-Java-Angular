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
    public SupplierDto getSupplierDtoById(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No supplier with id " + id));
        return convertService.convertEntity(supplier, SupplierDto.class);
    }

    @Override
    public Supplier addSupplier(SupplierDto supplierDto) {
        Supplier supplier = convertService.convertEntity(supplierDto, Supplier.class);
        return supplierRepository.save(supplier);
    }

    @Override
    public Supplier editSupplier(SupplierDto supplierDto, Long id) {
        SupplierDto supplierExisting = this.getSupplierDtoById(id);
        supplierDto.setId(supplierExisting.getId());
        Supplier supplierUpdated = convertService.convertEntity(supplierDto, Supplier.class);
        return supplierRepository.save(supplierUpdated);
    }

    @Override
    public Boolean deleteSupplier(Long id) {
        boolean isDeleted = false;
        if (supplierRepository.existsById(id)) {
            supplierRepository.deleteById(id);
            isDeleted = true;
        }
        return isDeleted;
    }
}
