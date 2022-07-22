package com.github.clarakraus.susume.blog.user;

import com.github.clarakraus.susume.blog.Blog;
import com.github.clarakraus.susume.blog.BlogRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final BlogRepo blogRepo;

    public void createAccount(Blog newAccount) {
        List<Blog> allBlogs = blogRepo.findAll();
        if (allBlogs.stream().anyMatch(blog -> blog.getUsername() == newAccount.getUsername())) {
            throw new RuntimeException("username is already taken");
        }
        String encodedPassword = passwordEncoder.encode(newAccount.getPassword());
        newAccount.setPassword(encodedPassword);
        blogRepo.save(newAccount);
        }

        public Blog getUser(String username){
            return blogRepo.findBlogByUsername(username).orElseThrow();
        }
}
