package com.uet.model.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@SuperBuilder
@Table(name = "`subjects`")
public class Subjects implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "`name`", nullable = false, length = 100)
    private String name;

    @OneToOne(mappedBy = "subjects")
    private Laboratories laboratories;

    @ManyToOne
    @JoinColumn(name ="department_Id", nullable = false)
    private Department departments;



}
