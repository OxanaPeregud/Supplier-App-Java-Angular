package com.peregud.supplier.service;

import com.peregud.supplier.domain.Supplier;
import com.peregud.supplier.dto.SupplierDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SupplierService {

    List<SupplierDto> getSuppliers();

    Page<SupplierDto> getSuppliersPage(int page, int size, String sortOrder, String sortProperty);

    SupplierDto getSupplierDtoById(Long id);

    Supplier addSupplier(SupplierDto supplierDto);

    Supplier editSupplier(SupplierDto supplierDto, Long id);

    Boolean deleteSupplier(Long id);

}
