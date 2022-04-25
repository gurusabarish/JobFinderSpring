package com.example.jobfinderbackend.service;

import com.example.jobfinderbackend.model.JobModel;

import java.util.List;

public interface JobService {
    JobModel save(JobModel job);
    JobModel findById(Long id);
    List<JobModel> findAllByTitleStartsWith(String title);
    List<JobModel> findByTitleContainingIgnoreCase(String title);
    List<JobModel> findAllByCreatedBy(Long id);
    List<JobModel> findAllByCityAndState(String city, String state);

}
