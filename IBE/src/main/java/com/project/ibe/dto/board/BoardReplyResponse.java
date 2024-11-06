package com.project.ibe.dto.board;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.ibe.entity.board.BoardComment;
import com.project.ibe.entity.member.Member;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardReplyResponse {
    private Long boardReplyId;
    private String boardReplyContent;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime boardReplyCreatedAt;
    private Member member;

    @JsonBackReference // 이 애너테이션을 추가
    private BoardComment boardComment;
}
