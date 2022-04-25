package com.example.jobfinderbackend.repository;

import com.example.jobfinderbackend.model.JobModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<JobModel, Long> {
    List<JobModel> findAllByTitleStartsWith(String title);

//    List<JobModel> findAllByTitle(@Param("title") String title);
    @Query(value = "SELECT * FROM jobs WHERE title LIKE %:title%", nativeQuery = true)
    List<JobModel> findByTitleContaining(String title);
    List<JobModel> findAllByCreatedBy(Long id);
    List<JobModel> findAllByCityAndState(String city, String state);
}
