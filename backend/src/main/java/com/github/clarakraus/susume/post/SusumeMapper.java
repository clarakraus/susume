package com.github.clarakraus.susume.post;

import com.github.clarakraus.susume.blog.Movie;
import com.github.clarakraus.susume.blog.Susume;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SusumeMapper {

    Susume map(Movie movie, Post post){
        return new Susume(post.getCategory(),movie.getTitle(),movie.getOverview(),movie.getPosterPath(), post.getHomage(), post.getGenre());
    }

 /*   List<Susume> createSusulist(List<Movie> movieList, List<Post> postList){
        while (movieList.hasNext() && postList.hasNext()){

        }
    }

  */
}
