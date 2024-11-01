package com.project.ibe.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${uploadPath.path}")
    String uploadPath; //실제 저장위치.

    @Value("${getPath.path}")
    String getPath; //url 위치


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 엔드포인트에 대해 CORS를 허용
                .allowedOrigins("http://localhost:3000") // 허용할 출처 (클라이언트 URL)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
                .allowedHeaders("*") // 허용할 요청 헤더
                .allowCredentials(true); // 자격 증명 허용
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // web브라우저에서 /images로 시작하는 경우 uploadPath로 설정한 경로의 파일을 읽어오도록 설정
        // 로컬 컴퓨터에 저장된 파일을 읽어올 root 경로를 지정.
        registry.addResourceHandler(getPath)
                .addResourceLocations(uploadPath);
    }
}