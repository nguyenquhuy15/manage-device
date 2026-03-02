package com.uet.model.dto.devices;

import com.uet.model.entity.Devices;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeviceCreatDTO {

    private int id;
    private Devices.Status status;
}
