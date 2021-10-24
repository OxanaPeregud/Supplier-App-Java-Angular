package com.peregud.supplier.converter;

import com.peregud.supplier.domain.Supplier;
import com.peregud.supplier.dto.SupplierDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class SupplierConverter implements Converter<Supplier, SupplierDto> {

    @Override
    public SupplierDto convert(Supplier supplier) {
        SupplierDto.SupplierDtoBuilder builder = SupplierDto.builder();
        Optional.ofNullable(supplier.getId())
                .ifPresent(builder::id);
        return builder
                .name(supplier.getName())
                .email(supplier.getEmail())
                .build();
    }
}
