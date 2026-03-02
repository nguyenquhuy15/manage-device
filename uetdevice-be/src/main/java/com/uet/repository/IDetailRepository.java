package com.uet.repository;

import com.uet.model.entity.Detail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IDetailRepository extends JpaRepository<Detail, Integer>, JpaSpecificationExecutor<Detail> {
}
