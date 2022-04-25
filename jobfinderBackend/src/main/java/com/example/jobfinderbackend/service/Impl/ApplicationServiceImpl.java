package com.example.jobfinderbackend.service.Impl;

import com.example.jobfinderbackend.model.ApplicationModel;
import com.example.jobfinderbackend.repository.ApplicationRepository;
import com.example.jobfinderbackend.repository.JobRepository;
import com.example.jobfinderbackend.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Override
    public ApplicationModel saveApplication(ApplicationModel applicationModel) {
        applicationModel.setCreatedAt(new Date());
        applicationModel.setUpdatedAt(new Date());
        return applicationRepository.save(applicationModel);
    }

    @Override
    public ApplicationModel findApplicationById(Long id) {
        return applicationRepository.findById(id).get();
    }

    @Override
    public List<ApplicationModel> findApplicationByJobId(Long jobId) {
        return applicationRepository.findAllByJob_Id(jobId);
    }

    @Override
    public List<ApplicationModel> findApplicationByUserId(Long userId) {
        return applicationRepository.findAllByUser_Id(userId);
    }
}
