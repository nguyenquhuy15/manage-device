package com.uet.model.form.devices;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.uet.model.entity.Devices;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateDeviceForm {

    private Devices.Status status;
    @NotNull
    private Integer laboratoriesId;
    @NotNull
    private Integer typeId;
    @NotNull
    private String laboratoriesManagerName;

    private String detailsNote;
    private Date detailsAssignmentDate;

    private Date maintenanceDate;
    private String maintenanceDescription;


}
