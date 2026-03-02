package com.uet.model.specification.laboratories;

import com.uet.model.entity.Devices;
import com.uet.model.entity.Laboratories;
import com.uet.model.form.devices.DeviceFilterForm;
import jakarta.persistence.criteria.*;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class LabForIdSpecification {
    @SuppressWarnings("deprecation")
    public static Specification<Devices> buildWhere(Integer deviceId, DeviceFilterForm form) {

        Specification<Devices> where = Specification.where(new CustomSpecification("deviceId", deviceId));
        if (form == null) return where;

        if (form.getQ() != null && !StringUtils.isEmpty(form.getQ().trim())) {
            String search = form.getQ().trim();
            LabForIdSpecification.CustomSpecification nameSpecification = new LabForIdSpecification.CustomSpecification("name", search);

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

            if (field.equalsIgnoreCase("deviceId")) {
                return criteriaBuilder.like(root.get("devices").get("id"), value.toString());
            }
            if (field.equalsIgnoreCase("name")) {
                return criteriaBuilder.like(root.get("name"), "%" + value.toString() + "%");
            }

            return null;
        }
    }
}
