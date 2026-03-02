package com.uet.model.specification.device;

import com.uet.model.entity.Devices;
import com.uet.model.form.devices.DeviceFilterForm;
import jakarta.persistence.criteria.*;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;


public class DeviceSpecification {

    @SuppressWarnings("deprecation")
    public static Specification<Devices> buildWhere(DeviceFilterForm form) {

        Specification<Devices> where = null;

        if (form == null) return where;

        if (form.getQ() != null && !StringUtils.isEmpty(form.getQ().trim())) {
            String search = form.getQ().trim();
            CustomSpecification codeSpecification = new CustomSpecification("code", search);
            CustomSpecification devicesNameSpecification = new CustomSpecification("name", search);
            CustomSpecification managerNameSpecification = new CustomSpecification("managerName", search);
            CustomSpecification managerLabSpecification = new CustomSpecification("labName", search);
            CustomSpecification typeSpecification = new CustomSpecification("type", search);

            where = Specification
                    .where(codeSpecification
                            .or(devicesNameSpecification)
                            .or(managerNameSpecification)
                            .or(managerLabSpecification)
                            .or(typeSpecification)
                    );
        }

        if (form.getStatus() != null) {
            CustomSpecification statusSpecification = new CustomSpecification("status", form.getStatus());
            if (where == null) {
                where = statusSpecification;
            } else {
                where = where.and(statusSpecification);
            }
        }
        if (form.getMinPrice() != null) {
            CustomSpecification minPriceSpecification = new CustomSpecification("minPrice", form.getMinPrice());
            if (where == null) {
                where = minPriceSpecification;
            } else {
                where = where.and(minPriceSpecification);
            }
        }
        if (form.getMaxPrice() != null) {
            CustomSpecification maxPriceSpecification = new CustomSpecification("maxPrice", form.getMaxPrice());
            if (where == null) {
                where = maxPriceSpecification;
            } else {
                where = where.and(maxPriceSpecification);
            }
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

        @SuppressWarnings({"rawtypes", "unchecked"})
        @Override
        public Predicate toPredicate(
                Root<Devices> root,
                CriteriaQuery<?> query,
                CriteriaBuilder criteriaBuilder) {

            if (field.equalsIgnoreCase("code")) {
                return criteriaBuilder.like(root.get("code"), "%" + value.toString() + "%");
            }

            if (field.equalsIgnoreCase("name")) {
                return criteriaBuilder.like(root.get("name"), "%" + value.toString() + "%");
            }

            if (field.equalsIgnoreCase("managerName")) {
                return criteriaBuilder.like(root.get("laboratories").get("managerName"), "%" + value.toString() + "%");
            }
            if (field.equalsIgnoreCase("labName")) {
                return criteriaBuilder.like(root.get("laboratories").get("name"), "%" + value.toString() + "%");
            }

            if (field.equalsIgnoreCase("type")) {
                return criteriaBuilder.like(root.get("type").get("name"), "%" + value.toString() + "%");
            }

            if (field.equalsIgnoreCase("status")) {
                return criteriaBuilder.equal(root.get("status"), value);
            }
            if (field.equalsIgnoreCase("minPrice")) {
                return criteriaBuilder.greaterThanOrEqualTo(
                        root.get("price"), value.toString());
            }
            if (field.equalsIgnoreCase("maxPrice")) {
                return criteriaBuilder.lessThanOrEqualTo(
                        root.get("price"), value.toString());
            }

            return null;
        }
    }
}
