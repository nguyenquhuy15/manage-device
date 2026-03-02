package com.uet.model.entity;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@Entity
@SuperBuilder
@Table(name = "`department`")
public class Department implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "`name`", nullable = false, length = 100)
	private String name;

	@OneToMany(mappedBy = "departments", fetch = FetchType.LAZY)
	private List<Subjects> subjects;

	@OneToMany(mappedBy = "departments", fetch = FetchType.LAZY)
	private List<Laboratories> laboratories;


}