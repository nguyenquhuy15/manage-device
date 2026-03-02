package com.uet.model.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@AllArgsConstructor
@SuperBuilder
@Table(name = "`devices`")
public class Devices implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "`name`", nullable = false, length = 100)
    private String name;

    @ManyToOne
    @JoinColumn(name ="type_Id", nullable = false)
    private DeviceType type;

    @ManyToOne
    @JoinColumn(name ="lab_Id")
    private Laboratories laboratories;

    @Column(name = "`code`", nullable = false, length = 100)
    private String code;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "purchase_Date")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date purchaseDate;

    @Column(name = "warranty_Date")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date warrantyDate;

    @Column(name = "`status`", nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "`total`", nullable = false)
    private Integer total;

    @OneToOne
    @JoinColumn(name ="detail_Id", referencedColumnName = "id", unique = true)
    private Detail details;

    @OneToOne
    @JoinColumn(name ="maintenance_Id", referencedColumnName = "id", unique = true)
    private Maintenance maintenance;

    @OneToMany(mappedBy = "devices", fetch = FetchType.LAZY)
    private List<LoanDevices> loanDevices;

    public enum Status {
        AVAILABLE, INUSE, MAINTENANCE;
    }
}