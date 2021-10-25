package com.peregud.supplier.converter;

import com.peregud.supplier.domain.Supplier;
import com.peregud.supplier.dto.SupplierDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class SupplierDtoConverter implements Converter<SupplierDto, Supplier> {

    @Override
    public Supplier convert(SupplierDto supplierDto) {
        Supplier.SupplierBuilder builder = Supplier.builder();
        Optional.ofNullable(supplierDto.getId())
                .ifPresent(builder::id);
        return builder
                .name(supplierDto.getName())
                .email(supplierDto.getEmail())
                .phone(supplierDto.getPhone())
                .build();
    }
}
