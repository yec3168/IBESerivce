package com.project.ibe.dto.board;

import lombok.Data;

@Data
public class BoardReplyRequest {
    private Long boardId;
    private Long boardCommentId;
    private String productReplyContent;
}
