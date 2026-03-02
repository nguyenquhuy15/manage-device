package com.uet.model.form.loans;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.uet.model.entity.Loans;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoansFilterForm {

    @JsonProperty("q")
    private String q;

    private Date loanDate;
    private Date returnDate;
    private Loans.Status status;
}
