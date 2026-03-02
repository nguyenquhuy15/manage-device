package com.uet.repository;

import com.uet.model.entity.Devices;
import com.uet.model.entity.Maintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface IMaintenanceRepository extends JpaRepository<Maintenance, Integer>, JpaSpecificationExecutor<Maintenance> {
    List<Devices> findByStatus(String status);
}
