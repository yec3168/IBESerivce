package com.project.ibe.repository.points;

import com.project.ibe.entity.points.PointCharge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PointChargeRepository extends JpaRepository<PointCharge, String> {
    Optional<PointCharge> findByPartnerOrderId(String partnerOrderId);
}
