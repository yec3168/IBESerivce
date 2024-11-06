package com.project.ibe.repository.board;

import com.project.ibe.entity.board.Board;
import com.project.ibe.entity.board.BoardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardCommentRepository extends JpaRepository<BoardComment, Long> {

    List<BoardComment> findAllByBoard(Board board);
}
