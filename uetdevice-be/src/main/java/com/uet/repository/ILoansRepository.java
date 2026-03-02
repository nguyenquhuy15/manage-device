package com.uet.repository;

import com.uet.model.entity.Loans;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ILoansRepository extends JpaRepository<Loans, Integer>, JpaSpecificationExecutor<Loans> {
    boolean existsByName(String name);
}
