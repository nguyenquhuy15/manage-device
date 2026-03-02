package com.uet.service;

import com.uet.model.dto.department.DeviceDTO;
import com.uet.model.dto.loans.LoanDTO;

import com.uet.model.form.devices.DeviceFilterForm;
import com.uet.model.form.loans.CreatingLoanForm;
import com.uet.model.form.loans.LoanUpdateForm;
import com.uet.model.form.loans.LoansFilterForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LoansService {
    Page<LoanDTO> getAllDevices(Pageable pageable, LoansFilterForm form);

    Page<DeviceDTO> getAllDevicesByLoanId(Integer loanId, Pageable pageable,
                                          DeviceFilterForm form);

    LoanDTO getLoanById(Integer id);

    void updateLoan(Integer loanId, LoanUpdateForm form);
    @Transactional
    void createLoan(CreatingLoanForm form);


    @Transactional
    void returnDevicesInLoan(List<Integer> deviceIds);

    boolean isLoanExistsByName(String name);
}
