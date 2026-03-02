package com.uet.model.dto.maintenance;

import com.uet.model.entity.Maintenance;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeviceMaintenanceDTO {
    private int id;
    private String code;
    private String name;
    private Date maintenanceDate;
    private String maintenanceAddress;
    private String maintenanceDescription;
    private String maintenanceNote;
    private BigDecimal maintenanceExpense;
    private Maintenance.Status maintenanceStatus;
}
