package com.project.ibe.dto.admin;

import com.project.ibe.entity.common.BoardCategory;
import com.project.ibe.entity.member.Member;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
public class ViewPostInfoResponse {
    private Long boardId;
    private String boardCategory;
    private String boardTitle;
    private String boardContent;
    private LocalDateTime boardCreatedAt;
    private int boardHit;
    private String memberNickName;
    private boolean boardStatus;
}
