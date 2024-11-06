package com.project.ibe.dto.board;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import com.project.ibe.entity.member.Member;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class BoardCommentResponse {

    private Long boardCommentId;

    private String boardCommentContent;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime boardCommentCreatedAt;
    // 작성자.
    private Member member;


    // 대댓글 리스트.
    // 대댓글 리스트 초기화
    @JsonManagedReference // 이 애너테이션을 추가
    private List<BoardReplyResponse> boardReplyResponseList = new ArrayList<>(); // 빈 리스트로 초기화

}
