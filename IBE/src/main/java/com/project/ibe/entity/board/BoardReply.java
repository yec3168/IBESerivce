package com.project.ibe.entity.board;

import com.project.ibe.entity.member.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "board_reply")
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class BoardReply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardReplyId;

    @Column(nullable = false)
    private String boardReplyContent;

    @Column(nullable = false)
    private LocalDateTime boardReplyCreatedAt;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "board_comment_id")
    private BoardComment boardComment;


    @Builder
    public BoardReply(String boardReplyContent, Board board, BoardComment boardComment, Member member){
        this.boardReplyContent = boardReplyContent;
        this.board = board;
        this.boardComment = boardComment;
        this.member = member;
    }
}
