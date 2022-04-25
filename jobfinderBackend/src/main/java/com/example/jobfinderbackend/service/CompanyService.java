package com.example.jobfinderbackend.service;

import com.example.jobfinderbackend.model.CompanyModel;

import java.util.List;

public interface CompanyService {
    CompanyModel save(CompanyModel companyModel);
    CompanyModel findById(Long id);
    List<CompanyModel> findAll();
    List<CompanyModel> findAllByOwnerId(Long adminId);
}
