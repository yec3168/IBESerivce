package com.project.ibe.entity.product;

import com.project.ibe.entity.member.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.mapping.ToOne;

import java.time.LocalDateTime;

@Entity
@Table(name = "product_reply")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductReply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_reply_id")
    private Long productReplyId;

    @Column(nullable = false)
    private String productReplyContent;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime productReplyCreatedAt;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "product_comment_id")
    private ProductComment productComment;


    @Builder
    public ProductReply(Product product, ProductComment productComment, Member member, String productReplyContent){
        this.product =product;
        this.productComment =productComment;
        this.member =member;
        this.productReplyContent = productReplyContent;
    }
}
