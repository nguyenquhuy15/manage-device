package com.uet.model.form.type;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class CreatingTypeForm {
    private String name;
    private String code;
}
