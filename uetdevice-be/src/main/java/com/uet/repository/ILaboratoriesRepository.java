package com.uet.repository;

import com.uet.model.entity.Laboratories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ILaboratoriesRepository extends JpaRepository<Laboratories, Integer>, JpaSpecificationExecutor<Laboratories> {
    Laboratories findByManagerName(String name);
    boolean existsByName(String name);
    boolean existsByEmail(String email);
    boolean existsByManagerName(String managerName);

}
