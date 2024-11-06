package com.project.ibe.dto.board;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.ibe.entity.member.Member;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardCommentResponse {

    private Long boardCommentId;

    private String boardCommentContent;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime boardCommentCreatedAt;
    // 작성자.
    private Member member;


    // 대댓글 리스트.


}
