package com.github.clarakraus.susume.blog.user;

import com.github.clarakraus.susume.blog.Blog;
import com.github.clarakraus.susume.blog.BlogRepo;
import com.github.clarakraus.susume.blog.BlogService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static java.util.Collections.emptyList;
import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {

    @Test
    void shouldCreateNewBlog(){
        BlogRepo testRepo = Mockito.mock(BlogRepo.class);
        PasswordEncoder passwordEncoder= Mockito.mock(PasswordEncoder.class);
        UserService userService = new UserService(passwordEncoder, testRepo);
        RegisterDetails registerDetails = new RegisterDetails("testname", "testDescription", "LinkToPicture", "password", "password");
        Mockito.when(passwordEncoder.encode("password")).thenReturn("encodedPassword");


        userService.createAccount(registerDetails);

        Mockito.verify(testRepo).save(new Blog(null, "testname", "testDescription", "LinkToPicture", emptyList() , emptyList(), "encodedPassword", null));

    }
}