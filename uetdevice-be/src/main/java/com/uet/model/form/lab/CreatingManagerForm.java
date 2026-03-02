package com.uet.model.form.lab;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class CreatingManagerForm {
    @NotNull
    private String name;
    @NotNull
    private String managerName;

    @NotNull
    @Email
    private String email;

    @NotNull
    private String phone;

    private Integer departmentsId;
    private Integer subjectsId;

    @NotNull
    private String location;
}
