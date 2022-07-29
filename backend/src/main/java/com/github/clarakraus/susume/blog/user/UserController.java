package com.github.clarakraus.susume.blog.user;

import com.github.clarakraus.susume.blog.Blog;
import com.github.clarakraus.susume.blog.BlogDTO;
import com.github.clarakraus.susume.blog.Susume;
import com.github.clarakraus.susume.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin
public class UserController {
     private final UserService userService;
     private final PostService postService;

     @PostMapping("/register")
     public ResponseEntity<Void> createAccount(@RequestBody RegisterDetails registerData) {
          try {
               userService.createAccount(registerData);
               return ResponseEntity.status(HttpStatus.CREATED).build();
          } catch (RuntimeException e) {
               return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
          }
     }


     @GetMapping("/{username}")
     public ResponseEntity<BlogDTO> findUserbyName(@PathVariable String username) {
          try {
               Blog blog = userService.getUser(username);
               BlogDTO blogDTO = new BlogDTO();
               List<Susume> susumeList = blog.getSavedSusumes().stream().map(postService::getSusumeByPostId)
                       .toList();
               blogDTO.setBlogId(blog.getBlogId());
               blogDTO.setUsername(blog.getUsername());
               blogDTO.setProfilePicture(blog.getProfilePicture());
               blogDTO.setProfileDescription(blog.getProfileDescription());
               blogDTO.setFriendsList(blog.getFriendsList());
               blogDTO.setSavedSusumes(susumeList);
               return ResponseEntity.ok(blogDTO);
          } catch (NoSuchElementException e) {
               return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
          }

     }
}
