package com.uet.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@AllArgsConstructor
@SuperBuilder
@Table(name = "`loans`")
public class Loans implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "`group_name`", nullable = false, length = 100)
    private String name;

    @Column(name = "`contact_person`", nullable = false, length = 100)
    private String contact;

    @Column(name = "`contact_info`", nullable = false, length = 100)
    private String info;

    @Column(name = "loan_date")
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date loanDate;

    @Column(name = "return_date")
    @Temporal(TemporalType.TIMESTAMP)

    private Date returnDate;

    @Column(name = "`purpose`")
    private String purpose;

    @Column(name = "`quantity`", nullable = false)
    private Integer quantity;

    @Column(name = "`status`", nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "loans", fetch = FetchType.LAZY)
    private List<LoanDevices> loanDevices;

    @PrePersist
    public void setDefault() {
        if (quantity == null) {
            quantity = 0;
        }
        if (status == null) {
            status = Status.INUSE;
        }

    }

    public enum Status {
        INUSE, RETURNED;
    }
}
