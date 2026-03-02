package com.uet.service;

import com.uet.model.dto.devices.DeviceDTO;
import com.uet.model.dto.maintenance.DeviceMaintenanceDTO;
import com.uet.model.dto.maintenance.MaintenanceDTO;
import com.uet.model.form.maintenance.MaintenanceDeviceFilterForm;
import com.uet.model.form.maintenance.UpdateMaintenanceDeviceForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MaintenanceService {

    void updateDeviceMaintenance(Integer deviceId, UpdateMaintenanceDeviceForm form);

    DeviceMaintenanceDTO getDeviceById(Integer id);

    @Transactional
    void removeDevicesInMaintenance(List<Integer> deviceIds);
}
