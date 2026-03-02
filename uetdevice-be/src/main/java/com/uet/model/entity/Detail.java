package com.uet.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@SuperBuilder
@Table(name = "`detail`")
public class Detail implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(mappedBy = "details")
    private Devices devices;

    @Column(name = "assignment_Date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date assignmentDate;

    @Column(name = "note")
    private String note;


}
