package com.project.ibe.dto.board;

import com.project.ibe.entity.common.BoardCategory;
import lombok.Data;

@Data
public class BoardFormRequest {
    private BoardCategory boardCategory;
    private String boardTitle;
    private String boardContent;
}
