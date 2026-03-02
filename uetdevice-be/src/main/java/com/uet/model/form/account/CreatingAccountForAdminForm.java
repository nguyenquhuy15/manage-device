package com.uet.model.form.account;

import com.uet.model.entity.Account;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatingAccountForAdminForm extends CreatingAccountForm{
    @NotNull
    private Account.Status status;

}
