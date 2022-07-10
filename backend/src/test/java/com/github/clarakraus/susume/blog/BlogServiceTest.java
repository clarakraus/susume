package com.github.clarakraus.susume.blog;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

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

}