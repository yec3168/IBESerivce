package com.project.ibe.repository.product;

import com.project.ibe.entity.common.ProductUploadStatus;
import com.project.ibe.entity.member.Member;
import com.project.ibe.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByProductUploadStatus(ProductUploadStatus productUploadStatus);

    List<Product> findAllByMember(Member member);
}
