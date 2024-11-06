package com.project.ibe.repository.member;

import com.project.ibe.entity.member.MemberBank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberBankRepository extends JpaRepository<MemberBank, Long> {
    Optional<MemberBank> findByMember_MemberId(Long memberId);
}
