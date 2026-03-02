package com.uet.service;

import com.uet.model.entity.Subjects;
import com.uet.repository.ISubjectsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class SubjectServiceImpl extends BaseService implements SubjectService {
    @Autowired
    private ISubjectsRepository subjectsRepository;
    @Override
    public Subjects getSubjectById(Integer id) {
        return subjectsRepository.findById(id).get();
    }

}
