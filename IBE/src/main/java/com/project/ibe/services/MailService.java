package com.project.ibe.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;
    private static final String senderEmail = "fhbsy84@gmail.com";

    // 랜덤으로 숫자 생성
    public String createNumber() {
        Random random = new Random();
        StringBuilder key = new StringBuilder();

        for (int i = 0; i < 8; i++) { // 인증 코드 8자리
            int index = random.nextInt(3); // 0~2까지 랜덤, 랜덤값으로 switch문 실행

            switch (index) {
                case 0 -> key.append((char) (random.nextInt(26) + 97)); // 소문자
                case 1 -> key.append((char) (random.nextInt(26) + 65)); // 대문자
                case 2 -> key.append(random.nextInt(10)); // 숫자
            }
        }
        return key.toString();
    }

    // 메일 생성
    public MimeMessage createMail(String mail, String authNumber) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(senderEmail);
        helper.setTo(mail);
        helper.setSubject("아이비 이메일 인증");

        Path path = Paths.get("src/main/resources/emailAuthTemplate.html");
        String htmlContent;

        try {
            htmlContent = Files.readString(path);
        } catch (Exception e) {
            throw new RuntimeException("HTML 파일을 읽는 중 오류 발생", e);
        }

        htmlContent = htmlContent.replace("{authNumber}", authNumber);

        helper.setText(htmlContent, true);
        helper.addInline("ibeLogo", new ClassPathResource("images/ibe_logo.png"));
        helper.addInline("emailImg01", new ClassPathResource("images/email_img_01.png"));
        helper.addInline("emailImg02", new ClassPathResource("images/email_img_02.png"));

//        message.setText(htmlContent, "UTF-8");
//        message.setHeader("content-Type", "text/html");

        return message;
    }

    // 메일 발송
    public String sendSimpleMessage(String sendEmail) throws MessagingException {
        String authNumber = createNumber(); // 랜덤 인증번호 생성

        MimeMessage message = createMail(sendEmail, authNumber); // 메일 생성
        try {
            javaMailSender.send(message); // 메일 발송
        } catch (MailException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("메일 발송 중 오류가 발생했습니다.");
        }

        return authNumber; // 생성된 인증번호 반환
    }
}