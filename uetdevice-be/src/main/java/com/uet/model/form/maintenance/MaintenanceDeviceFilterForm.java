package com.uet.model.form.maintenance;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.uet.model.entity.Maintenance;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceDeviceFilterForm {

    @JsonProperty("q")
    private String q;
    private String maintenanceDescription;
    private Maintenance.Status maintenanceStatus;
    private Date maintenanceDate;
}
