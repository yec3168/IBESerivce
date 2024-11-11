package com.project.ibe.entity.member;

import com.project.ibe.entity.common.Bank;
import com.project.ibe.util.Encrypt256;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC) //protected
@Getter
@Setter
public class MemberBank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberBankId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Bank memberBank;            // 환급은행

    @Convert(converter = Encrypt256.class)
    @Column(nullable = false, unique = true)
    private String memberAccountNumber; // 환급계좌

    @Builder
    public MemberBank(Member member, Bank memberBank, String memberAccountNumber){
        this.member = member;
        this.memberBank = memberBank;
        this.memberAccountNumber = memberAccountNumber;
    }
}
