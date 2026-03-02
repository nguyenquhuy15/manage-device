package com.uet.model.dto.Lab;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LabDTO {
    private int id;
    private String name;
    private String managerName;
}
