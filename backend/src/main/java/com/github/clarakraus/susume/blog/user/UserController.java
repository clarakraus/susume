package com.github.clarakraus.susume.blog.user;

import com.github.clarakraus.susume.blog.Blog;
import com.github.clarakraus.susume.blog.BlogDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
     private final UserService userService;

     @PostMapping("/createaccount")
     public ResponseEntity<Void> createAccount(@RequestBody Blog newAccount) {
          try {
               userService.createAccount(newAccount);
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
               blogDTO.setBlogId(blog.getBlogId());
               blogDTO.setUsername(blog.getUsername());
               blogDTO.setProfilePicture(blog.getProfilePicture());
               blogDTO.setProfileDescription(blog.getProfileDescription());
               blogDTO.setFriendsList(blog.getFriendsList());
               blogDTO.setSavedSusumes(blog.getSavedSusumes());
               return ResponseEntity.ok(blogDTO);
          } catch (NoSuchElementException e) {
               return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
          }

     }
}
