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

   /* @ResponseStatus(HttpStatus.CREATED)
    @PostMapping()
    public void createBlog(@RequestBody Blog blog){
        blogService.createBlog(blog);
    }

   */
    @GetMapping("/details")
    public ResponseEntity<BlogDTO> getBlogDetails(Principal principal) {
        try {
           return ResponseEntity.ok(blogService.getBlogDetails(principal.getName()));

        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/getfriendblog/{username}")
    public ResponseEntity<BlogDTO> getBlogDetails(@PathVariable String username) {
        try {
           return ResponseEntity.ok(blogService.getBlogDetails(username));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @GetMapping("/lookfor/{friend}")
    public ResponseEntity<List<FriendDTO>> findFriend(@PathVariable String friend) {
        try {
            List<Blog> friendBlogs = blogService.findUsers(friend);
            List<FriendDTO> friendBlogDTO = friendBlogs.stream()
                    .map(Blog::buildFriendDTO)
                    .toList();
           return ResponseEntity.ok(friendBlogDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    @PutMapping("/addfriend/{friendId}")
    public ResponseEntity<Void> addFriend(@PathVariable String friendId, Principal principal){
        blogService.updateFriendList(friendId, principal.getName());
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/friendlist")
    public ResponseEntity<List<FriendDTO>> displayFriends(@RequestBody List<String> friendList) {
        try {
            List<FriendDTO> friendDTOList = friendList.stream()
                    .map(blogService::getUserById)
                    .map(Blog::buildFriendDTO)

                       /* FriendDTO friendDTO = new FriendDTO();
                        friendDTO.setUsername(user.getUsername());
                        friendDTO.setBlogId(user.getBlogId());
                        friendDTO.setProfilePicture(user.getProfilePicture());
                        return friendDTO;

                        */

                    .toList();
            return ResponseEntity.ok(friendDTOList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    //Todo: finish
    @PutMapping("/collection/save/{susumeId}")
    public ResponseEntity<Void> addToSaves(@PathVariable String susumeId, Principal principal){
        blogService.addToSaves(susumeId, principal.getName());
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    @PutMapping("/collection/delete/{susumeId}")
    public ResponseEntity<Void> removeFromSaves(@PathVariable String susumeId, Principal principal){
        blogService.removeFromSaves(susumeId, principal.getName());
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    @PutMapping("/edit/{blogId}")
    public ResponseEntity<Void> editBlog(@RequestBody EditBlogData editBlogData, @PathVariable String blogId){
        blogService.editBlog(editBlogData, blogId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
