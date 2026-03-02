package com.uet.model.specification.loan;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;


import com.uet.model.entity.Devices;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

public class DeviceNoLoanSpecification {

	@SuppressWarnings("deprecation")
	public static Specification<Devices> buildWhere(String q) {

		Specification<Devices> where = new CustomSpecification("status", Devices.Status.AVAILABLE);

		if (q != null && !StringUtils.isEmpty(q.trim())) {
			String search = q.trim();

			CustomSpecification codeSpecification = new CustomSpecification("code", search);

			CustomSpecification devicesNameSpecification = new CustomSpecification("name", search);
			CustomSpecification managerNameSpecification = new CustomSpecification("managerName", search);
			CustomSpecification managerLabSpecification = new CustomSpecification("labName", search);
			CustomSpecification typeSpecification = new CustomSpecification("type", search);

			where = where.and(codeSpecification.or(devicesNameSpecification).or(managerNameSpecification).or(managerLabSpecification).or(typeSpecification));
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

			if (field.equalsIgnoreCase("managerName")) {
				return criteriaBuilder.like(root.get("laboratories").get("managerName"), "%" + value.toString() + "%");
			}
			if (field.equalsIgnoreCase("labName")) {
				return criteriaBuilder.like(root.get("laboratories").get("name"), "%" + value.toString() + "%");
			}

			if (field.equalsIgnoreCase("type")) {
				return criteriaBuilder.like(root.get("type").get("name"), "%" + value.toString() + "%");
			}

			return null;
		}
	}

}
