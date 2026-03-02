package com.uet.model.entity;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Formula;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@AllArgsConstructor
@SuperBuilder
@Table(name = "`account`")
public class Account implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "email", nullable = false, length = 50)
	private String email;

	@Column(name = "first_name", nullable = false, length = 50)
	private String firstname;

	@Column(name = "last_name", nullable = false, length = 50)
	private String lastname;

	@Formula(" concat(first_name,' ',last_name) ")
	private String fullname;

	@Column(name = "username", nullable = false, length = 50)
	private String username;

	@Column(name = "`password`", nullable = false, length = 255)
	private String password;

	@Column(name = "`role`", nullable = false)
	@Enumerated(EnumType.STRING)
	private Role role;

	@Column(name = "`status`", nullable = false)
	@Enumerated(EnumType.STRING)
	private Status status;

	@Column(name = "last_change_password_date_time")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date lastChangePasswordDateTime;

	@Column(name = "created_date_time")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date createdDateTime;

	@Column(name = "updated_date_time")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date updatedDateTime;

	@PrePersist
	public void setDefault() {
		if (status == null) {
			status = Status.BLOCK;
		}
		if (role == null) {
			role = Role.MANAGER;
		}
	}


	public enum Status {
		ACTIVE, BLOCK;
	}

	public enum Role {
		ADMIN, MANAGER;
	}
}