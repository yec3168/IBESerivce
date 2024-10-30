package com.project.ibe.repository;

import com.project.ibe.entity.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    boolean existsByMemberEmail(String memberEmail);
    Member findByMemberEmail(String memberEmail);
    boolean existsByMemberPhone (String memberPhone);
}
