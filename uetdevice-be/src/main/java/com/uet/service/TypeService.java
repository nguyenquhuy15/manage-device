package com.uet.service;

import com.uet.model.dto.type.TypeDTO;
import com.uet.model.form.type.CreatingTypeForm;
import com.uet.model.form.type.TypeFilterForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface TypeService {

    Page<TypeDTO> getAllType(Pageable pageable, TypeFilterForm form);

    List<TypeDTO> getTypesName(TypeFilterForm form);

    void createType(CreatingTypeForm form);

    boolean isTypeExistsByName(String name);

    boolean isTypeExistsByCode(String code);
}
