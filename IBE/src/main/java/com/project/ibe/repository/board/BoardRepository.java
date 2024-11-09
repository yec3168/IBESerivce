package com.project.ibe.repository.board;

import com.project.ibe.entity.board.Board;
import com.project.ibe.entity.common.BoardCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByBoardStatus(boolean boardStatus);
    Optional<Board> findByBoardId(Long boardId);
    List<Board> findByBoardStatusAndBoardCategoryAndBoardTitleContaining(boolean boardStatus, BoardCategory category, String search);
    List<Board> findByBoardStatusAndBoardCategoryAndMember_MemberNickName(boolean boardStatus,BoardCategory category,String search);

    List<Board> findByBoardStatusAndBoardTitleContaining(boolean boardStatus, String search);

    List<Board> findByBoardStatusAndMember_MemberNickName(boolean boardStatus, String search);
    List<Board> findByBoardStatusAndBoardCategory(boolean boardStatus,BoardCategory category);
}
