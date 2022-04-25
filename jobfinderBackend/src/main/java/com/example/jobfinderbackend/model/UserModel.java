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
@Table(name = "users")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String email;
    private String password;
    private String phone;

    private UserRoleEnum role;

    private String name;
    private String country;
    private String state;
    private String city;
    private String address;
    private String zip;

    private boolean enabled;
    private boolean active;

    private Long adminCompanyId;
    private Long HRCompanyId;

    // For admin
    private Long createdBy;

    private Date createdAt;
    private Date updatedAt;
}
