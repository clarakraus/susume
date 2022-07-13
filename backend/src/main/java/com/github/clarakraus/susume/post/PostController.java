package com.github.clarakraus.susume.post;


import com.github.clarakraus.susume.blog.Movie;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/postings")
@CrossOrigin
public class PostController {

    private final PostService postService;

    @PostMapping("/movie/new")
    public ResponseEntity<Void> postMovie(@RequestBody Post post){
        postService.createPost(post);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @GetMapping("/movie/id/{movieId}")
            public ResponseEntity<Movie> getMovie(@PathVariable long movieId) {
            return ResponseEntity.ok(postService.getMovieById(movieId));

    }


}
