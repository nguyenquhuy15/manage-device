package com.uet.service;

import com.uet.model.dto.devices.DeviceDTO;
import com.uet.model.dto.devices.ImportDeviceDTO;
import com.uet.model.dto.maintenance.MaintenanceDTO;
import com.uet.model.entity.*;
import com.uet.model.form.devices.CreatingDeviceForm;
import com.uet.model.form.devices.DeviceFilterForm;
import com.uet.model.form.devices.ImportDevicesForm;
import com.uet.model.form.lab.LabForm;
import com.uet.model.form.maintenance.MaintenanceDeviceFilterForm;
import com.uet.model.form.type.DeviceTypeForm;
import com.uet.model.form.devices.UpdateDeviceForm;
import com.uet.model.specification.device.DeviceSpecification;
import com.uet.model.specification.loan.DeviceNoLoanSpecification;
import com.uet.model.specification.maintenance.MaintenanceSpecification;
import com.uet.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DeviceServiceImpl extends BaseService implements DeviceService {
    @Autowired
    private IDevicesRepository devicesRepository;
    @Autowired
    private ILaboratoriesRepository laboratoriesRepository;
    @Autowired
    private IDetailRepository detailRepository;
    @Autowired
    private IMaintenanceRepository maintenanceRepository;

    @Autowired
    private IDeviceTypeRepository deviceTypeRepository;

    @Override
    public Page<DeviceDTO> getAllDevices(Pageable pageable, DeviceFilterForm form) {

        Specification<Devices> where = DeviceSpecification.buildWhere(form);

        //get entity page
        Page<Devices> entityPage = devicesRepository.findAll(where,pageable);

        //convert entity to dto page
        Page<DeviceDTO> dtoPage = convertObjectPageToObjectPage(entityPage, pageable, DeviceDTO.class);

        return dtoPage;
    }
    @Override
    public Page<MaintenanceDTO> getAllDevicesByMaintenance(Pageable pageable, MaintenanceDeviceFilterForm form) {
        Specification<Devices> where = MaintenanceSpecification.buildWhere(form);

        Page<Devices> entityPage = devicesRepository.findAll(where, pageable);

        Page<MaintenanceDTO> dtoPage = convertObjectPageToObjectPage(entityPage, pageable, MaintenanceDTO.class);

        return dtoPage;
    }

    @Override
    public DeviceDTO getDeviceById(Integer id) {
        //get entity
        Devices entity = devicesRepository.findById(id).get();

        //convert entity to dto
        DeviceDTO dto = convertObjectToObject(entity, DeviceDTO.class);

        return dto;
    }
    @Override
    public List<LabForm> getAllLabByDeviceId(Integer deviceId) {

        List<Laboratories> entity = laboratoriesRepository.findAll();

        List<LabForm> dtos = convertListObjectToListObject( entity, LabForm.class);

        return dtos;
    }
    @Override
	public boolean isDeviceExistsById(Integer id) {
		return devicesRepository.existsById(id);
	}

    @Override
    public void createDevice(CreatingDeviceForm form) {
        Detail detail = Detail.builder()
                .assignmentDate(form.getDetailsAssignmentDate())
                .build();

        detail = detailRepository.save(detail);

        // Create device
        Devices devices = Devices.builder()
                .name(form.getName())
                .type(DeviceType.builder().id(form.getTypeId()).build())
                .laboratories(Laboratories.builder().id(form.getLaboratoriesId()).build())
                .code(form.getCode())
                .price(form.getPrice())
                .purchaseDate(form.getPurchaseDate())
                .details(detail)
                .status(form.getStatus())
                .build();

        devicesRepository.save(devices);

        Laboratories laboratories = laboratoriesRepository.findById(form.getLaboratoriesId()).get();
        laboratories.setQuantity(laboratories.getQuantity() + 1);
        laboratoriesRepository.save(laboratories);

        DeviceType type = deviceTypeRepository.findById(form.getTypeId()).get();
        type.setQuantity(type.getQuantity() + 1);
        deviceTypeRepository.save(type);
    }


    @Override
    public void deleteDevice(Integer deviceId) {
        devicesRepository.deleteById(deviceId);
    }
    @Override
    public void removeAllDevices() {
        devicesRepository.deleteAll();
    }
    @Transactional
    @Override
    public void removeDevicesInLab(List<Integer> deviceIds) {
        for (Integer deviceId : deviceIds) {
            Devices devices = devicesRepository.findById(deviceId).get();

            Laboratories laboratories = devices.getLaboratories();
            laboratories.setQuantity(laboratories.getQuantity() - 1);
            laboratoriesRepository.save(laboratories);

            DeviceType type = devices.getType();
            type.setQuantity(type.getQuantity() - 1);
            deviceTypeRepository.save(type);

            devicesRepository.delete(devices);
        }
    }

    @Override
    public List<DeviceDTO> getAllDevicesNoLoan(Sort sort, String q) {

        Specification<Devices> where = DeviceNoLoanSpecification.buildWhere(q);

        // get entity list
        List<Devices> entities = devicesRepository.findAll(where, sort);

        // convert entity to dto list
        List<DeviceDTO> dtos = convertListObjectToListObject(entities, DeviceDTO.class);

        return dtos;
    }

    @Override
    public void deleteAllById(Iterable<? extends Integer> ids) {
        devicesRepository.deleteAllById(ids);
    }


    @Override
    public List<DeviceTypeForm> getAllDevicesType() {
        // get entity list
        List<DeviceType> entities = deviceTypeRepository.findAll();

        // convert entity to dto page
        List<DeviceTypeForm> dtos = convertListObjectToListObject(entities, DeviceTypeForm.class);

        return dtos;
    }

    @Override
    public void updateDevice(Integer deviceId, UpdateDeviceForm form) {
        Devices device = devicesRepository.findById(deviceId).get();

        if (form.getStatus() != null) {
            if (form.getStatus() == Devices.Status.MAINTENANCE) {
                Maintenance maintenance = device.getMaintenance();
                if (maintenance == null) {
                    maintenance = new Maintenance();
                    maintenance.setQuantity(0);
                }
                maintenance.setQuantity(maintenance.getQuantity() + 1); // Tăng số lần bảo trì
                maintenanceRepository.save(maintenance); // Lưu thay đổi
                device.setMaintenance(maintenance); // Cập nhật thiết bị
            }
            device.setStatus(form.getStatus());
        }

        if (form.getDetailsNote() != null || form.getDetailsAssignmentDate() != null) {
            Detail detail = device.getDetails();
            if (detail == null) {
                detail = new Detail();
            }
            if (form.getDetailsNote() != null) {
                detail.setNote(form.getDetailsNote());
            }
            if (form.getDetailsAssignmentDate() != null) {
                detail.setAssignmentDate(form.getDetailsAssignmentDate());
            }
            detail = detailRepository.save(detail);
            device.setDetails(detail);
        }

        if(form.getLaboratoriesManagerName() != null){
            Laboratories laboratories = device.getLaboratories();
            if(laboratories == null){
                laboratories = new Laboratories();
            }
            laboratories.setManagerName(form.getLaboratoriesManagerName());
            laboratories= laboratoriesRepository.save(laboratories);
            device.setLaboratories(laboratories);
        }

        if (form.getMaintenanceDate() != null || form.getMaintenanceDescription() != null) {
            Maintenance maintenance = device.getMaintenance();
            if (maintenance == null) {
                maintenance = new Maintenance();
            }
            if (form.getMaintenanceDate() != null) {
                maintenance.setDate(form.getMaintenanceDate());
            }
            if (form.getMaintenanceDescription() != null) {
                maintenance.setDescription(form.getMaintenanceDescription());
            }
            maintenance = maintenanceRepository.save(maintenance);
            device.setMaintenance(maintenance);
        }
        Laboratories oldLab = device.getLaboratories();
        Laboratories newLab = null;

        if (oldLab != null && !oldLab.getId().equals(form.getLaboratoriesId())) {

            oldLab.setQuantity(oldLab.getQuantity() - 1);
            laboratoriesRepository.save(oldLab);

            newLab = laboratoriesRepository.findById(form.getLaboratoriesId()).get();
            newLab.setQuantity(newLab.getQuantity() + 1);
            laboratoriesRepository.save(newLab);

            device.setLaboratories(newLab);

        }
        DeviceType oldType = device.getType();
        DeviceType newType = null;

        if (oldType != null && !oldType.getId().equals(form.getTypeId())) {

            oldType.setQuantity(oldType.getQuantity() - 1);
            deviceTypeRepository.save(oldType);

            newType = deviceTypeRepository.findById(form.getTypeId()).get();
            newType.setQuantity(newType.getQuantity() + 1);
            deviceTypeRepository.save(newType);

            device.setType(newType);

        }


        devicesRepository.save(device);
    }
    @Override
    public boolean isDeviceAvailable(Integer deviceId) {
        return devicesRepository.isDeviceAvailable(deviceId);
    }



    @Override
    public boolean isDeviceExistsByCode(String code) {
        return devicesRepository.existsByCode(code);
    }

    @Override
    public boolean isDeviceExistsByName(String name) {
        return devicesRepository.existsByName(name);
    }
    @Override
    public Devices getDevicesById(Integer id) {
        return devicesRepository.findById(id).get();
    }
    @Override
    public void importDevice(ImportDevicesForm form) {
        DeviceType deviceType = deviceTypeRepository.findByName(form.getTypeName());
        Laboratories manager = laboratoriesRepository.findByManagerName(form.getLaboratoriesManagerName());

        // Tạo và lưu Devices
        Devices device = Devices.builder()
                .code(form.getCode())
                .name(form.getName())
                .type(deviceType)
                .laboratories(manager)
                .price(form.getPrice())
                .status(form.getStatus())
                .build();

        devicesRepository.save(device);

        if (manager != null) {
            manager.setQuantity(manager.getQuantity() + 1);
            laboratoriesRepository.save(manager);
        }
        if (deviceType != null){
            deviceType.setQuantity(deviceType.getQuantity() + 1);
            deviceTypeRepository.save(deviceType);
        }
    }

    @Override
    public List<ImportDeviceDTO> getInfoDeviceByName(List<String> name) {

        // get entity list
        List<Devices> entities = devicesRepository.findByNameIn(name);

        // convert entity to dto list
        List<ImportDeviceDTO> dtos = convertListObjectToListObject(entities, ImportDeviceDTO.class);

        return dtos;
    }


}
