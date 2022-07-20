package com.github.clarakraus.susume.blog;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

class MovieApiServiceTest {
   /* @Mock
    private RestTemplate restTemplate;

    */
    @Test
    void shouldReturnListOfMoviesWhileSearching(){
        String query = "testQuery";
        Movie movie1 = new Movie();
        movie1.setTitle("superMovie");
        Movie movie2 = new Movie();
        movie2.setTitle("superMovie2");
        MovieResults movieResults = new MovieResults(List.of(movie1, movie2));

        var restTemplate = Mockito.mock(RestTemplate.class);
        var headers = new HttpHeaders();
        headers.set("Authorization", "Bearer testToken" );
        Mockito.when(restTemplate.exchange("https://api.themoviedb.org/3/search/movie?query=" + query,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                MovieResults.class)).thenReturn(ResponseEntity.of(Optional.of(movieResults)));


        MovieApiConnection movieApiConnection= new MovieApiConnection(restTemplate, "testToken");
        MovieApiService movieApiService = new MovieApiService(movieApiConnection);

        List<Movie> actual= movieApiService.searchMovie("testQuery");

        Assertions.assertThat(actual).contains(movie1, movie2);
    }

}