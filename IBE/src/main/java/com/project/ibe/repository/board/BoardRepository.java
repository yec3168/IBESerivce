package com.project.ibe.repository.board;

import com.project.ibe.entity.board.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findByBoardStatus(boolean boardStatus);
    Optional<Board> findByBoardId(Long boardId);
}
