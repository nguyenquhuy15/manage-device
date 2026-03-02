package com.uet.model.specification.laboratories;


import com.uet.model.entity.Laboratories;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import org.springframework.util.StringUtils;

public class LaboratoriesSpecification {
    @SuppressWarnings("deprecation")
    public static Specification<Laboratories> buildWhere(String q) {

        Specification<Laboratories> where = null;

        if (q != null && !StringUtils.isEmpty(q.trim())) {
            String search = q.trim();
            LaboratoriesSpecification.CustomSpecification nameSpecification = new LaboratoriesSpecification.CustomSpecification("name", search);

            where = Specification
                    .where(nameSpecification
                    );
        }

        return where;
    }

    @SuppressWarnings("serial")
    @RequiredArgsConstructor
    static class CustomSpecification implements Specification<Laboratories> {

        @NonNull
        private String field;

        @NonNull
        private Object value;

        @SuppressWarnings({ "rawtypes", "unchecked" })
        @Override
        public Predicate toPredicate(
                Root<Laboratories> root,
                CriteriaQuery<?> query,
                CriteriaBuilder criteriaBuilder) {


            if (field.equalsIgnoreCase("name")) {
                return criteriaBuilder.like(root.get("name"), "%" + value.toString() + "%");
            }

            return null;
        }
    }
}
