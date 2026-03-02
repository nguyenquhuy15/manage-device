package com.uet.repository;

import com.uet.model.entity.Department;
import com.uet.model.entity.Subjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ISubjectsRepository extends JpaRepository<Subjects, Integer>, JpaSpecificationExecutor<Subjects> {
    Subjects getSubjectsByName(String name);
    boolean existsByName(String name);
}
