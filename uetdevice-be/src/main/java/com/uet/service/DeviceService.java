package com.uet.service;


import com.uet.model.dto.Lab.LabDTO;
import com.uet.model.dto.devices.DeviceCreatDTO;
import com.uet.model.dto.devices.DeviceDTO;
import com.uet.model.dto.devices.ImportDeviceDTO;
import com.uet.model.dto.maintenance.DeviceMaintenanceDTO;
import com.uet.model.dto.maintenance.MaintenanceDTO;
import com.uet.model.dto.manager.ManagerDTO;
import com.uet.model.entity.Devices;
import com.uet.model.form.devices.CreatingDeviceForm;
import com.uet.model.form.devices.DeviceFilterForm;
import com.uet.model.form.devices.ImportDevicesForm;
import com.uet.model.form.lab.LabForm;
import com.uet.model.form.maintenance.MaintenanceDeviceFilterForm;
import com.uet.model.form.type.DeviceTypeForm;
import com.uet.model.form.devices.UpdateDeviceForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DeviceService {


    Page<MaintenanceDTO> getAllDevicesByMaintenance(Pageable pageable, MaintenanceDeviceFilterForm form);

    DeviceDTO getDeviceById(Integer id);




    List<LabForm> getAllLabByDeviceId(Integer deviceId);

    boolean isDeviceExistsById(Integer id);



    void createDevice(CreatingDeviceForm form);
    void deleteDevice(Integer deviceId);

    void removeAllDevices();

    @Transactional
    void removeDevicesInLab(List<Integer> deviceIds);

    List<DeviceDTO> getAllDevicesNoLoan(Sort sort, String q);

    void deleteAllById(Iterable<? extends Integer> ids);

    List<DeviceTypeForm> getAllDevicesType();

    Page<DeviceDTO> getAllDevices(Pageable pageable, DeviceFilterForm form);

    void updateDevice(Integer deviceId, UpdateDeviceForm form);

    boolean isDeviceAvailable(Integer deviceId);

    boolean isDeviceExistsByCode(String code);


    boolean isDeviceExistsByName(String name);

    Devices getDevicesById(Integer id);

    void importDevice(ImportDevicesForm form);

    List<ImportDeviceDTO> getInfoDeviceByName(List<String> name);
}
