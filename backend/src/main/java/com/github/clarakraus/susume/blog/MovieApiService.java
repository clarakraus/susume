package com.github.clarakraus.susume.blog;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieApiService {

    private final MovieApiConnection movieApiConnection;
    public List<Movie> searchMovie(String query){
        return movieApiConnection.getMovieFromTMDB(query);
    }

}
