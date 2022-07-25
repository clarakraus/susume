package com.github.clarakraus.susume.post;
import com.github.clarakraus.susume.blog.Movie;
import com.github.clarakraus.susume.blog.MovieApiConnection;
import com.github.clarakraus.susume.blog.Susume;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

class PostServiceTest {

    @Test
    void ShouldCreatePost(){

        PostRepo testPostRepo = Mockito.mock(PostRepo.class);

        PostService testPostService = new PostService(testPostRepo, null, null);
        Post testPost = new Post("postId", Category.Movie, Genre.HORROR, 1234, "such a cool movie!", "creator" );
        testPostService.createPost(testPost, "creator");
        Mockito.verify(testPostRepo).save(testPost);
    }
    @Test
    void shouldReturnAllSusumes(){
        PostRepo testPostRepo = Mockito.mock(PostRepo.class);
        MovieApiConnection testConnection = Mockito.mock(MovieApiConnection.class);
        SusumeMapper susumap = new SusumeMapper();

        Post testPost1 = new Post("testPostid1", Category.Movie, Genre.COMEDY, 12345, "testHomage1", "creator1");
        Post testPost2 = new Post("testPostid2", Category.Movie, Genre.ACTION, 6789, "testHomage2", "creator1");
        List<Post> postListFromRepo = new ArrayList<>();

        postListFromRepo.add(testPost1);
        postListFromRepo.add(testPost2);

        Movie movieInPost1 = new Movie(12345, "originalTitle1", "title1","overview1", "poster1", "releaseDate1" );
        Movie movieInPost2 = new Movie(6789, "originalTitle2", "title2","overview2", "poster2", "releaseDate2" );

        Susume susu1 = new Susume(Category.Movie, movieInPost1, "testHomage1", Genre.COMEDY, "creator1");
        Susume susu2 = new Susume(Category.Movie, movieInPost2, "testHomage2", Genre.ACTION, "creator1");

        PostService testPostService = new PostService(testPostRepo, testConnection, susumap);

        Mockito.when(testPostRepo.findAllByCreater("creator1")).thenReturn(postListFromRepo);
        Mockito.when(testConnection.getMovieFromTMDBById(12345)).thenReturn(movieInPost1);
        Mockito.when(testConnection.getMovieFromTMDBById(6789)).thenReturn(movieInPost2);

        Assertions.assertThat(testPostService.getAllSusumes("creator1")).contains(susu1, susu2);

    }

}