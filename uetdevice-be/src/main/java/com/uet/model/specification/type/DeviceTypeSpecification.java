package com.uet.model.specification.type;


import com.uet.model.entity.DeviceType;
import com.uet.model.form.type.TypeFilterForm;
import jakarta.persistence.criteria.*;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class DeviceTypeSpecification {

    @SuppressWarnings("deprecation")
    public static Specification<DeviceType> buildWhere(TypeFilterForm form) {

        Specification<DeviceType> where = null;
        if (form == null) return where;

        if (form.getQ() != null && !StringUtils.isEmpty(form.getQ().trim())) {
            String search = form.getQ().trim();
            CustomSpecification nameSpecification = new CustomSpecification("name", search);

            where = Specification
                    .where(nameSpecification
                    );
        }

        return where;
    }

    @SuppressWarnings("serial")
    @RequiredArgsConstructor
    static class CustomSpecification implements Specification<DeviceType> {

        @NonNull
        private String field;

        @NonNull
        private Object value;

        @SuppressWarnings({ "rawtypes", "unchecked" })
        @Override
        public Predicate toPredicate(
                Root<DeviceType> root,
                CriteriaQuery<?> query,
                CriteriaBuilder criteriaBuilder) {


            if (field.equalsIgnoreCase("name")) {
                return criteriaBuilder.like(root.get("name"), "%" + value.toString() + "%");
            }

            return null;
        }
    }
}
