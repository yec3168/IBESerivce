package com.project.ibe.entity.common;

import lombok.Getter;

@Getter
public class Response<T> {

    private ResponseCode responseCode;
    private T data; // dto
    private String message;
    private String code; // 404 , 202, 200 ,500

    public Response(ResponseCode responseCode, String message, String code) {
        this.responseCode = responseCode;
        this.message = message;
        this.code = code;
    }

    public Response(ResponseCode responseCode, T data, String code) {
        this.responseCode = responseCode;
        this.data = data;
        this.code = code;
    }
}