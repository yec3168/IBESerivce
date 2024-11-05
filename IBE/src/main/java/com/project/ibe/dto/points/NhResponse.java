package com.project.ibe.dto.points;



import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.json.simple.JSONObject;


@Getter
@Setter
@ToString
@Builder
public class NhResponse {
    String msg;
    String memberName;
    String bankName;
    String account;
    Long payBackPoint;
    Long memberPoint;
}
