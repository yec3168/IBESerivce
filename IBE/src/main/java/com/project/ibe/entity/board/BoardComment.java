package com.project.ibe.entity.board;

import com.project.ibe.entity.member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "board_comment")
@NoArgsConstructor(access = AccessLevel.PUBLIC) //prote
public class BoardComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardCommentId;

    @Column(nullable = false)
    private String boardCommentContent;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime boardCommentCreatedAt;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
