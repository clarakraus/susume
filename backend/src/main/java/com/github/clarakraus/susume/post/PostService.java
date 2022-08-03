package com.github.clarakraus.susume.post;

import com.github.clarakraus.susume.blog.BlogService;
import com.github.clarakraus.susume.blog.Movie;
import com.github.clarakraus.susume.blog.MovieApiConnection;
import com.github.clarakraus.susume.blog.Susume;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepo postRepo;
    private final MovieApiConnection movieApiConnection;

    private final SusumeMapper susumeMapper;


    public void createPost(Post post, String creator, String creatorId) {
        List<Post> allPostings = postRepo.findAllByCategoryAndCreater(Category.Movie, creator);
        if(allPostings.stream().anyMatch(post1 -> post1.getId() == post.getId())){
            throw new RuntimeException("this movie ID is already in your susumes");
        } else {
            post.setCategory(Category.Movie);
            post.setCreatedAt(System.currentTimeMillis());
            post.setUpdatedAt(System.currentTimeMillis());
            post.setCreatorId(creatorId);
            postRepo.save(post);
        }
    }

    public Movie getMovieById(long movieId) {
        return movieApiConnection.getMovieFromTMDBById(movieId);
    }
    public List<Susume> getAllSusumes(String username) {
        List<Post> allPostings = postRepo.findAllByCreater(username);
        //ToDo: change image path to URL
        return allPostings.stream()
                .filter(post -> post.getCategory().equals(Category.Movie))
                .map(post -> susumeMapper.map(getMovieById(post.getId()), post))
                .toList();
    }
    public Post findPostByPostId(String postId){
        return postRepo.findPostByPostId(postId);
    }

    public List<Susume> displaySusumesOnProfile(@RequestBody List<String> favoritesList) {
        List<Post> postList = favoritesList.stream()
                .map(this::findPostByPostId)
                .toList();
        List<Susume> savedSusumes = postList.stream()
                .map(post -> susumeMapper.map(getMovieById(post.getId()), post))
                .toList();
        return savedSusumes;
    }
    public Susume getSusumeByPostId(String postId){
        Post post = findPostByPostId(postId);
        Movie movie = movieApiConnection.getMovieFromTMDBById(post.getId());
        return susumeMapper.map(movie, post);
    }


    public void eraseCreatorAndHomage(String susumePostId) {
        Post post = findPostByPostId(susumePostId);
        post.setCreater("");
        post.setHomage("");
        post.setGenre(Genre.NO_GENRE);
        postRepo.save(post);
    }

    public void editPost(String susumePostId, EditPostData editPostData) {
        Post post = findPostByPostId(susumePostId);
        post.setHomage(editPostData.getHomage());
        post.setGenre(editPostData.getGenre());
        post.setUpdatedAt(System.currentTimeMillis());
        postRepo.save(post);
    }
    public List<Susume> getSusumesForNewsFeed(List<String> friendIds){
            List<Post> newsFeedPostList = postRepo.findFirst10ByCreatorIdInOrderByCreatedAtDesc(friendIds);
            List<String> postIdList = newsFeedPostList.stream()
                    .map(Post::getPostId)
                    .toList();
        return postIdList.stream().map(this::getSusumeByPostId).toList();
    }
}