package com.suco.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/h2-console/**").permitAll()  // H2 콘솔에 대한 접근 허용
                        .requestMatchers("/api/signup", "/api/login").permitAll()  // 회원 가입 및 로그인 경로에 대한 접근 허용
                        .anyRequest().authenticated()
                )
                .csrf(csrf -> csrf.disable())  // CSRF 보호 비활성화
                .headers(headers -> headers
                        .frameOptions(frameOptions -> frameOptions.disable())  // H2 콘솔 사용을 위해 X-Frame-Options 비활성화
                );

        return http.build();
    }
}
