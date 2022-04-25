package com.example.jobfinderbackend.service.Impl;

import com.example.jobfinderbackend.model.CompanyModel;
import com.example.jobfinderbackend.repository.CompanyRepository;
import com.example.jobfinderbackend.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public CompanyModel save(CompanyModel companyModel) {
        companyModel.setCreatedAt(new Date());
        companyModel.setUpdatedAt(new Date());

        return companyRepository.save(companyModel);
    }

    @Override
    public CompanyModel findById(Long id) {
        return companyRepository.findById(id).get();
    }

    @Override
    public List<CompanyModel> findAll() {
        return companyRepository.findAll();
    }

    @Override
    public List<CompanyModel> findAllByOwnerId(Long ownerId) {
        return companyRepository.findAllByOwnerId(ownerId);
    }
}
