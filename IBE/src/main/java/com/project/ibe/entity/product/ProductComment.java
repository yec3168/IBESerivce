package com.project.ibe.entity.product;

import com.project.ibe.entity.member.Member;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product_comment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_comment_id")
    private Long productCommentId;

    @Column(nullable = false)
    private String productCommentContent;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime productCommentCreatedAt;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    // 대댓글 리스트 필드 추가
    @OneToMany(mappedBy = "productComment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductReply> productReplyList = new ArrayList<>();

    @Builder
    public ProductComment(String productCommentContent, Product product, Member member){
        this.productCommentContent = productCommentContent;
        this.product = product;
        this.member = member;
    }
}
