package com.uet.model.dto.devices;

import com.uet.model.entity.Devices;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImportDeviceDTO {
    private String code;
    private String name;
    private String typeName;
    private BigDecimal price;
    private String laboratoriesManagerName;
    private Devices.Status status;
}
