package com.github.clarakraus.susume.blog.user;

import com.github.clarakraus.susume.blog.Blog;
import com.github.clarakraus.susume.blog.BlogRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final BlogRepo blogRepo;

    @ResponseStatus(HttpStatus.CREATED)
    public void createAccount(RegisterDetails registerDetails) {
        if (!Objects.equals(registerDetails.getPassword(), registerDetails.getPasswordRepeat())) {
            throw new IllegalArgumentException("passwords do not match");
        }
        if (registerDetails.getUsername() == null || registerDetails.getUsername().isBlank()) {
            throw new IllegalArgumentException("username is blank");
        }
        if (registerDetails.getPassword() == null || registerDetails.getPassword().isBlank()) {
            throw new IllegalArgumentException("password is blank");
        }



        List<Blog> allBlogs = blogRepo.findAll();
        if (allBlogs.stream().anyMatch(blog -> blog.getUsername() == registerDetails.getUsername())) {
            throw new RuntimeException("username is already taken");
        }
        String encodedPassword = passwordEncoder.encode(registerDetails.getPassword());

        Blog newBlog = new Blog();
        newBlog.setPassword(encodedPassword);
        newBlog.setUsername(registerDetails.getUsername());
        newBlog.setProfileDescription(registerDetails.getProfileDescription());
        newBlog.setProfilePicture(registerDetails.getProfilePicture());
        blogRepo.save(newBlog);
        }

        public Blog getUser(String username){
            return blogRepo.findBlogByUsername(username).orElseThrow();
        }
}
