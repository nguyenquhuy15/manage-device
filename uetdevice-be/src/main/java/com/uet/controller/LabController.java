package com.uet.controller;

import com.uet.model.dto.Lab.LabDTO;
import com.uet.model.dto.type.TypeDTO;
import com.uet.model.form.devices.CreatingDeviceForm;
import com.uet.model.form.lab.CreatingManagerForm;
import com.uet.service.LaboratoriesService;
import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping(value = "/api/v1/labs")
@Validated
@Log4j2
public class LabController {
    @Autowired
    private LaboratoriesService laboratoriesService;

    @GetMapping("/name")
    public List<LabDTO> getLabName(Sort sort, @RequestParam(value = "q", required = false) String q) {
        return laboratoriesService.getLabName(sort, q);
    }
    @PostMapping
    public String createManager(@RequestBody @Valid CreatingManagerForm form) {
        laboratoriesService.createManager(form);
        return "create successfully!";
    }
    @GetMapping("/name/exists")
    public boolean isLabExistsByName(String name) {
        return laboratoriesService.isLabExistsByName(name);
    }
}
