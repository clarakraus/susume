package com.github.clarakraus.susume.blog;


import com.github.clarakraus.susume.post.Category;
import com.github.clarakraus.susume.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public List<Blog> findUsers(String username){
        return blogRepo.findAllByUsernameContainingIgnoreCase(username);
    }



}

