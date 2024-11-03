package com.project.ibe.services.points;



import com.project.ibe.dto.points.NhRequest;
import com.project.ibe.dto.points.NhResponse;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
public class NhService {
    public NhResponse nh(NhRequest nhRequest) {
        RestTemplate template = new RestTemplate();
        String url;
        if(nhRequest.getBankName().equals("011")||nhRequest.getBankName().equals("012")) {
            url = "https://developers.nonghyup.com/ReceivedTransferAccountNumber.nh";
        }else {
            url = "https://developers.nonghyup.com/ReceivedTransferOtherBank.nh";
        }
        JSONObject response;
        /*
        사용자의 보유 포인트와 환급신청 포인트 비교로직 필요.
         */
        String price = (Integer.parseInt(nhRequest.getMemberPoint())*10)+"";
        while (true) {
            JSONObject json = new JSONObject();
            json.put("Header", this.getNhHeader(nhRequest.getBankName()));
            json.put("Bncd", nhRequest.getBankName());
            json.put("Acno", nhRequest.getBankAccountNumber());
            json.put("Tram", price);
            json.put("DractOtlt", "아이비");
            json.put("MractOtlt", "홍길동");
            HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(json);
            log.info("계좌이체를 전송 DATA = "+requestEntity.toString());
            response = template.postForObject(url, requestEntity, JSONObject.class);
            if (!response.toString().contains("중복된 기관거래고유번호입니다. 다시 확인바랍니다.")) {
                break;
            }
        }

        log.info("계좌이체 응답 DATA = "+response.toString());
        return NhResponse.builder().response(response).build();

    }

    private Map<String, String> getNhHeader(String bankName) {
        String[] now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd HHmmss")).split(" ");
        Map<String, String> parameters = new HashMap<>();

        if(bankName.equals("011")||bankName.equals("012")) {
            parameters.put("ApiNm", "ReceivedTransferAccountNumber"); //사용할 Api 이름
        }else{
            parameters.put("ApiNm", "ReceivedTransferOtherBank"); //사용할 Api 이름
        }
        parameters.put("Tsymd",now[0]);
        parameters.put("Trtm",now[1]);
        parameters.put("Iscd","002685");
        parameters.put("FintechApsno","001");
        parameters.put("ApiSvcCd","ReceivedTransferA");
        parameters.put("IsTuno", UUID.randomUUID().toString().substring(0,3));// 랜덤값
        parameters.put("AccessToken","11eb0d96aa85e5efe673d19d5f856ea0c9a44e43f001b15a4a3033cccdc25027");
        return parameters;

    }
}
