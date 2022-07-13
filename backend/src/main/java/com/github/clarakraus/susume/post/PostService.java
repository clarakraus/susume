package com.github.clarakraus.susume.post;

import com.github.clarakraus.susume.blog.Movie;
import com.github.clarakraus.susume.blog.MovieApiConnection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepo postRepo;
    private final MovieApiConnection movieApiConnection;

    public void createPost(Post post) {
        post.setCategory(Category.Movie);
        postRepo.save(post);
    }

    public Movie getMovieById(long movieId) {
        return movieApiConnection.getMovieFromTMDBById(movieId);
    }
}
