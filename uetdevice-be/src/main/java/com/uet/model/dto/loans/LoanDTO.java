package com.uet.model.dto.loans;

import com.uet.model.entity.Loans;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoanDTO {
    private int id;
    private String name;
    private String contact;
    private String info;
    private Date loanDate;
    private Date returnDate;
    private Integer quantity;
    private Loans.Status status;
    private String purpose;
}
