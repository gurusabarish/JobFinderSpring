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
@Table(name = "companies")
public class CompanyModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;

    private String email;
    private String phone;
    private String address;
    private String website;

    private Long ownerId;

    private Date createdAt;
    private Date updatedAt;
}
