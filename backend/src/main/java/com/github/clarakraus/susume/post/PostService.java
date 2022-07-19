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
        List<Post> allPostings = postRepo.findAllByCategory(Category.Movie);
        //ToDo: doesnt work yet, still adds movies multiple times
        if(allPostings.stream().map(Post::getId).equals(post.getId())){
            throw new RuntimeException("this movie ID is already in your susumes");
        } else {
            post.setCategory(Category.Movie);
            postRepo.save(post);
        }
        }

    public Movie getMovieById(long movieId) {
        return movieApiConnection.getMovieFromTMDBById(movieId);
    }
    public List<Susume> getAllSusumes() {
        List<Post> allPostings = postRepo.findAll();
        //ToDo: change image path to URL
        return allPostings.stream()
                .filter(post -> post.getCategory().equals(Category.Movie))
                .map(post -> susumeMapper.map(getMovieById(post.getId()), post))
                .toList();
    }
}
