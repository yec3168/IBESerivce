package com.project.ibe.entity.product;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC) //protected
@Getter @Setter
@Table(name = "product_img")
public class ProductImg {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_img+id")
    private Long productImgId;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product; // 연관된 제품

    @Column(name = "image_path", nullable = false)
    private String imagePath; // 이미지 파일의 경로

    @Builder
    public ProductImg(Product product, String imagePath){
        this.product= product;
        this.imagePath = imagePath;
    }
}
