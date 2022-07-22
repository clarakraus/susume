package com.github.clarakraus.susume.blog;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Blog> getBlogDetails(@PathVariable String username) {
        try {
            return ResponseEntity.ok(blogService.getBlogDetails(username));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/lookfor/{friend}")
    public ResponseEntity<List<Blog>> findFriend(@PathVariable String friend) {
        try {
            return ResponseEntity.ok(blogService.findUsers(friend));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @PutMapping("/{username}/addfriend/{friendId}")
    public ResponseEntity<Void> addFriend(@PathVariable String friendId, @PathVariable String username){
        blogService.updateFriendList(friendId, username);
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
    public ResponseEntity<Void> addToFavorites(@PathVariable String susumeId, @PathVariable String username){
        blogService.addToFavorites(susumeId, username);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
