package com.uet.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@SuperBuilder
@Table(name = "`maintenance`")
public class Maintenance implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(mappedBy = "maintenance")
    private Devices devices;

    @Column(name = "maintenance_Date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Column(name = "description")
    private String description;

    @Column(name = "note")
    private String note;

    @Column(name = "address")
    private String address;

    @Column(name = "expense")
    private BigDecimal expense;
    @Column(name ="quantity", nullable = false)
    private Integer quantity;


    @Column(name = "`status`")
    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        DONE, UNFINISHED
    }
    @PrePersist
    public void setDefault() {
        if (quantity == null) {
            quantity = 0;
        }
    }

}
