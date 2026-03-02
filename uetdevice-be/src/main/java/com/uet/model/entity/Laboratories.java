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
@Table(name = "`laboratories`")
public class Laboratories implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "`name`", nullable = false, length = 100)
    private String name;

    @Column(name = "`manager_Name`", length = 100, nullable = false)
    private String managerName;

    @Column(name ="quantity", nullable = false)
    private Integer quantity;

    @Column(name = "email", unique = true, length = 50)
    private String email;

    @Column(name = "phone", nullable = false, unique = true, length = 20)
    private String phone;

    @ManyToOne
    @JoinColumn(name = "department_Id", referencedColumnName = "id", nullable = true)
    private Department departments;

    @OneToOne
    @JoinColumn(name = "subject_Id", referencedColumnName = "id", nullable = true)
    private Subjects subjects;

    @Column(name ="location", length = 100, nullable = false)
    private String location;

    @PrePersist
    public void setDefault() {
        if (quantity == null) {
            quantity = 0;
        }
    }

}
