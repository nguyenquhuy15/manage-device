package com.uet.model.form.maintenance;

import com.uet.model.entity.Maintenance;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateMaintenanceDeviceForm {
    private Date maintenanceDate;
    private String maintenanceDescription;
    private String maintenanceNote;
    private String maintenanceAddress;
    private BigDecimal maintenanceExpense;
    private Maintenance.Status maintenanceStatus;


}
