package com.uet.controller;



import com.uet.model.dto.type.TypeDTO;


import com.uet.model.form.type.CreatingTypeForm;
import com.uet.model.form.type.TypeFilterForm;
import com.uet.service.TypeService;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/types")
@Validated
@Log4j2
public class TypeController {
    @Autowired
    private TypeService typeService;

    @GetMapping
    public Page<TypeDTO> getAllType(Pageable pageable, @Valid TypeFilterForm form) {
        return typeService.getAllType(pageable, form);
    }
    @GetMapping("/name")
    public List<TypeDTO> getTypeName(@Valid TypeFilterForm form) {
        return typeService.getTypesName(form);
    }
    @GetMapping("/name/exists")
    public boolean isTypeExistsByName(String name) {
        return typeService.isTypeExistsByName(name);
    }

    @GetMapping("/code/exists")
    public boolean isTypeExistsByCode(String code) {
        return typeService.isTypeExistsByCode(code);
    }

    @PostMapping
    public String createType(@RequestBody @Valid CreatingTypeForm form) {
        typeService.createType(form);
        return "create successfully!";
    }

    }
