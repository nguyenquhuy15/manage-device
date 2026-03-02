package com.uet.model.form.loans;

import com.uet.model.validation.loan.DeviceNoLoan;
import com.uet.model.validation.loan.LoanNameNotExists;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor(force = true)
@AllArgsConstructor
public class CreatingLoanForm {
    private int id;
    @NotBlank
    private String name;

    @NotBlank
    private String contact;

    @NotBlank
    @Email
    @Length(min = 6, max = 30)
    private String info;

    @NotNull
    private Date loanDate;

    @NotBlank
    private String purpose;

    private List<@DeviceNoLoan Integer> deviceIds;
}
