package com.example.jobfinderbackend.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddCompanyToUserReq {
    private Long userId;
    private Long companyId;
}
