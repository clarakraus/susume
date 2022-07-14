package com.github.clarakraus.susume.blog;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/movie")
public class MovieApiController {
    private final MovieApiService movieApiService;


    @GetMapping("/search/{query}")
    public ResponseEntity<List<Movie>> results(@PathVariable String query){
        try {
            return ResponseEntity.ok(movieApiService.searchMovie(query));
        }
        catch (NullPointerException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



}
