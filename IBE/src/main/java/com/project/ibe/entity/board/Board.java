package com.project.ibe.entity.board;

import com.project.ibe.entity.common.BoardCategory;
import com.project.ibe.entity.member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;



@Entity
@Getter @Setter
@Table(name = "board")
@NoArgsConstructor(access = AccessLevel.PUBLIC) //protected
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long boardId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BoardCategory boardCategory;

    @Column(nullable = false)
    private String boardTitle;

    @Column(nullable = false)
    private String boardContent;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime boardCreatedAt;

    @Column(nullable = false)
    private int boardHit;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

}
