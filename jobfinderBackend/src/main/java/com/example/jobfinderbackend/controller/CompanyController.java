package com.example.jobfinderbackend.controller;

import com.example.jobfinderbackend.model.CompanyModel;
import com.example.jobfinderbackend.model.UserModel;
import com.example.jobfinderbackend.service.Impl.CompanyServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/v1/company")
public class CompanyController {
    @Autowired
    private CompanyServiceImpl companyServiceImpl;

    // Create Company
    @PostMapping()
    public ResponseEntity<?> createCompany(@RequestBody CompanyModel companyReq) {
        return new ResponseEntity<>(companyServiceImpl.save(companyReq), HttpStatus.OK);
    }

    // Get all companies
    @RequestMapping(method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getAllCompany() {
        return new ResponseEntity<>(companyServiceImpl.findAll(), HttpStatus.OK);
    }

    // Get company by id
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getCompanyById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(companyServiceImpl.findById(id), HttpStatus.OK);
    }

    // Get all companies by OwnerId
    @RequestMapping(value = "/owner/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getAllCompanyByOwnerId(@PathVariable("id") Long id) {
        return new ResponseEntity<>(companyServiceImpl.findAllByOwnerId(id), HttpStatus.OK);
    }
}
