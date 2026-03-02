package com.uet.repository;


import com.uet.model.entity.DeviceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IDeviceTypeRepository extends JpaRepository<DeviceType, Integer>, JpaSpecificationExecutor<DeviceType> {
    DeviceType findByName(String name);
    boolean existsByName(String name);
    boolean existsByCode(String code);

}
