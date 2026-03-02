package com.uet.model.specification.maintenance;

import com.uet.model.entity.Devices;
import com.uet.model.form.maintenance.MaintenanceDeviceFilterForm;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.Date;

public class MaintenanceSpecification {

    @SuppressWarnings("deprecation")
    public static Specification<Devices> buildWhere(MaintenanceDeviceFilterForm form) {

        Specification<Devices> where = new CustomSpecification("status", Devices.Status.MAINTENANCE);

        if (form == null) return where;

        if (form.getQ() != null && !StringUtils.isEmpty(form.getQ().trim())) {
            String search = form.getQ().trim();
            CustomSpecification codeSpecification = new CustomSpecification("code", search);
            CustomSpecification devicesNameSpecification = new CustomSpecification("name", search);
            CustomSpecification noteSpecification = new CustomSpecification("maintenanceNote", search);

            where = Specification
                    .where(codeSpecification
                            .or(devicesNameSpecification)
                            .or(noteSpecification)
                    );
        }

        if (form.getMaintenanceDescription() != null) {
            CustomSpecification descriptionSpecification = new CustomSpecification("maintenanceDescription", form.getMaintenanceDescription());
                where = where.and(descriptionSpecification);
        }
        if (form.getMaintenanceStatus() != null) {
            CustomSpecification statusSpecification = new CustomSpecification("maintenanceStatus", form.getMaintenanceStatus());
                where = where.and(statusSpecification);
        }
        if (form.getMaintenanceDate() != null) {
            CustomSpecification dateSpecification = new CustomSpecification("date", form.getMaintenanceDate());
                where = where.and(dateSpecification);
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

            if (field.equalsIgnoreCase("status")) {
                return criteriaBuilder.equal(root.get("status"), value);
            }

            if (field.equalsIgnoreCase("code")) {
                return criteriaBuilder.like(root.get("code"), "%" + value.toString() + "%");
            }

            if (field.equalsIgnoreCase("name")) {
                return criteriaBuilder.like(root.get("name"), "%" + value.toString() + "%");
            }

            if (field.equalsIgnoreCase("maintenanceNote")) {
                return criteriaBuilder.like(root.get("maintenance").get("note"), "%" + value.toString() + "%");
            }

            if (field.equalsIgnoreCase("maintenanceDescription")) {
                return criteriaBuilder.like(root.get("maintenance").get("description"), "%" + value.toString() + "%");
            }
            if (field.equalsIgnoreCase("maintenanceStatus")) {
                return criteriaBuilder.equal(root.get("maintenance").get("status"), value);
            }
            if (field.equalsIgnoreCase("date")) {
                return criteriaBuilder.equal(
                        root.get("maintenance").get("date").as(java.sql.Date.class),
                        (Date) value);
            }

            return null;
        }
    }


}
