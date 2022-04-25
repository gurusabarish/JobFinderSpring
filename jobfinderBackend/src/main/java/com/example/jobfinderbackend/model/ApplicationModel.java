package com.example.jobfinderbackend.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "applications")
public class ApplicationModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(targetEntity = JobModel.class)
    @JoinColumn(name = "job_id", nullable = false)
    private JobModel job;

    @ManyToOne(targetEntity = UserModel.class)
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user;

    private ApplicationStatusEnum status;
    private String resumeLink;

    private Date createdAt;
    private Date updatedAt;
}
