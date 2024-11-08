package com.project.ibe.services.points;



import com.project.ibe.dto.member.PrincipalDTO;
import com.project.ibe.dto.points.NhRequest;
import com.project.ibe.dto.points.NhResponse;
import com.project.ibe.entity.common.PayResult;
import com.project.ibe.entity.member.Member;
import com.project.ibe.entity.points.PointPayBack;
import com.project.ibe.repository.member.MemberRepository;
import com.project.ibe.repository.points.PointPayBackRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class NhService {
    private final MemberRepository memberRepository;
    private final PointPayBackRepository pointPayBackRepository;

    public NhResponse nh(NhRequest nhRequest, PrincipalDTO principal) {
        Member member = memberRepository.findByMemberEmail(principal.getMemberEmail()).orElseThrow();
        //보유 포인트와 환급 신청 포인트 비교
        if(Long.parseLong(nhRequest.getMemberPoint())>member.getMemberPoint()){
            return NhResponse.builder()
                    .msg("보유 포인트가 부족합니다.").build();
        }
        // 계좌이체 준비
        RestTemplate template = new RestTemplate();
        String url;
        // 농협(011,012)과 타행은 다른 OpenApi를 사용
        if(nhRequest.getBank().equals("011")||nhRequest.getBank().equals("012")) {
            url = "https://developers.nonghyup.com/ReceivedTransferAccountNumber.nh";
        }else {
            url = "https://developers.nonghyup.com/ReceivedTransferOtherBank.nh";
        }
        // 응답은 JSONObject 로 받은 후 프론트에 보낼 정보 가공후 전송
        JSONObject response;
        //환급 금액은 point *10
        String price = (Integer.parseInt(nhRequest.getMemberPoint())*10)+"";
        // id값은 밑에서 계좌이체의 기관거래고유번호로 저장
        String pointPayBackId;
        //농협의 데이터에 기관거래고유번호가 중복허용X 여서 중복이면 다시 랜덤값 발급 후 재전송
        while (true) {
            //농협의 OpenApi가 요구한 데이터 세팅
            JSONObject json = new JSONObject();
            Map<String, String> header = getNhHeader(nhRequest.getBank());
            json.put("Header", header);                                         //OpenApi가 요구한 Header 이름과 데이터.
            json.put("Bncd", nhRequest.getBank());                              //수취인 은행코드
            json.put("Acno", nhRequest.getBankAccountNumber());                 //수취인 계좌
            json.put("Tram", price);                                            //송금액
            json.put("DractOtlt", "아이비");                                     //송금자
            json.put("MractOtlt", principal.getMemberName());                   //수취인명
            HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(json);
            log.info("계좌이체를 전송 DATA = "+requestEntity.toString());
            // url로 만든 requestEntity를 전송 후 response를 JSONObject로 받아옴.
            response = template.postForObject(url, requestEntity, JSONObject.class);
            // 받아온 메세지가 "중복된 기관거래고유번호입니다. 다시 확인바랍니다."면 다시 생성 후 전송
            if (!response.toString().contains("중복된 기관거래고유번호입니다. 다시 확인바랍니다.")) {
                pointPayBackId =  header.get("IsTuno");
                break;
            }
        }
        // response 의 데이터 추출
        Map<String, String> responseHeader = (Map<String, String>) response.get("Header");
        log.info(pointPayBackId);
        String msg = responseHeader.get("Rsms");
        log.info("응답 msg : "+msg);
        PointPayBack pointPayBack = new PointPayBack();
        pointPayBack.setPointPayBackId(pointPayBackId);
        pointPayBack.setMemberEmail(member.getMemberEmail());
        pointPayBack.setMemberName(member.getMemberName());
        pointPayBack.setPointPayBackPoint(Long.parseLong(nhRequest.getMemberPoint()));
        pointPayBack.setPointPayBackPrice(Integer.parseInt(nhRequest.getMemberPoint())*10);
        if(msg.equals("정상처리 되었습니다.")){
            pointPayBack.setPointPayBackResult(PayResult.SUCCESS);
            member.setMemberPoint(member.getMemberPoint()-pointPayBack.getPointPayBackPoint());
        }else {
            pointPayBack.setPointPayBackResult(PayResult.FAIL);
        }
        pointPayBack.setBank(nhRequest.getBank());
        pointPayBack.setBankName(nhRequest.getBankName());
        pointPayBack.setBankAccountNumber(nhRequest.getBankAccountNumber());
        pointPayBackRepository.save(pointPayBack);

        return NhResponse.builder()
                .msg(msg)
                .memberName(pointPayBack.getMemberName())
                .bankName(pointPayBack.getBankName())
                .account(pointPayBack.getBankAccountNumber())
                .payBackPoint(pointPayBack.getPointPayBackPoint())
                .memberPoint(member.getMemberPoint())
                .build();

    }

    // 농협의 OpenAPI가 요구하는 헤더 세팅
    private Map<String, String> getNhHeader(String bankName) {
        String[] now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd HHmmss")).split(" ");
        Map<String, String> parameters = new HashMap<>();

        if(bankName.equals("011")||bankName.equals("012")) {
            parameters.put("ApiNm", "ReceivedTransferAccountNumber"); //사용할 Api 이름
        }else{
            parameters.put("ApiNm", "ReceivedTransferOtherBank"); //사용할 Api 이름
        }
        parameters.put("Tsymd",now[0]);                                 //계좌이체 날자
        parameters.put("Trtm",now[1]);                                  //겨좌이체 시간
        parameters.put("Iscd","002685");                                // 기관번호
        parameters.put("FintechApsno","001");                           // 핀테크 계좌(회사의계좌) 로그인후 코드 테스트모드는 001로 변경불가
        parameters.put("ApiSvcCd","ReceivedTransferA");                 // 테스트모드는 고정, 실제로는 핀테크 API서비스코드
        parameters.put("IsTuno", UUID.randomUUID().toString().substring(0,3));  // 랜덤값
        parameters.put("AccessToken","11eb0d96aa85e5efe673d19d5f856ea0c9a44e43f001b15a4a3033cccdc25027");//인증토큰
        return parameters;

    }
}
