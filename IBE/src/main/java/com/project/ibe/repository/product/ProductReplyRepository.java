package com.project.ibe.repository.product;

import com.project.ibe.entity.product.Product;
import com.project.ibe.entity.product.ProductComment;
import com.project.ibe.entity.product.ProductReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductReplyRepository extends JpaRepository<ProductReply, Long> {
    List<ProductReply> findAllByProduct(Product product);
    List<ProductReply> findAllByProductComment (ProductComment productComment);
}
