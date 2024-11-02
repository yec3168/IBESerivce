package com.project.ibe.repository.product;

import com.project.ibe.entity.product.ProductComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCommentRepository extends JpaRepository<ProductComment, Long> {
}
