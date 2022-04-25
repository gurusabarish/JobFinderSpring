package com.example.jobfinderbackend.repository;

import com.example.jobfinderbackend.model.CompanyModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<CompanyModel, Long> {
    List<CompanyModel> findAllByOwnerId(Long id);
}
