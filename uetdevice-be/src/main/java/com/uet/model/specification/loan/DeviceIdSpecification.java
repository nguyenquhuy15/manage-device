package com.uet.model.specification.loan;

import com.uet.model.entity.Devices;
import com.uet.model.form.devices.DeviceFilterForm;
import com.uet.model.specification.device.DeviceSpecification;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class DeviceIdSpecification {
    @SuppressWarnings("deprecation")
    public static Specification<Devices> buildWhere(Integer deviceId, DeviceFilterForm form) {

        Specification<Devices> where = Specification.where(new CustomSpecification("deviceId", deviceId));

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

        @SuppressWarnings({ "rawtypes", "unchecked" })
        @Override
        public Predicate toPredicate(
                Root<Devices> root,
                CriteriaQuery<?> query,
                CriteriaBuilder criteriaBuilder) {


            if (field.equalsIgnoreCase("deviceId")) {
                return criteriaBuilder.like(root.get("loanDevices").get("loans").get("id"), value.toString());
            }
            if (field.equalsIgnoreCase("name")) {
                return criteriaBuilder.like(root.get("name"), "%" + value.toString() + "%");
            }

            if (field.equalsIgnoreCase("managerName")) {
                return criteriaBuilder.like(root.get("laboratories").get("managerName"), "%" + value.toString() + "%");
            }

            if (field.equalsIgnoreCase("type")) {
                return criteriaBuilder.like(root.get("type").get("name"), "%" + value.toString() + "%");
            }

            if (field.equalsIgnoreCase("laboratoriesName")) {
                return criteriaBuilder.like(root.get("laboratories").get("name"), "%" + value.toString() + "%");
            }
            if (field.equalsIgnoreCase("price")) {
                return criteriaBuilder.equal(root.get("price"), value);
            }

            if (field.equalsIgnoreCase("status")) {
                return criteriaBuilder.equal(root.get("status"), value);
            }
            return null;
        }
    }
}
