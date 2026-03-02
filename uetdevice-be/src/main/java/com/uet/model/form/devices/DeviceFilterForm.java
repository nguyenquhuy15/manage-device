package com.uet.model.form.devices;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.uet.model.entity.Devices;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeviceFilterForm {

    @JsonProperty("q")
    private String q;

    private Devices.Status status;


    @PositiveOrZero
    private BigDecimal minPrice;

    @PositiveOrZero
    private BigDecimal maxPrice;

}
