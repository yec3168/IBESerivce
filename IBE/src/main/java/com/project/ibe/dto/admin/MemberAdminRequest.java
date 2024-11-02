package com.project.ibe.dto.admin;

import com.project.ibe.entity.common.Role;
import lombok.Data;

@Data
public class MemberAdminRequest {
    private String memberEmail;
    private Role role;
    private String memberPassword;
    private String memberName;
}
