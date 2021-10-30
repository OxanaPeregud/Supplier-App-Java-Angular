package com.peregud.supplier.domain;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "goods")
public class Goods implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "price_per_unit")
    private Double pricePerUnit;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn
    @ToString.Exclude
    private Supplier supplier;

}
