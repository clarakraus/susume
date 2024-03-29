package com.github.clarakraus.susume.post;


import com.github.clarakraus.susume.blog.Movie;
import com.github.clarakraus.susume.blog.Susume;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.security.Principal;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/postings")
@CrossOrigin
public class PostController {

    private final PostService postService;

    @GetMapping("/movie/id/{movieId}")
    public ResponseEntity<Movie> getMovie(@PathVariable long movieId) {
        try {
            return ResponseEntity.ok(postService.getMovieById(movieId));
        } catch (NullPointerException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (HttpClientErrorException e){
            return ResponseEntity.status(HttpStatus.I_AM_A_TEAPOT).build();
        }

    }

    @GetMapping()
    public ResponseEntity<List<Susume>> getAllSusumes(Principal principal) {
        return ResponseEntity.ok(postService.getAllSusumes(principal.getName()));

    }

    @GetMapping("/friends/{friendName}")
    public ResponseEntity<List<Susume>> getFriendsSusumes(@PathVariable String friendName) {
        return ResponseEntity.ok(postService.getAllSusumes(friendName));

    }

    @PostMapping("/watchlist")
    public ResponseEntity<List<Susume>> displaySusumesOnProfile(@RequestBody List<String> favoritesList) {
        return ResponseEntity.ok(postService.displaySusumesOnProfile(favoritesList));
    }

    @PutMapping("/delete/{susumePostId}")
    public ResponseEntity<Void> eraseCreatorAndHomage(@PathVariable String susumePostId) {
        postService.eraseCreatorAndHomage(susumePostId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/edit/{susumePostId}")
    public ResponseEntity<Void> editSusume(@PathVariable String susumePostId, @RequestBody EditPostData editPostData) {
        postService.editPost(susumePostId, editPostData);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    @GetMapping("/{susumePostId}")
    public ResponseEntity<Susume> getSusume(@PathVariable String susumePostId){
        return ResponseEntity.ok(postService.getSusumeByPostId(susumePostId));
    }
    @PutMapping("/comment")
    public ResponseEntity<Void> postComment(Principal principal, @RequestBody Comment comment){
        postService.createComment(comment, principal.getName());
        return ResponseEntity.status(HttpStatus.OK).build();
    }


}
