package com.example.jobfinderbackend.controller;

import com.example.jobfinderbackend.model.UserModel;
import com.example.jobfinderbackend.payload.AddCompanyToUserReq;
import com.example.jobfinderbackend.payload.SignInReq;
import com.example.jobfinderbackend.service.Impl.AuthServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private AuthServiceImpl authServiceImpl;

    @PostMapping(value = "/signin")
    public ResponseEntity<?> login(@RequestBody SignInReq signInReq) {
        UserModel user = authServiceImpl.signIn(signInReq);
        user.setPassword(null);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<?> signUp(@RequestBody UserModel signUpReq) {
        return new ResponseEntity<>(authServiceImpl.signUp(signUpReq), HttpStatus.OK);
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getUser(@RequestParam(value = "token") Long token) {
        return new ResponseEntity<>(authServiceImpl.findById(token), HttpStatus.OK);
    }

    // add companyId to admin user
    @PostMapping(value = "/user/add/company")
    public ResponseEntity<?> addCompanyToUser(@RequestBody AddCompanyToUserReq Req) {
        return new ResponseEntity<>(authServiceImpl.addCompanyToUser(Req), HttpStatus.OK);
    }

    //Get all admins By companyId
    @RequestMapping(value = "/admin", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getAllAdminsByCompanyId(@RequestParam(value = "companyId") Long companyId) {
        return new ResponseEntity<>(authServiceImpl.getAdminsByCompanyId(companyId), HttpStatus.OK);
    }

    // Approve user to manage company
    @PostMapping(value = "/admin/approve/{userId}")
    public ResponseEntity<?> approveAdmin(@PathVariable("userId") Long userId) {
        return new ResponseEntity<>(authServiceImpl.approveAdmin(userId), HttpStatus.OK);
    }

    // Add Hrs
    @PostMapping(value = "/hr")
    public ResponseEntity<?> createHR(@RequestBody UserModel user) {
        return new ResponseEntity<>(authServiceImpl.createHR(user), HttpStatus.OK);
    }

    // Get all Hrs By companyId
    @RequestMapping(value = "/hr", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getAllHrsByCompanyId(@RequestParam(value = "companyId") Long companyId) {
        return new ResponseEntity<>(authServiceImpl.getHRsByCompanyId(companyId), HttpStatus.OK);
    }
}
