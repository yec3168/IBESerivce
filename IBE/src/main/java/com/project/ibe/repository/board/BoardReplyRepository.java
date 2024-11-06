package com.project.ibe.repository.board;

import com.project.ibe.entity.board.BoardComment;
import com.project.ibe.entity.board.BoardReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardReplyRepository extends JpaRepository<BoardReply, Long> {
    List<BoardReply> findAllByBoardComment(BoardComment boardComment);
}
