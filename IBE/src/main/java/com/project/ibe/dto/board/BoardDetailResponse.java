package com.project.ibe.dto.board;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.ibe.entity.common.BoardCategory;
import com.project.ibe.entity.member.Member;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardDetailResponse {
    private Long boardId;
    private BoardCategory boardCategory;
    private String boardTitle;
    private Member member; // 게시글 작성자. 정보.
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime boardCreatedAt;
    private String boardContent;
    private int boardHit;
    private int boardCommentCnt;     //댓글 수.
    private boolean boardStatus;


}
