package com.github.clarakraus.susume.blog;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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
    public ResponseEntity<BlogDTO> getBlogDetails(@PathVariable String username) {
        try {
            Blog blog = (blogService.getBlogDetails(username));
            BlogDTO blogDTO =  new BlogDTO();
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

    @GetMapping("/lookfor/{friend}")
    public ResponseEntity<List<BlogDTO>> findFriend(@PathVariable String friend) {
        try {
            List<Blog> friendBlogs = blogService.findUsers(friend);
           List<BlogDTO> friendBlogDTO = friendBlogs.stream().map(blog ->{
                BlogDTO blogDTO =  new BlogDTO();
                blogDTO.setBlogId(blog.getBlogId());
                blogDTO.setUsername(blog.getUsername());
                blogDTO.setProfilePicture(blog.getProfilePicture());
                return blogDTO;
            }).toList();
           return ResponseEntity.ok(friendBlogDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @PutMapping("/{username}/addfriend/{friendId}")
    public ResponseEntity<Void> addFriend(@PathVariable String friendId, Principal principal){
        blogService.updateFriendList(friendId, principal.getName());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/friendlist")
    public ResponseEntity<List<FriendDTO>> displayFriends(@RequestBody List<String> friendList) {
        try {
            List<FriendDTO> friendDTOList = friendList.stream()
                    .map(blogService::getUserById)
                    .map(user -> {
                        FriendDTO friendDTO = new FriendDTO();
                        friendDTO.setUsername(user.getUsername());
                        friendDTO.setUserId(user.getBlogId());
                        friendDTO.setProfilePicture(user.getProfilePicture());
                        return friendDTO;
                    })
                    .toList();
            return ResponseEntity.ok(friendDTOList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    //Todo: finish
    @PutMapping("/watchlist")
    public ResponseEntity<Void> addToFavorites(@PathVariable String susumeId, Principal principal){
        blogService.addToFavorites(susumeId, principal.getName());
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
