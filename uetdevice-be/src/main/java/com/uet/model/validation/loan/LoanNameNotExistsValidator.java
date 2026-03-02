package com.uet.model.validation.loan;



import com.uet.service.LoansService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

public class LoanNameNotExistsValidator implements ConstraintValidator<LoanNameNotExists, String> {

	@Autowired
	private LoansService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String name, ConstraintValidatorContext context) {

		if (StringUtils.isEmpty(name)) {
			return true;
		}

		return !service.isLoanExistsByName(name);
	}
}