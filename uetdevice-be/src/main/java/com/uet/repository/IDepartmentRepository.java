package com.uet.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import com.uet.model.entity.Department;

public interface IDepartmentRepository extends JpaRepository<Department, Integer> {
    Department getDepartmentByName(String name);
    boolean existsByName(String name);

}
