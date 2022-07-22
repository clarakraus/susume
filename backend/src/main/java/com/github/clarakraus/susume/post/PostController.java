package com.github.clarakraus.susume.post;


import com.github.clarakraus.susume.blog.Movie;
import com.github.clarakraus.susume.blog.Susume;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/postings")
@CrossOrigin
public class PostController {

    private final PostService postService;

    @PostMapping("/movie/new/{username}")
    public ResponseEntity<Void> postMovie(@RequestBody Post post, @PathVariable String username){
        post.setCreater(username);
        postService.createPost(post);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @GetMapping("/movie/id/{movieId}")
    public ResponseEntity<Movie> getMovie(@PathVariable long movieId) {
        try {
            return ResponseEntity.ok(postService.getMovieById(movieId));
        } catch (NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }
    @GetMapping()
    public ResponseEntity<List<Susume>> getAllSusumes(){
        return ResponseEntity.ok(postService.getAllSusumes());

    }
    @PostMapping("/watchlist/display")
    public ResponseEntity<List<Susume>> displaySusumesOnProfile(@RequestBody List<String> favoritesList){
      return ResponseEntity.ok(postService.displaySusumesOnProfile(favoritesList));
    }


}
