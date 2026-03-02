package com.uet.model.form.devices;

import com.uet.model.entity.Devices;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class CreatingDeviceForm {

    @NotBlank
    private String code;

    @NotBlank
    private String name;

    @NotNull
    private BigDecimal price;

    @NotNull
    private Integer typeId;

    @NotNull
    private Integer laboratoriesId;



    private Date purchaseDate;

    private Date detailsAssignmentDate;

    @NotNull
    private Devices.Status status;


}
