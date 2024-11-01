package com.project.ibe.repository;

import com.project.ibe.entity.member.MemberBank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberBankRepository extends JpaRepository<MemberBank, Long> {
}
