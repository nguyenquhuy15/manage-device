package com.uet.service;


import com.uet.model.dto.department.DeviceDTO;
import com.uet.model.dto.loans.LoanDTO;

import com.uet.model.entity.*;
import com.uet.model.form.devices.DeviceFilterForm;
import com.uet.model.form.loans.CreatingLoanForm;
import com.uet.model.form.loans.LoanUpdateForm;
import com.uet.model.form.loans.LoansFilterForm;
import com.uet.model.specification.loan.DeviceIdSpecification;
import com.uet.model.specification.loan.LoansSpecification;
import com.uet.repository.IDevicesRepository;
import com.uet.repository.ILoanDevicesRepository;
import com.uet.repository.ILoansRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class LoansServiceImpl extends BaseService implements LoansService {
    @Autowired
    private ILoanDevicesRepository loanDevicesRepository;
    @Autowired
    private IDevicesRepository devicesRepository;
    @Autowired
    private ILoansRepository loansRepository;

    @Override
    public Page<LoanDTO> getAllDevices(Pageable pageable, LoansFilterForm form) {

        Specification<Loans> where = LoansSpecification.buildWhere(form);

        //get entity page
        Page<Loans> entityPage = loansRepository.findAll(where, pageable);

        //convert entity to dto page
        Page<LoanDTO> dtoPage = convertObjectPageToObjectPage(entityPage, pageable, LoanDTO.class);

        return dtoPage;
    }

    @Override
    public Page<DeviceDTO> getAllDevicesByLoanId(Integer loanId, Pageable pageable,
                                                 DeviceFilterForm form) {
        Specification<Devices> where = DeviceIdSpecification.buildWhere(loanId, form);

        // get entity page
        Page<Devices> entityPage = devicesRepository.findAll(where, pageable);

        // convert entity to dto page
        Page<DeviceDTO> dtoPage = convertObjectPageToObjectPage(entityPage, pageable, DeviceDTO.class);

        return dtoPage;
    }

    @Override
    public LoanDTO getLoanById(Integer id) {
        //get entity
        Loans entity = loansRepository.findById(id).get();

        //convert entity to dto
        LoanDTO dto = convertObjectToObject(entity, LoanDTO.class);

        return dto;
    }

    @Override
    public void updateLoan(Integer loanId, LoanUpdateForm form) {
        Loans loans = loansRepository.findById(loanId).get();

        if (form.getReturnDate() != null) {
            loans.setReturnDate(form.getReturnDate());
        }
        if (form.getPurpose() != null) {
            loans.setPurpose(form.getPurpose());
        }
        loansRepository.save(loans);
    }
    @Transactional
    @Override
    public void createLoan(CreatingLoanForm form) {
        Loans loans = Loans.builder()
                .name(form.getName())
                .contact(form.getContact())
                .info(form.getInfo())
                .loanDate(form.getLoanDate())
                .purpose(form.getPurpose())
                .build();
        Loans entity = loansRepository.save(loans);

        if (form.getDeviceIds() != null && form.getDeviceIds().size() > 0) {

            form.getDeviceIds().forEach(deviceId -> {
                loanDevicesRepository.addDeviceToLoan(entity.getId(), deviceId);
            });

            devicesRepository.updateStatusToInUse(form.getDeviceIds());
        }
    }
    @Transactional
    @Override
    public void returnDevicesInLoan(List<Integer> deviceIds) {
        List<LoanDevices> loanDevices = loanDevicesRepository.findByDeviceIds(deviceIds);
        if (loanDevices.isEmpty()) {
            throw new IllegalArgumentException("Không tìm thấy khoản mượn nào chứa các thiết bị được cung cấp.");
        }
        Integer loanId = loanDevices.get(0).getLoans().getId();
        Loans loan = loansRepository.findById(loanId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy khoản mượn với ID: " + loanId));
        for (Integer deviceId : deviceIds) {
            Devices device = devicesRepository.findById(deviceId)
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy thiết bị với ID: " + deviceId));
            device.setStatus(Devices.Status.AVAILABLE);
            devicesRepository.save(device);
        }

        loanDevicesRepository.deleteAllInBatch(loanDevices);

        List<LoanDevices> allLoanDevices = loanDevicesRepository.findByLoans_Id(loanId);
        boolean allDevicesReturned = allLoanDevices.stream()
                .allMatch(loanDevice -> devicesRepository.findById(loanDevice.getDevices().getId())
                        .map(device -> device.getStatus() == Devices.Status.AVAILABLE)
                        .orElse(false));

        if (allDevicesReturned) {
            loan.setStatus(Loans.Status.RETURNED);
            loan.setReturnDate(new Date());
            loansRepository.save(loan);
        }
    }



    @Override
    public boolean isLoanExistsByName(String name) {
        return loansRepository.existsByName(name);
    }
}
