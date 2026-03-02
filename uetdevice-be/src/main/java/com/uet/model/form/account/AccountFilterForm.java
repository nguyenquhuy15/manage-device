package com.uet.model.form.account;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.uet.model.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountFilterForm {
    @JsonProperty("q")
    private String q;
    private Account.Role role;
    private Account.Status status;
}
