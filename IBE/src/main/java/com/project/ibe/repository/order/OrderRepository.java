package com.project.ibe.repository.order;

import com.project.ibe.entity.common.OrderState;
import com.project.ibe.entity.member.Member;
import com.project.ibe.entity.order.Order;
import com.project.ibe.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByProductAndOrderMemberEmail(Product product, String orderMemberEmail);

    List<Order> findAllByOrderMemberEmailOrderByOrderIdDesc(String orderMemberEmail);

    //판매
    boolean existsByProduct(Product product);

    // Product으로 Order가져오기.
    List<Order> findAllByProductOrderByOrderIdDesc(Product product);


    Order findByOrderIdAndProductAndOrderMemberEmail(Long orderId, Product product, String orderMemberEmail);
//    List<Order> findAllByProductOrderByOrderIdDesc(Product product);

    Optional<Order> findByOrderStateInAndProduct(List<OrderState> orderStates, Product product);


}
