package com.uet.model.dto.devices;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.uet.model.entity.Devices;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeviceDTO {
    private int id;
    private String name;
    private String typeId;
    private String typeName;
    private String code;
    private BigDecimal price;
    private Integer laboratoriesId;
    private Date purchaseDate;

    private String laboratoriesManagerName;
    private Date warrantyDate;
    private Devices.Status status;
    private Integer total;
    private String laboratoriesName;
    private Integer detailsId;
    private Integer maintenanceId;
    private Date maintenanceDate;
    private String maintenanceDescription;

    private Date detailsAssignmentDate;
    private String detailsNote;

}
