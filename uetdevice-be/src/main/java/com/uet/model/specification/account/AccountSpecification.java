package com.uet.model.specification.account;

import com.uet.model.entity.Account;
import com.uet.model.form.account.AccountFilterForm;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class AccountSpecification {
    @SuppressWarnings("deprecation")
    public static Specification<Account> buildWhere(AccountFilterForm form) {

        Specification<Account> where = null;

        if (form == null) return where;

        if (form.getQ() != null && !StringUtils.isEmpty(form.getQ().trim())) {
            String search = form.getQ().trim();
            CustomSpecification fullnameSpecification = new CustomSpecification("fullname", search);
            CustomSpecification usernameSpecification = new CustomSpecification("username", search);

            where = Specification
                    .where(fullnameSpecification
                            .or(usernameSpecification)
                    );
        }

        if (form.getRole() != null) {
            CustomSpecification roleSpecification = new CustomSpecification("role", form.getRole());
            if (where == null) {
                where = roleSpecification;
            } else {
                where = where.and(roleSpecification);
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
    static class CustomSpecification implements Specification<Account> {

        @NonNull
        private String field;

        @NonNull
        private Object value;

        @SuppressWarnings({"rawtypes", "unchecked"})
        @Override
        public Predicate toPredicate(
                Root<Account> root,
                CriteriaQuery<?> query,
                CriteriaBuilder criteriaBuilder) {

            if (field.equalsIgnoreCase("fullname")) {
                return criteriaBuilder.like(root.get("fullname"), "%" + value.toString() + "%");
            }

            if (field.equalsIgnoreCase("username")) {
                return criteriaBuilder.like(root.get("username"), "%" + value.toString() + "%");
            }

            if (field.equalsIgnoreCase("role")) {
                return criteriaBuilder.equal(root.get("role"), value);
            }
            if (field.equalsIgnoreCase("status")) {
                return criteriaBuilder.equal(root.get("status"), value);
            }
            return null;
        }
    }


}
