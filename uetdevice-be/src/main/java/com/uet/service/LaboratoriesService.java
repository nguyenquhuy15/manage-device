package com.uet.service;

import com.uet.model.dto.Lab.LabDTO;
import com.uet.model.entity.Laboratories;
import com.uet.model.form.lab.CreatingManagerForm;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface LaboratoriesService {

    List<LabDTO> getLabName(Sort sort, String q);

    void createManager(CreatingManagerForm form);

    boolean isLabExistsByName(String name);
}
