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


@Service
public class MovieApiConnection {

    private final RestTemplate restTemplate;
    private final String TMDB_TOKEN;

    public MovieApiConnection(RestTemplate restTemplate, @Value("${moviedb.token}") String TMDB_TOKEN) {
        this.restTemplate = restTemplate;
        this.TMDB_TOKEN = TMDB_TOKEN;
    }
    private HttpHeaders createHeader (String token) {
        HttpHeaders header = new HttpHeaders();
        header.set("Authorization", "Bearer " + token);
        return header;
    }

    public List<Movie> getMovieFromTMDB(String query) {
            ResponseEntity<MovieResults> results = restTemplate.exchange("https://api.themoviedb.org/3/search/movie?query=" + query,
                    HttpMethod.GET,
                    new HttpEntity<>(createHeader(TMDB_TOKEN)),
                    MovieResults.class);
                    return Objects.requireNonNull(results.getBody()).getResults();

    }
    public Movie getMovieFromTMDBById(long id){
        ResponseEntity<Movie> results = restTemplate.exchange("https://api.themoviedb.org/3/movie/" + id,
                HttpMethod.GET,
                new HttpEntity<>(createHeader(TMDB_TOKEN)),
                Movie.class);
        return Objects.requireNonNull(results.getBody());

    }

  /* Todo: finish this get-request to add provider information.

   public List<ProviderDetails> getProviderDetails(long movieId, String country){
        ResponseEntity<ProviderResponse> results = restTemplate.exchange("https://api.themoviedb.org/3/movie/" + movieId + "/watch/providers",
                HttpMethod.GET,
                new HttpEntity<>(createHeader(TMDB_TOKEN)),
                ProviderResponse.class);

                return Objects.requireNonNull(results.getBody().getResults().getDe());
    }

   */

}
