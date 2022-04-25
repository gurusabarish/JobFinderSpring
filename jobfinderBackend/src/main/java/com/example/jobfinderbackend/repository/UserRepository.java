package com.example.jobfinderbackend.repository;

import com.example.jobfinderbackend.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {
    UserModel findByEmail(String username);
    UserModel findByEmailAndPassword(String email, String password);
    List<UserModel> findAllByAdminCompanyId(Long id);
    List<UserModel> findAllByHRCompanyId(Long id);
}
