package com.project.ibe.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.ibe.exception.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * AuthenticationEntryPoint
 *
 * 인증 과정에서 실패하거나 인증을 위한 헤더정보를 보내지 않은 경우
 * 401(UnAuthorized) 에러가 발생하게 된다.
 *
 * Spring Security에서 인증되지 않은 사용자에 대한 접근 처리는 AuthenticationEntryPoint가 담당하는데,
 * commence 메소드가 실행되어 처리된다.
 */

@Slf4j
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
  @Override
  public void commence(
      HttpServletRequest request,
      HttpServletResponse response,
      AuthenticationException e
  ) throws IOException {
    System.out.println(request.getRequestURI());
    log.error("UnAuthorized -- message : " + e.getMessage()); // 로그를 남기고
    //response.sendRedirect("/auth/signIn"); // 로그인 페이지로 리다이렉트되도록 하였다.

    // status를 401 에러로 지정
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    // json 리턴 및 한글깨짐 수정.
    response.setContentType("application/json;charset=utf-8");
    BusinessException error = new BusinessException("권한이 없습니다.", HttpStatus.UNAUTHORIZED);
    ObjectMapper objectMapper = new ObjectMapper();
    String result = objectMapper.writeValueAsString(error);
    response.getWriter().write(result);

    //위코드를 단순히 아래와 같이 해도 됨
//        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);

  }
}