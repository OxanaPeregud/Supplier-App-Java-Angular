package com.peregud.supplier.service;

import com.peregud.supplier.domain.Supplier;
import com.peregud.supplier.dto.SupplierDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SupplierService {

    List<SupplierDto> getSuppliers();

    SupplierDto getSupplierDtoById(Long id);

    Supplier addSupplier(SupplierDto supplierDto);

    Supplier editSupplier(SupplierDto supplierDto, Long id);

    Boolean deleteSupplier(Long id);

}
