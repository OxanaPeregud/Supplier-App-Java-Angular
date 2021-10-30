package com.peregud.supplier.converter;

import com.peregud.supplier.dto.GoodsDto;
import com.peregud.supplier.dto.GoodsInfo;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class GoodsInfoConverter implements Converter<GoodsInfo, GoodsDto> {

    @Override
    public GoodsDto convert(GoodsInfo goodsInfo) {
        GoodsDto.GoodsDtoBuilder builder = GoodsDto.builder();
        return builder
                .name(goodsInfo.getName())
                .pricePerUnit(goodsInfo.getPricePerUnit())
                .build();
    }
}
