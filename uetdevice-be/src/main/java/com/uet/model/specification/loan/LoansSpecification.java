package com.uet.model.specification.loan;

import com.uet.model.entity.Loans;
import com.uet.model.form.loans.LoansFilterForm;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.Date;

public class LoansSpecification {
    @SuppressWarnings("deprecation")
    public static Specification<Loans> buildWhere(LoansFilterForm form) {

        Specification<Loans> where = null;

        if (form == null) return where;

        if (form.getQ() != null && !StringUtils.isEmpty(form.getQ().trim())) {
            String search = form.getQ().trim();
            CustomSpecification nameSpecification = new CustomSpecification("name", search);
            CustomSpecification contactSpecification = new CustomSpecification("contact", search);
            CustomSpecification infoSpecification = new CustomSpecification("info", search);
            CustomSpecification purposeSpecification = new CustomSpecification("purpose", search);


            where = Specification
                    .where(nameSpecification
                            .or(contactSpecification)
                            .or(infoSpecification)
                            .or(purposeSpecification)
                    );
        }

        if (form.getLoanDate() != null) {
            CustomSpecification loanDateSpecification = new CustomSpecification("loanDate", form.getLoanDate());
            if (where == null) {
                where = loanDateSpecification;
            } else {
                where = where.and(loanDateSpecification);
            }
        }
        if (form.getReturnDate() != null) {
            CustomSpecification returnSpecification = new CustomSpecification("returnDate", form.getReturnDate());
            if (where == null) {
                where = returnSpecification;
            } else {
                where = where.and(returnSpecification);
            }
        }
        if (form.getStatus() != null) {
            CustomSpecification statusSpecification = new CustomSpecification("status", form.getStatus());
            if (where == null) {
                where = statusSpecification;
            } else {
                where = where.and(statusSpecification);
            }
        }
        return where;
    }

    @SuppressWarnings("serial")
    @RequiredArgsConstructor
    static class CustomSpecification implements Specification<Loans> {

        @NonNull
        private String field;

        @NonNull
        private Object value;

        @SuppressWarnings({"rawtypes", "unchecked"})
        @Override
        public Predicate toPredicate(
                Root<Loans> root,
                CriteriaQuery<?> query,
                CriteriaBuilder criteriaBuilder) {

            if (field.equalsIgnoreCase("name")) {
                return criteriaBuilder.like(root.get("name"), "%" + value.toString() + "%");
            }
            if (field.equalsIgnoreCase("contact")) {
                return criteriaBuilder.like(root.get("contact"), "%" + value.toString() + "%");
            }
            if (field.equalsIgnoreCase("info")) {
                return criteriaBuilder.like(root.get("info"), "%" + value.toString() + "%");
            }
            if (field.equalsIgnoreCase("loanDate")) {
                return criteriaBuilder.greaterThanOrEqualTo(
                        root.get("loanDate").as(java.sql.Date.class),
                        (Date) value);
            }

            if (field.equalsIgnoreCase("returnDate")) {
                return criteriaBuilder.lessThanOrEqualTo(
                        root.get("returnDate").as(java.sql.Date.class),
                        (Date) value);
            }
            if (field.equalsIgnoreCase("status")) {
                return criteriaBuilder.equal(root.get("status"), value);
            }

            return null;
        }
    }
}
