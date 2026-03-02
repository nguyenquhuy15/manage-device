package com.uet.model.dto.department;

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
    private String laboratoriesName;
    private Integer detailsId;

    private Date detailsAssignmentDate;
    private String detailsNote;
}
