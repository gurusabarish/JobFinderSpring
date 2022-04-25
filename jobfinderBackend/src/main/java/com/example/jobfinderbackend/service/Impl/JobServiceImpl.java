package com.example.jobfinderbackend.service.Impl;

import com.example.jobfinderbackend.model.JobModel;
import com.example.jobfinderbackend.repository.JobRepository;
import com.example.jobfinderbackend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class JobServiceImpl implements JobService {
    @Autowired
    private JobRepository jobRepository;

    @Override
    public JobModel save(JobModel job) {
        job.setCreatedAt(new Date());
        job.setUpdatedAt(new Date());
        return jobRepository.save(job);
    }

    @Override
    public JobModel findById(Long id) {
        return jobRepository.findById(id).get();
    }

    @Override
    public List<JobModel> findAllByTitleStartsWith(String title) {
        System.out.println(title);
        return jobRepository.findAllByTitleStartsWith(title);
    }

    @Override
    public List<JobModel> findByTitleContainingIgnoreCase(String title) {
        return jobRepository.findByTitleContaining(title);
    }

    @Override
    public List<JobModel> findAllByCreatedBy(Long id) {
        return jobRepository.findAllByCreatedBy(id);
    }

    @Override
    public List<JobModel> findAllByCityAndState(String city, String state) {
        return jobRepository.findAllByCityAndState(city, state);
    }
}
