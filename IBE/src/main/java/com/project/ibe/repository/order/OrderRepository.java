package com.project.ibe.repository.order;

import com.project.ibe.entity.member.Member;
import com.project.ibe.entity.order.Order;
import com.project.ibe.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByProductAndOrderMember(Product product, Member orderMember);

    List<Order> findAllByOrderMemberOrderByOrderIdDesc(Member orderMember);
}
