package com.uet.service;

import com.uet.model.dto.Lab.LabDTO;
import com.uet.model.entity.Department;
import com.uet.model.entity.Laboratories;
import com.uet.model.entity.Subjects;
import com.uet.model.form.lab.CreatingManagerForm;
import com.uet.model.specification.laboratories.LaboratoriesSpecification;
import com.uet.repository.ILaboratoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LaboratoriesServiceImpl extends BaseService implements LaboratoriesService {
    @Autowired
    private ILaboratoriesRepository iLaboratoriesRepository;
    @Override
    public List<LabDTO> getLabName(Sort sort, String q) {
        //get entity
        Specification<Laboratories> where = LaboratoriesSpecification.buildWhere(q);

        //convert entity to dto
        List<Laboratories> entities = iLaboratoriesRepository.findAll(where, sort);

        // convert entity to dto list
        List<LabDTO> dtos = convertListObjectToListObject(entities, LabDTO.class);

        return dtos;
    }
    @Override
    public void createManager(CreatingManagerForm form) {
        Laboratories laboratories = Laboratories.builder()
                .name(form.getName())
                .managerName(form.getManagerName())
                .email(form.getEmail())
                .phone(form.getPhone())
                .departments(Department.builder().id(form.getDepartmentsId()).build())
                .subjects(Subjects.builder().id(form.getSubjectsId()).build())
                .location(form.getLocation())
                .build();
        iLaboratoriesRepository.save(laboratories);
    }
    @Override
    public boolean isLabExistsByName(String name) {
        return iLaboratoriesRepository.existsByName(name);
    }

}
