package com.example.jobfinderbackend.service;

import com.example.jobfinderbackend.model.ApplicationModel;

import java.util.List;

public interface ApplicationService {
    ApplicationModel saveApplication(ApplicationModel applicationModel);
    ApplicationModel findApplicationById(Long id);
    List<ApplicationModel> findApplicationByJobId(Long jobId);
    List<ApplicationModel> findApplicationByUserId(Long userId);
//    ApplicationModel findApplicationByJobIdAndUserId(Long jobId, Long userId);
//    void deleteApplication(Long id);
}
