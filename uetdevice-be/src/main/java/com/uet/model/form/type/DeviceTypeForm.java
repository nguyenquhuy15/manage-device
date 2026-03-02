package com.uet.model.form.type;

import com.uet.model.entity.Devices;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeviceTypeForm {
    private int id;
    @NotNull
    private String name;
}
