package com.github.clarakraus.susume.blog;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class BlogServiceTest {

    @Test
    void shouldCreateNewBlog(){
        BlogRepo testRepo = Mockito.mock(BlogRepo.class);
        Blog testBlog = new Blog(null, "testname", "testDescription", "LinkToPicture");
        BlogService testService = new BlogService(testRepo);

        testService.createBlog(testBlog);

        Mockito.verify(testRepo).save(testBlog);

    }
    @Test
    void shouldreturnBlogFromDB(){
        BlogRepo testRepo = Mockito.mock(BlogRepo.class);
        BlogService testService = new BlogService(testRepo);
        Blog testBlog = new Blog(null, "testname", "testDescription", "LinkToPicture");
        Mockito.when(testRepo.findBlogByUsername("testname")).thenReturn(Optional.of(testBlog));

        org.assertj.core.api.Assertions.assertThat(testService.getBlogDetails("testname")).isEqualTo(Optional.of(testBlog));


    }

}