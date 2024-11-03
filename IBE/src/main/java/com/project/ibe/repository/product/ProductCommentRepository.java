package com.project.ibe.repository.product;

import com.project.ibe.entity.product.Product;
import com.project.ibe.entity.product.ProductComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCommentRepository extends JpaRepository<ProductComment, Long> {

    List<ProductComment> findAllByProduct(Product product);
}
