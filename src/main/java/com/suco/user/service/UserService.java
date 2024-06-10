package com.suco.user.service;

import com.suco.user.dto.UserRequestDto;
import com.suco.user.entity.User;
import com.suco.user.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.Optional;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private static final SecretKey KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public String signUp(UserRequestDto userRequestDto){
        if(userRepository.findByEmail(userRequestDto.getEmail()).isPresent()){
            return "이미 존재하는 이메일입니다.";
        }
        User user = new User();
        user.setEmail(userRequestDto.getEmail());
        user.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
        userRepository.save(user);
        return "회원가입이 완료되었습니다";
    }

    public String login(UserRequestDto userRequestDto) {
        logger.info("로그인 요청: {}", userRequestDto.getEmail());
        Optional<User> userOptional = userRepository.findByEmail(userRequestDto.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            logger.info("사용자 발견: {}", user.getEmail());
            if (passwordEncoder.matches(userRequestDto.getPassword(), user.getPassword())) {
                logger.info("비밀번호 일치: {}", user.getEmail());
                return generateToken(user.getEmail());
            } else {
                logger.warn("비밀번호 불일치: {}", userRequestDto.getEmail());
            }
        } else {
            logger.warn("사용자 찾을 수 없음: {}", userRequestDto.getEmail());
        }
        return null;
    }

    private String generateToken(String email){
        long expirationTime = 1000 * 60 * 60; // 1 hour
        return Jwts.builder()
                .setSubject(email)
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(KEY, SignatureAlgorithm.HS512)
                .compact();
    }
}
