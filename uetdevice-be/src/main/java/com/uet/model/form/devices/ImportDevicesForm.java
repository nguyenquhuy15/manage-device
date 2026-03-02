package com.uet.model.form.devices;

import com.uet.model.entity.Devices;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class ImportDevicesForm {

    @NotNull
    private String code;

    @NotNull
    private String name;

    @NotNull
    private String typeName;

    @NotNull
    private BigDecimal price;

    @NotNull
    private String laboratoriesManagerName;

    @NotNull
    private Devices.Status status;

}
