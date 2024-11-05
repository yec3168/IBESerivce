package com.project.ibe.entity.board;

import com.project.ibe.entity.common.AuditingFields;
import com.project.ibe.entity.common.BoardCategory;
import com.project.ibe.entity.member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter @Setter
@Table(name = "board")
@NoArgsConstructor(access = AccessLevel.PUBLIC) //protected
public class Board extends AuditingFields {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BoardCategory boardCategory;

    private String boardTitle;

    private String boardContent;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

}
