package com.github.clarakraus.susume.security;

import com.github.clarakraus.susume.blog.BlogRepo;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MongoUserDetailsService implements UserDetailsService {
    private final BlogRepo blogRepo;

    public MongoUserDetailsService(BlogRepo blogRepo) {
        this.blogRepo = blogRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return blogRepo.findBlogByUsername(username)
                .map(user -> new User(user.getUsername(), user.getPassword(), List.of(new SimpleGrantedAuthority("user"))))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

}
