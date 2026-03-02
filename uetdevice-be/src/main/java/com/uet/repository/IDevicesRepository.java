package com.uet.repository;

import com.uet.model.entity.Devices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IDevicesRepository extends JpaRepository<Devices, Integer>, JpaSpecificationExecutor<Devices> {


    @Override
    void deleteAllById(Iterable<? extends Integer> integers);

    Boolean existsByCode(String code);
    Boolean existsByName(String name);
    Optional<Devices> findByMaintenanceId(Integer maintenanceId);
    List<Devices> findByNameIn(List<String> name);

    @Query(value = "UPDATE `devices` SET loan_id = :loansId WHERE id IN (:deviceIds)", nativeQuery = true)
    @Modifying
    void updateLoan(
            @Param("loansId") Integer loansId,
            @Param("deviceIds") List<Integer> deviceIds);

    @Query(value = "UPDATE `devices` SET status = 'INUSE' WHERE id IN (:deviceIds)", nativeQuery = true)
    @Modifying
    void updateStatusToInUse(@Param("deviceIds") List<Integer> deviceIds);
    @Query("SELECT CASE WHEN COUNT(d) > 0 THEN true ELSE false END FROM Devices d WHERE d.id = :deviceId AND d.status = 'AVAILABLE'")
    boolean isDeviceAvailable(@Param("deviceId") Integer deviceId);

    @Modifying
    @Query("UPDATE Devices d SET d.status = 'AVAILABLE' WHERE d.id IN :deviceIds")
    void updateStatusToAvailable(@Param("deviceIds") List<Integer> deviceIds);




}
