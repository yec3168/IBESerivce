package com.project.ibe.dto.board;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.ibe.entity.common.BoardCategory;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardListResponse {
    private Long boardId;
    private BoardCategory boardCategory;
    private String boardTitle;
    private String memberNickName;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime boardCreatedAt;
    private int boardHit;
    private int boardCommentCnt;     //댓글 수.


}
