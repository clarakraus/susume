package com.github.clarakraus.susume.post;
import com.github.clarakraus.susume.blog.Movie;
import com.github.clarakraus.susume.blog.MovieApiConnection;
import com.github.clarakraus.susume.blog.Susume;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.emptyList;

class PostServiceTest {

    @Test
    void ShouldCreatePost(){

        PostRepo testPostRepo = Mockito.mock(PostRepo.class);

        PostService testPostService = new PostService(testPostRepo, null, null);
        Post testPost = new Post("postId", Category.Movie, Genre.HORROR, 1234, "such a cool movie!", "creator" , "creatorId", 666666,666666,  emptyList());
        testPostService.createPost(testPost, "creator", "creatorId");
        Mockito.verify(testPostRepo).save(testPost);
    }
    @Test
    void shouldReturnAllSusumes(){
        PostRepo testPostRepo = Mockito.mock(PostRepo.class);
        MovieApiConnection testConnection = Mockito.mock(MovieApiConnection.class);
        SusumeMapper susumap = new SusumeMapper();

        Post testPost1 = new Post("testPostid1", Category.Movie, Genre.COMEDY, 12345, "testHomage1", "creator1", "creatorId", 666666,666666,  emptyList());
        Post testPost2 = new Post("testPostid2", Category.Movie, Genre.ACTION, 6789, "testHomage2", "creator1", "creatorId", 666667,666667,  emptyList());
        List<Post> postListFromRepo = new ArrayList<>();

        postListFromRepo.add(testPost1);
        postListFromRepo.add(testPost2);

        Movie movieInPost1 = new Movie(12345, "originalTitle1", "title1","overview1", "poster1", "releaseDate1" );
        Movie movieInPost2 = new Movie(6789, "originalTitle2", "title2","overview2", "poster2", "releaseDate2" );

        Susume susu1 = Susume.builder().postId("testPostid1").category(Category.Movie).content(movieInPost1).homage("testHomage1").genre(Genre.COMEDY).creater("creator1").createdAt(666666).comments(new ArrayList<>()).build();
        Susume susu2 = Susume.builder().postId("testPostid2").category(Category.Movie).content(movieInPost2).homage("testHomage2").genre(Genre.ACTION).creater("creator1").createdAt(666667).comments(new ArrayList<>()).build();

        PostService testPostService = new PostService(testPostRepo, testConnection, susumap);

        Mockito.when(testPostRepo.findAllByCreater("creator1")).thenReturn(postListFromRepo);
        Mockito.when(testConnection.getMovieFromTMDBById(12345)).thenReturn(movieInPost1);
        Mockito.when(testConnection.getMovieFromTMDBById(6789)).thenReturn(movieInPost2);
        var versuch = testPostService.getAllSusumes("creator1");
        System.out.println(versuch);
        Assertions.assertThat(testPostService.getAllSusumes("creator1")).contains(susu1, susu2);
    }

}