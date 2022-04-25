package com.example.jobfinderbackend.controller;

import com.example.jobfinderbackend.model.ApplicationModel;
import com.example.jobfinderbackend.service.Impl.ApplicationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/v1/application")
public class ApplicationController {
    @Autowired
    private ApplicationServiceImpl applicationServiceImpl;

    @PostMapping("/apply")
    public ResponseEntity<?> createApplication(@RequestBody ApplicationModel application) {
        return new ResponseEntity<>(applicationServiceImpl.saveApplication(application), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}" ,method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getApplicationById(@PathVariable(value = "id") Long id) {
        return new ResponseEntity<>(applicationServiceImpl.findApplicationById(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/job/{id}" ,method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getApplicationByJobId(@PathVariable(value = "id") Long id) {
        return new ResponseEntity<>(applicationServiceImpl.findApplicationByJobId(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/user/{id}" ,method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getApplicationByUserId(@PathVariable(value = "id") Long id) {
        return new ResponseEntity<>(applicationServiceImpl.findApplicationByUserId(id), HttpStatus.OK);
    }
}
