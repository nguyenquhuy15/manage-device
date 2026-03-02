package com.uet.service;

import com.uet.model.dto.maintenance.DeviceMaintenanceDTO;
import com.uet.model.entity.*;
import com.uet.model.form.maintenance.UpdateMaintenanceDeviceForm;
import com.uet.repository.IDevicesRepository;
import com.uet.repository.IMaintenanceRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MaintenanceServiceImpl extends BaseService implements MaintenanceService {
    @Autowired
    private IDevicesRepository devicesRepository;
    @Autowired
    private IMaintenanceRepository maintenanceRepository;

    @Override
    public void updateDeviceMaintenance(Integer deviceId, UpdateMaintenanceDeviceForm form) {
        Devices devices = devicesRepository.findById(deviceId).get();

            if (form.getMaintenanceDate() != null || form.getMaintenanceDescription() != null ||  form.getMaintenanceNote() != null || form.getMaintenanceAddress() != null || form.getMaintenanceExpense() != null || form.getMaintenanceStatus() != null) {
                Maintenance maintenance = devices.getMaintenance();
                if (maintenance == null) {
                    maintenance = new Maintenance();
                }
                maintenance.setDate(form.getMaintenanceDate());
                maintenance.setDescription(form.getMaintenanceDescription());
                maintenance.setNote(form.getMaintenanceNote());
                maintenance.setAddress(form.getMaintenanceAddress());
                maintenance.setExpense(form.getMaintenanceExpense());
                maintenance.setStatus(form.getMaintenanceStatus());
                maintenance = maintenanceRepository.save(maintenance);
                devices.setMaintenance(maintenance);
            }

 devicesRepository.save(devices);

    }
    @Override
    public DeviceMaintenanceDTO getDeviceById(Integer id) {
        //get entity
        Devices entity = devicesRepository.findById(id).get();

        //convert entity to dto
        DeviceMaintenanceDTO dto = convertObjectToObject(entity, DeviceMaintenanceDTO.class);

        return dto;
    }
    @Transactional
    @Override
    public void removeDevicesInMaintenance(List<Integer> deviceIds) {
        for (Integer deviceId : deviceIds) {
            Devices devices = devicesRepository.findById(deviceId).get();
            if (devices != null) {
                devices.setStatus(Devices.Status.AVAILABLE);

                }

            devicesRepository.save(devices);
        }
    }




}
