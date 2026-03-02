package com.uet.service;

import com.uet.model.dto.type.TypeDTO;
import com.uet.model.entity.DeviceType;
import com.uet.model.form.type.CreatingTypeForm;
import com.uet.model.form.type.TypeFilterForm;
import com.uet.model.specification.type.DeviceTypeSpecification;
import com.uet.repository.IDeviceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TypeServiceImpl extends BaseService implements TypeService {
    @Autowired
    private IDeviceTypeRepository iDeviceTypeRepository;
    @Override
    public Page<TypeDTO> getAllType(Pageable pageable, TypeFilterForm form) {
        //get entity
        Specification<DeviceType> where = DeviceTypeSpecification.buildWhere(form);

        //convert entity to dto
        Page<DeviceType> entities = iDeviceTypeRepository.findAll(where, pageable);

        // convert entity to dto list
        Page<TypeDTO> dtos = convertObjectPageToObjectPage(entities, pageable, TypeDTO.class);

        return dtos;
    }
    @Override
    public List<TypeDTO> getTypesName(TypeFilterForm form) {
        //get entity
        Specification<DeviceType> where = DeviceTypeSpecification.buildWhere(form);

        //convert entity to dto
        List<DeviceType> entities = iDeviceTypeRepository.findAll(where);

        // convert entity to dto list
        List<TypeDTO> dtos = convertListObjectToListObject(entities, TypeDTO.class);

        return dtos;
    }
    @Override
    public void createType(CreatingTypeForm form) {
        // Create device
        DeviceType devices = DeviceType.builder()
                .name(form.getName())
                .code(form.getCode())
                .build();
        iDeviceTypeRepository.save(devices);

    }
    @Override
    public boolean isTypeExistsByName(String name) {
        return iDeviceTypeRepository.existsByName(name);
    }
    @Override
    public boolean isTypeExistsByCode(String code) {
        return iDeviceTypeRepository.existsByCode(code);
    }
}
