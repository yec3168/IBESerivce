package com.project.ibe.dto.admin;

import com.project.ibe.entity.common.Role;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;

import java.util.Date;

@Data
public class MemberListResponse {
    private Long memberId;
    private String memberName;
    private String memberNickName;
    private String memberPhone;
    private String memberAddr;
    private String memberAddrDetail;
    private String memberEmail;
    private Role role;
    private Date entryDate;
    private Date UpdateDate;
}
