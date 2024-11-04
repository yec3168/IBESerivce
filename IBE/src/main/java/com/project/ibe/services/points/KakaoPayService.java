package com.project.ibe.services.points;

import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.dto.points.ApproveResponse;
import com.project.ibe.dto.points.KakaoReadyResponse;
import com.project.ibe.entity.common.PayResult;
import com.project.ibe.entity.member.Member;
import com.project.ibe.entity.points.Pay;
import com.project.ibe.repository.member.MemberRepository;
import com.project.ibe.repository.points.PayRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoPayService {

    private final PayRepository payRepository;
    private final MemberRepository memberRepository;
    // 카카오페이 결제창 연결
    public KakaoReadyResponse payReady(String name, int totalPrice, PrincipalDTO principal) {
        String frontUrl ="http://localhost:3000/mypage/pntcharge";
        String partnerOrderId;
        do {
            partnerOrderId = UUID.randomUUID().toString().substring(0, 9); //주문번호
        }while(payRepository.existsById(partnerOrderId));
        // 회원 아이디, 주문번호 받아오는 로직 필요  jwt 토큰 구현후 작업필요.
        Map<String, String> parameters = new HashMap<>();
        parameters.put("cid", "TC0ONETIME");                                    // 가맹점 코드(테스트용)
        parameters.put("partner_order_id", partnerOrderId);                       // 주문번호
        parameters.put("partner_user_id", principal.getMemberName());           // 회원 아이디
        parameters.put("item_name", name);                                      // 상품명
        parameters.put("quantity", "1");                                        // 상품 수량
        parameters.put("total_amount", String.valueOf(totalPrice));             // 상품 총액
        parameters.put("tax_free_amount", "0");                                 // 상품 비과세 금액
        parameters.put("approval_url", frontUrl+"/completed");                       // 결제 성공 시 URL
        parameters.put("cancel_url", frontUrl+"/cancel");                            // 결제 취소 시 URL
        parameters.put("fail_url", frontUrl+"/fail");                                // 결제 실패 시 URL

        // HttpEntity : HTTP 요청 또는 응답에 해당하는 Http Header와 Http Body를 포함하는 클래스
        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        // RestTemplate
        // : Rest 방식 API를 호출할 수 있는 Spring 내장 클래스
        //   REST API 호출 이후 응답을 받을 때까지 기다리는 동기 방식 (json, xml 응답)
        RestTemplate template = new RestTemplate();
        String url = "https://open-api.kakaopay.com/online/v1/payment/ready";
        // RestTemplate의 postForEntity : POST 요청을 보내고 ResponseEntity로 결과를 반환받는 메소드
        ResponseEntity<KakaoReadyResponse> responseEntity = template.postForEntity(url, requestEntity, KakaoReadyResponse.class);
        log.info("결제준비 응답객체: " + responseEntity.getBody());
        if(!(responseEntity.getBody().getTid()==null ||responseEntity.getBody().getTid().isEmpty())) {
            Pay pay = new Pay();
            pay.setPayId(partnerOrderId);
            pay.setMemberName(principal.getMemberName());
            pay.setMemberEmail(principal.getMemberEmail());
            pay.setPayName(name);
            pay.setPayPoint((long)totalPrice/10);
            pay.setPay_price(totalPrice);
            pay.setTax_free_amount(0);
            pay.setPartnerOrderId(responseEntity.getBody().getTid());
            pay.setPayResult(PayResult.FAIL);
            payRepository.save(pay);
        }

        return responseEntity.getBody();
    }

    // 카카오페이 결제 승인
    // 사용자가 결제 수단을 선택하고 비밀번호를 입력해 결제 인증을 완료한 뒤,
    // 최종적으로 결제 완료 처리를 하는 단계
    @Transactional
    public ApproveResponse payApprove(String tid, String pgToken) {
        Pay pay = payRepository.findByPartnerOrderId(tid).orElseThrow();
        Map<String, String> parameters = new HashMap<>();
        // 회원 아이디, 주문번호 받아오는 로직 필요  jwt 토큰 구현후 작업필요.
        parameters.put("cid", "TC0ONETIME");              // 가맹점 코드(테스트용)
        parameters.put("tid", tid);                       // 결제 고유번호
        parameters.put("partner_order_id", pay.getPayId()); // 주문번호
        parameters.put("partner_user_id", pay.getMemberName());    // 회원 아이디
        parameters.put("pg_token", pgToken);              // 결제승인 요청을 인증하는 토큰

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(parameters, this.getHeaders());

        RestTemplate template = new RestTemplate();
        String url = "https://open-api.kakaopay.com/online/v1/payment/approve";
        log.info("결제승인 전송 시작");
        ApproveResponse approveResponse = template.postForObject(url, requestEntity, ApproveResponse.class);
        log.info("결제승인 응답객체: " + approveResponse);
        Member member = memberRepository.findByMemberEmail(pay.getMemberEmail()).orElseThrow();
        long points = (long) approveResponse.getAmount().getTotal()/10;
        member.setMemberPoint(member.getMemberPoint()+points);
        pay.setPayResult(PayResult.SUCCESS);
        return approveResponse;
    }

    // 카카오페이 측에 요청 시 헤더부에 필요한 값
    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "SECRET_KEY DEV1BC7211A061DB138C6F86AED4670B27C967EE");
        headers.set("Content-type", "application/json");
        return headers;
    }

}

