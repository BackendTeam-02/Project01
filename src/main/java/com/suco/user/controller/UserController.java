package com.suco.user.controller;

import com.suco.user.dto.UserRequestDto;
import com.suco.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")

public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody UserRequestDto userRequestDto){
        String message = userService.signUp(userRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(message);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserRequestDto userRequestDto){
        String token = userService.login(userRequestDto);
        if(token != null){
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + token);
            return ResponseEntity.ok()
                    .headers(headers)
                    .body("{\"message\": \"로그인이 성공적으로 완료되었습니다.\"}");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("{\"message\": 이메일 또는 비밀번호가 잘못되었습니다.\"}");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(){
        return ResponseEntity.ok("{\"message\": \"로그아웃 되었습니다.\"}");
    }
}
