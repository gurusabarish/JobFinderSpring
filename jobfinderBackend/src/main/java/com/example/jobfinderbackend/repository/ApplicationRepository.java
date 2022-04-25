package com.example.jobfinderbackend.repository;

import com.example.jobfinderbackend.model.ApplicationModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<ApplicationModel, Long> {
    List<ApplicationModel> findAllByJob_Id(Long id);
    List<ApplicationModel> findAllByUser_Id(Long id);
}
