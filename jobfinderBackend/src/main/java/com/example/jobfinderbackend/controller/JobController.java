package com.example.jobfinderbackend.controller;

import com.example.jobfinderbackend.model.CompanyModel;
import com.example.jobfinderbackend.model.JobModel;
import com.example.jobfinderbackend.service.Impl.JobServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/job")
public class JobController {
    @Autowired
    private JobServiceImpl jobServiceImpl;

    // Create Job
    @PostMapping()
    public ResponseEntity<?> createCompany(@RequestBody JobModel jobReq) {
        return new ResponseEntity<>(jobServiceImpl.save(jobReq), HttpStatus.OK);
    }

    // Get job
    @GetMapping("/{id}")
    public ResponseEntity<?> getJob(@PathVariable("id") Long id) {
        return new ResponseEntity<>(jobServiceImpl.findById(id), HttpStatus.OK);
    }

    // get all job by HRID
    @RequestMapping(value = "/hr/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getAllJobsByHRId(@PathVariable("id") Long id) {
        return new ResponseEntity<>(jobServiceImpl.findAllByCreatedBy(id), HttpStatus.OK);
    }

    // get all job by city
    @RequestMapping(value = "/suggest", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getSuggestions(
            @RequestParam(value = "city") String city,
            @RequestParam(value = "state") String state
    ) {
        return new ResponseEntity<>(jobServiceImpl.findAllByCityAndState(city, state), HttpStatus.OK);
    }

    // get all job by Title
    @RequestMapping(value = "/title", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getJobByTitle(@RequestParam(value = "name") String name) {
        return new ResponseEntity<>(jobServiceImpl.findByTitleContainingIgnoreCase(name), HttpStatus.OK);
    }
}
