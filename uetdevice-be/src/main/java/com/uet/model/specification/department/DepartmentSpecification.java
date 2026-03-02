package com.uet.model.specification.department;

import com.uet.model.entity.Laboratories;
import com.uet.model.entity.Subjects;
import com.uet.model.form.lab.LabFilterForm;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;

import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

public class DepartmentSpecification {

	@SuppressWarnings("deprecation")
	public static Specification<Laboratories> buildWhere(LabFilterForm form) {

		Specification<Laboratories> where = null;
		if (form == null) return where;

        if (form.getQ() != null && !StringUtils.isEmpty(form.getQ().trim())) {
			String search = form.getQ().trim();
			CustomSpecification nameSpecification = new CustomSpecification("name", search);
			CustomSpecification locationSpecification = new CustomSpecification("location", search);
			CustomSpecification departmentsNameSpecification = new CustomSpecification("departmentsName", search);
			CustomSpecification managersNameSpecification = new CustomSpecification("managerName", search);
			CustomSpecification emailSpecification = new CustomSpecification("email", search);
			CustomSpecification phoneSpecification = new CustomSpecification("phone", search);
			CustomSpecification subjectsNameSpecification = new CustomSpecification("subjectsName", search);

			where = Specification
						.where(nameSpecification
								.or(locationSpecification)
								.or(departmentsNameSpecification)
								.or(managersNameSpecification)
								.or(emailSpecification)
								.or(phoneSpecification)
								.or(subjectsNameSpecification)
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

			if (field.equalsIgnoreCase("location")) {
				return criteriaBuilder.like(root.get("location"), "%" + value.toString() + "%");
			}
			if (field.equalsIgnoreCase("departmentsName")) {
				return criteriaBuilder.like(root.get("departments").get("name"), "%" + value.toString() + "%");
			}
			if (field.equalsIgnoreCase("managerName")) {
				return criteriaBuilder.like(root.get("managerName"), "%" + value.toString() + "%");
			}

			if (field.equalsIgnoreCase("email")) {
				return criteriaBuilder.like(root.get("email"), "%" + value.toString() + "%");
			}
			if (field.equalsIgnoreCase("phone")) {
				return criteriaBuilder.like(root.get("phone"), "%" + value.toString() + "%");
			}

			if (field.equalsIgnoreCase("subjectsName")) {
				return criteriaBuilder.like(root.get("subjects").get("name"), "%" + value.toString() + "%");
			}

            return null;
		}
	}

}
