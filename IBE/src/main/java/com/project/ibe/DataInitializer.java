package com.project.ibe;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Component
public class DataInitializer {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private ResourceLoader resourceLoader;

    @PostConstruct
    public void init() {
        executeSqlScript("classpath:sql/board_dummy.sql");
        executeSqlScript("classpath:sql/member_dummy.sql");
        executeSqlScript("classpath:sql/product_dummy.sql");
        executeSqlScript("classpath:sql/productImg_dummy.sql");
        executeSqlScript("classpath:sql/productComment_dummy.sql");
        executeSqlScript("classpath:sql/productReply_dummy.sql");
        executeSqlScript("classpath:sql/inquiry_dummy.sql");
        executeSqlScript("classpath:sql/board_dummy.sql");
    }

    private void executeSqlScript(String scriptPath) {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(
                resourceLoader.getResource(scriptPath).getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            StringBuilder sql = new StringBuilder();
            while ((line = br.readLine()) != null) {
                if (!line.trim().isEmpty()) { // 빈 줄은 무시
                    sql.append(line).append("\n");
                    if (line.trim().endsWith(";")) { // SQL 문이 끝났으면 실행
                        jdbcTemplate.execute(sql.toString());
                        sql.setLength(0); // StringBuilder 초기화
                    }
                }
            }
            // 남은 SQL 문이 있을 경우 실행
            if (sql.length() > 0) {
                jdbcTemplate.execute(sql.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}