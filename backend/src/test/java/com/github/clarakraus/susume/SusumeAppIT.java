package com.github.clarakraus.susume;

import com.github.clarakraus.susume.blog.BlogRepo;
import com.github.clarakraus.susume.blog.MovieApiConnection;
import com.github.clarakraus.susume.blog.user.LoginDetails;
import com.github.clarakraus.susume.blog.user.LoginResponse;
import com.github.clarakraus.susume.blog.user.RegisterDetails;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.env.RandomValuePropertySource;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SusumeAppIT {

    @Autowired
    TestRestTemplate restTemplate;
    @MockBean
    MovieApiConnection movieApiConnection;

    @Test
    void shouldRegisterUserAndDoaLogin() {
        RegisterDetails registerDetails = RegisterDetails.builder()
                .username("testUser")
                .profileDescription("testDescription")
                .profilePicture("testLink")
                .password("123")
                .passwordRepeat("123")
                .build();


        ResponseEntity<Void> registerResponse = restTemplate.postForEntity("/user/register", registerDetails, Void.class);
        Assertions.assertThat(registerResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);

        LoginDetails loginDetails = LoginDetails.builder().username("testUser").password("123").build();
        ResponseEntity<LoginResponse> loginResponse = restTemplate.postForEntity("/api/login", loginDetails, LoginResponse.class);
        Assertions.assertThat(loginResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        Assertions.assertThat(loginResponse.getBody().getJwt()).isNotBlank();

        LoginDetails wrongLoginDetails = LoginDetails.builder().username("testUser").password("123456").build();
        ResponseEntity<LoginResponse> wrongLoginResponse = restTemplate.postForEntity("/api/login", wrongLoginDetails, LoginResponse.class);
        Assertions.assertThat(wrongLoginResponse.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

}
