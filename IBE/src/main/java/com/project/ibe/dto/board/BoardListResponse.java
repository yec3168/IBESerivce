package com.project.ibe.dto.board;

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
    private LocalDateTime boardCreatedAt;
    private int boardHit;

}
