package com.project.ibe.dto.board;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BoardListResponse {
    private Long boardId;
    private String boardTitle;
    private String memberNickName;
    private LocalDateTime boardCreatedAt;
    private int boardHit;

}
