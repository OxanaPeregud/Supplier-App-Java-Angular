package com.peregud.supplier.repository;

import com.peregud.supplier.domain.Supplier;
import com.peregud.supplier.dto.GoodsInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    List<Supplier> findAllByNameContaining(String name);

    @Query("select distinct g.name as name, g.pricePerUnit as pricePerUnit " +
            "from Supplier s left join Goods g on g.supplier.id = :id")
    List<GoodsInfo> suppliersGoods(@Param("id") Long id);
}
