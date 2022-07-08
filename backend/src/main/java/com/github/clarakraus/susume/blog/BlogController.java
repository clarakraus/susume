package com.github.clarakraus.susume.blog;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/blog")
@CrossOrigin

public class BlogController {
    private final BlogService blogService;

    @PostMapping()
    public void createBlog(@RequestBody Blog blog){
        blogService.createBlog(blog);


    }
}
