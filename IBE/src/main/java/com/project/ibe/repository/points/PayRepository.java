package com.project.ibe.repository.points;

import com.project.ibe.entity.points.Pay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PayRepository extends JpaRepository<Pay, String> {
    Optional<Pay> findByPartnerOrderId(String partnerOrderId);
}
