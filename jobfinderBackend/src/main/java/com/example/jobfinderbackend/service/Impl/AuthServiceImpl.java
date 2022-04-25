package com.example.jobfinderbackend.service.Impl;

import com.example.jobfinderbackend.model.CompanyModel;
import com.example.jobfinderbackend.model.UserModel;
import com.example.jobfinderbackend.model.UserRoleEnum;
import com.example.jobfinderbackend.payload.AddCompanyToUserReq;
import com.example.jobfinderbackend.payload.SignInReq;
import com.example.jobfinderbackend.repository.UserRepository;
import com.example.jobfinderbackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserModel signUp(UserModel user) {
        if(user.getRole().equals(UserRoleEnum.ROLE_ADMIN)){ user.setEnabled(false); }
        else { user.setEnabled(true); }
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());

        return userRepository.save(user);
    }

    @Override
    public UserModel signIn(SignInReq signInReq) {
        return userRepository.findByEmailAndPassword(signInReq.getEmail(), signInReq.getPassword());
    }

    @Override
    public UserModel findById(Long id) {
        UserModel user = userRepository.findById(id).get();
        user.setPassword(null);
        return user;
    }

    @Override
    public UserModel getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Add company to admin's company field
    @Override
    public Map addCompanyToUser(AddCompanyToUserReq addCompanyToAdminReq) {
        UserModel user = userRepository.findById(addCompanyToAdminReq.getUserId()).get();
        if(user.getRole().equals(UserRoleEnum.ROLE_ADMIN))
            user.setAdminCompanyId(addCompanyToAdminReq.getCompanyId());
        else if (user.getRole().equals(UserRoleEnum.ROLE_HR))
            user.setHRCompanyId(addCompanyToAdminReq.getCompanyId());

        userRepository.save(user);

        Map<String, Boolean> response = new HashMap<>();
        response.put("added", Boolean.TRUE);

        return response;
    }

    // Get admins by company id
    @Override
    public List<UserModel> getAdminsByCompanyId(Long companyId) {
        return userRepository.findAllByAdminCompanyId(companyId);
    }

    @Override
    public UserModel approveAdmin(Long userId) {
        UserModel userModel = userRepository.findById(userId).get();
        userModel.setEnabled(true);

        UserModel res = userRepository.save(userModel);
        res.setPassword(null);
        return res;
    }

    @Override
    public UserModel createHR(UserModel user) {
        UserModel createdBy = userRepository.findById(user.getCreatedBy()).get();
        user.setHRCompanyId(createdBy.getAdminCompanyId());
        user.setRole(UserRoleEnum.ROLE_HR);
        user.setEnabled(true);
        user.setCreatedAt(new Date());
        user.setUpdatedAt(new Date());

        UserModel HR = userRepository.save(user);
        HR.setPassword(null);
        return HR;
    }

    @Override
    public List<UserModel> getHRsByCompanyId(Long companyId) {
        return userRepository.findAllByHRCompanyId(companyId);
    }
}
