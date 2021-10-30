package com.peregud.supplier.config;

import com.peregud.supplier.converter.GoodsInfoConverter;
import com.peregud.supplier.converter.SupplierConverter;
import com.peregud.supplier.converter.SupplierDtoConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.support.DefaultConversionService;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ConverterConfig implements WebMvcConfigurer {

    @Bean
    public ConversionService conversionService() {
        DefaultConversionService service = new DefaultConversionService();
        service.addConverter(new SupplierConverter());
        service.addConverter(new SupplierDtoConverter());
        service.addConverter(new GoodsInfoConverter());
        return service;
    }
}
