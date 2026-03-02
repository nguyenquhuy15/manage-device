package com.uet.repository;

import com.uet.model.entity.LoanDevices;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ILoanDevicesRepository extends JpaRepository<LoanDevices, Integer>, JpaSpecificationExecutor<LoanDevices> {
    @Modifying
    @Query(value = "INSERT INTO loan_devices (loan_id, device_id) VALUES (:loansId, :devicesId)", nativeQuery = true)
    void addDeviceToLoan(@Param("loansId") Integer loansId, @Param("devicesId") Integer devicesId);

    @Query("SELECT ld FROM LoanDevices ld WHERE ld.loans.id = :loanId AND ld.devices.id IN :deviceIds")
    List<LoanDevices> findByLoanIdAndDeviceIds(@Param("loanId") Integer loanId, @Param("deviceIds") List<Integer> deviceIds);

    List<LoanDevices> findByLoans_Id(Integer loanId);
    @Query("SELECT ld FROM LoanDevices ld WHERE ld.devices.id IN :deviceIds")
    List<LoanDevices> findByDeviceIds(@Param("deviceIds") List<Integer> deviceIds);


}
