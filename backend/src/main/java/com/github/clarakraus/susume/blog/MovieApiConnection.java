package com.github.clarakraus.susume.blog;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
public class MovieApiConnection {

    private RestTemplate restTemplate;
    private String TMDB_TOKEN;

    public MovieApiConnection(RestTemplate restTemplate, @Value("${moviedb.token}") String TMDB_TOKEN) {
        this.restTemplate = restTemplate;
        this.TMDB_TOKEN = TMDB_TOKEN;
    }
    private HttpHeaders createHeader (String token) {
        HttpHeaders header = new HttpHeaders();
        header.set("Authorization", "Bearer " + token);
        return header;
    }

    public List<MoviePreview> getMovieFromTMDB(String query) {
            ResponseEntity<MoviePreviewResults> results = restTemplate.exchange("https://api.themoviedb.org/3/search/movie?query=" + query,
                    HttpMethod.GET,
                    new HttpEntity<>(createHeader(TMDB_TOKEN)),
                    MoviePreviewResults.class);
                    return Objects.requireNonNull(results.getBody()).getResults();

    }


}
