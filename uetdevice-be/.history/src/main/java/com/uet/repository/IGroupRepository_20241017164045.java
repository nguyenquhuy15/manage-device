package com.uet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uet.model.entity.Group;

public interface IGroupRepository extends JpaRepository<Group, Integer> {
}