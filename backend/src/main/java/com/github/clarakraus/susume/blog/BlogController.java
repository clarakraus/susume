package com.github.clarakraus.susume.blog;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
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
    public ResponseEntity<Blog> getBlogDetails(@PathVariable String username){
        return ResponseEntity.of(blogService.getBlogDetails(username));
    }

    @GetMapping("/lookfor/{friend}")
    public List<Blog> findFriend(@PathVariable String friend){
        return blogService.findUsers(friend);
    }

    @PutMapping("/{username}/addfriend/{friendId}")
    public ResponseEntity<Void> addFriend(@PathVariable String friendId, @PathVariable String username){
        blogService.updateFriendList(friendId, username);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    public FriendDTO FriendMapper(Blog blog){
        FriendDTO friendDTO = new FriendDTO();
        friendDTO.setUserId(blog.getBlogId());
        friendDTO.setUsername(blog.getUsername());
        friendDTO.setProfilePicture(blog.getProfilePicture());
        return friendDTO;
    }
    @PostMapping("/friendlist")
    public ResponseEntity<List<FriendDTO>> displayFriends(@RequestBody List<String> friendList){
       List<Blog> blogList = friendList.stream().map(blogService::getUserById).toList();
       List<FriendDTO> friendDTOList= blogList.stream().map(this::FriendMapper).toList();
       return ResponseEntity.of(Optional.of(friendDTOList));
    }

}
