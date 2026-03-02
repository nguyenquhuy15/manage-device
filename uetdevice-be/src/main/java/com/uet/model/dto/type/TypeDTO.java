package com.uet.model.dto.type;

import com.uet.model.entity.Devices;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TypeDTO {
    private int id;
    private String name;
    private String code;
    private Integer quantity;
}
