package com.project.ibe.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/","/login","/loginProc", "/register","/registerProc").permitAll() //모두에게 요청 허용
                        .requestMatchers("/admin").hasRole("ADMIN") //ADMIN권한에게만 허용
                        .anyRequest().authenticated()
                )
                .formLogin((form) -> form
                        .loginPage("/login")        //권한밖의 페이지 방문시 이 페이지로 이동
                        .loginProcessingUrl("/loginProc")   //가져올 action 값
                        .usernameParameter("memberEmail")   //input username태그 이름
                        .passwordParameter("memberPassword") //input password태그 이름
                        .defaultSuccessUrl("/", true) //로그인 성공시 보내는 페이지
                        .permitAll()
                )
//                .logout((form) -> form
//                        .logoutSuccessUrl("/")
//                        .logoutUrl("/logout")
//                .csrf((auth) -> auth.disable()) //cross site request forgery 요청위조. 사용자가 원하지않아도 서버측으로 특정 요청을 강제로 보내는 방식(회원정보변경, 게시글 CRUD 등)
                .sessionManagement((auth) -> auth
                        .maximumSessions(1) //다중 로그인 허용 갯수
                        .maxSessionsPreventsLogin(true) //갯수 초과시 true 새로운 로그인 차단. false 기존 로그인세션 삭제, 새로운 로그인 세션 생성
                )
                .sessionManagement((auth) -> auth
                        .sessionFixation().changeSessionId() // none 로그인시 세션정보 변경안함
                                                            //newSession 로그인시 세성 새로 생성
                                                            //changeSessionId 로그인 시 동일한 세션에 대한 id 변경
                )
        ;



        return http.build();
    }

//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
}
