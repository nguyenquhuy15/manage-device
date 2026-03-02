package com.uet.model.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@SuperBuilder
@Table(name = "`devicesType`")
public class DeviceType implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "`name`", nullable = false, length = 100)
    private String name;

    @Column(name = "`code`", nullable = false, length = 20)
    private String code;

    @Column(name ="quantity", nullable = false)
    private Integer quantity;


    @OneToMany(mappedBy = "type", fetch = FetchType.LAZY)
    private List<Devices> devices;

    @PrePersist
    public void setDefault() {
        if (quantity == null) {
            quantity = 0;
        }
    }
}
