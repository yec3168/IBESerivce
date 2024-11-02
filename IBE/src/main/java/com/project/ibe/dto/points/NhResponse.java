package com.example.pay.dto;



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
    JSONObject response;
}
