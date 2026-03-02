package com.uet.controller;



import com.uet.model.dto.department.DeviceDTO;
import com.uet.model.dto.loans.LoanDTO;


import com.uet.model.form.devices.DeviceFilterForm;
import com.uet.model.form.loans.CreatingLoanForm;
import com.uet.model.form.loans.LoanUpdateForm;
import com.uet.model.form.loans.LoansFilterForm;

import com.uet.model.validation.device.DeviceIdExists;
import com.uet.service.LoansService;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/loans")
@Validated
@Log4j2
public class LoanController {
    @Autowired
    private LoansService loansService;

    @GetMapping
    public Page<LoanDTO> getAllDevices(Pageable pageable, @Valid LoansFilterForm form) {
        return loansService.getAllDevices(pageable, form);
    }
    @GetMapping("/{id}/devices")
    public Page<DeviceDTO> getAllDevicesByLoanId(
            @PathVariable(name = "id") Integer loanId,
            Pageable pageable,
            @Valid DeviceFilterForm form) {
        return loansService.getAllDevicesByLoanId(loanId, pageable, form);
    }
    @GetMapping("/{id}")
    public LoanDTO getLoanById(@PathVariable(name = "id") Integer id) {
        return loansService.getLoanById(id);
    }

    @PostMapping
    public String createLoan(@RequestBody @Valid CreatingLoanForm form) {
        loansService.createLoan(form);
        return "create successfully!";
    }

    @PutMapping("/{id}")
    public String updateLoan(
            @PathVariable(name = "id")  Integer loanId,
            @RequestBody @Valid LoanUpdateForm form) {
        loansService.updateLoan(loanId, form);
        return "update successfully!";
    }
    @GetMapping("/name/exists")
    public boolean isLoanExistsByName(String name) {
        return loansService.isLoanExistsByName(name);
    }

    @DeleteMapping("/devices/{deviceIds}")
    public String returnDevicesInLoan(@PathVariable(name = "deviceIds") List<@DeviceIdExists Integer> deviceIds) {
        loansService.returnDevicesInLoan(deviceIds);
        return "Remove devices successfully!";
    }
}
