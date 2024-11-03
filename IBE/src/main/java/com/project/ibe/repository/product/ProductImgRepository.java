package com.project.ibe.repository.product;

import com.project.ibe.entity.product.Product;
import com.project.ibe.entity.product.ProductComment;
import com.project.ibe.entity.product.ProductImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImgRepository extends JpaRepository<ProductImg, Long> {

    // 물품의 대한 이미지 리스트 조회.
    List<ProductImg> findAllByProduct(Product product);
    List<ProductImg> findByProduct_ProductId(Long productId);
}
