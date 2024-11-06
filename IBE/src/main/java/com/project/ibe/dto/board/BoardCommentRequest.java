package com.project.ibe.dto.board;

import lombok.Data;

@Data
public class BoardCommentRequest {
    public Long boardId;
    public String boardCommentContent;
}
