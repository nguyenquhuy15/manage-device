package com.uet.model.specification.device;

import com.uet.model.entity.Devices;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class DevicesStatusSpecification {

    @SuppressWarnings("deprecation")
    public static Specification<Devices> buildWhere(String q) {

        Specification<Devices> where = null;

        if (q != null && !StringUtils.isEmpty(q.trim())) {
            String search = q.trim();
            DeviceSpecification.CustomSpecification nameSpecification = new DeviceSpecification.CustomSpecification("status", search);

            where = Specification
                    .where(nameSpecification
                    );
        }

        return where;
    }

    @SuppressWarnings("serial")
    @RequiredArgsConstructor
    static class CustomSpecification implements Specification<Devices> {

        @NonNull
        private String field;

        @NonNull
        private Object value;

        @SuppressWarnings({ "rawtypes", "unchecked" })
        @Override
        public Predicate toPredicate(
                Root<Devices> root,
                CriteriaQuery<?> query,
                CriteriaBuilder criteriaBuilder) {


            if (field.equalsIgnoreCase("name")) {
                return criteriaBuilder.like(root.get("name"), "%" + value.toString() + "%");
            }

            return null;
        }
    }
}
