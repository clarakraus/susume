package com.github.clarakraus.susume.post;

import com.github.clarakraus.susume.blog.Movie;
import com.github.clarakraus.susume.blog.MovieApiConnection;
import com.github.clarakraus.susume.blog.Susume;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepo postRepo;
    private final MovieApiConnection movieApiConnection;

    private final SusumeMapper susumeMapper;

    public void createPost(Post post) {
        post.setCategory(Category.Movie);
        postRepo.save(post);
    }

    public Movie getMovieById(long movieId) {
        return movieApiConnection.getMovieFromTMDBById(movieId);
    }
    public List<Susume> getAllSusumes() {
        List<Post> allPostings = postRepo.findAll();
        Susume susume = new Susume();
       return allPostings.stream()
                .map(post -> susumeMapper.map(getMovieById(post.getId()), post))
                .toList();
    }





}
