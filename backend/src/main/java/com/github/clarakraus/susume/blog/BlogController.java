package com.github.clarakraus.susume.blog;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/blog")
@CrossOrigin

public class BlogController {
    private final BlogService blogService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping()
    public void createBlog(@RequestBody Blog blog){
        blogService.createBlog(blog);
    }
    @GetMapping("/{username}")
    public ResponseEntity<Blog> getBlogDetails(@PathVariable String username){
        return ResponseEntity.of(blogService.getBlogDetails(username));

    }
    @GetMapping("/{username}/susumes")
    public ResponseEntity<Susume[]> getAllSusumes(@PathVariable String username){
        return null;
    }

    @GetMapping("/lookfor/{friend}")
    public List<Blog> findFriend(@PathVariable String friend){
        return blogService.findUsers(friend);
    }
}
