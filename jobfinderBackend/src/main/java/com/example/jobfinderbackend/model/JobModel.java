package com.example.jobfinderbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "jobs")
public class JobModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String description;
    private Integer experience;
    private String salary;

    private String country;
    private String state;
    private String city;
    private String address;
    private Integer zipCode;

    private boolean closed;

    private Long companyId;
    private Long createdBy;

    private Date createdAt;
    private Date updatedAt;
}
