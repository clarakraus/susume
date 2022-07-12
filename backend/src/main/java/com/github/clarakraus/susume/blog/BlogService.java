package com.github.clarakraus.susume.blog;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlogService{

    private final BlogRepo blogRepo;


    public void createBlog(Blog blog) {
        blogRepo.save(blog);

    }

    public Optional<Blog> getBlogDetails(String username) {
        return blogRepo.findBlogByUsername(username);
    }
}
