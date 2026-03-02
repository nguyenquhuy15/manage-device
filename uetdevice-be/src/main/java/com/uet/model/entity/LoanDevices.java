package com.uet.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@AllArgsConstructor
@SuperBuilder
@Table(name = "`loan_devices`")
public class LoanDevices implements Serializable {

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "loan_id", nullable = false)
    private Loans loans;

    @ManyToOne
    @JoinColumn(name = "device_id", nullable = false)
    private Devices devices;

}
