package com.github.clarakraus.susume.blog;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;


import java.util.*;

import static org.junit.jupiter.api.Assertions.fail;


class BlogServiceTest {

    @Test
    void shouldCreateNewBlog(){
        BlogRepo testRepo = Mockito.mock(BlogRepo.class);
        Blog testBlog = new Blog(null, "testname", "testDescription", "LinkToPicture", List.of("friend1", "friend2"));
        BlogService testService = new BlogService(testRepo);

        testService.createBlog(testBlog);

        Mockito.verify(testRepo).save(testBlog);

    }
    @Test
    void shouldReturnBlogFromDB(){
        BlogRepo testRepo = Mockito.mock(BlogRepo.class);
        BlogService testService = new BlogService(testRepo);
        Blog testBlog = new Blog(null, "testname", "testDescription", "LinkToPicture", List.of("friend1", "friend2"));
        Mockito.when(testRepo.findBlogByUsername("testname")).thenReturn(Optional.of(testBlog));

        Assertions.assertThat(testService.getBlogDetails("testname")).isEqualTo(Optional.of(testBlog));
    }
    @Test
    void shouldThrowNSEEInsteadOfBlogByUserName(){
        BlogRepo testRepo = Mockito.mock(BlogRepo.class);
        BlogService testService = new BlogService(testRepo);
        Blog testBlog = new Blog(null, "testname", "testDescription", "LinkToPicture", List.of("friend1", "friend2"));
        Mockito.when(testRepo.findBlogByUsername("testname")).thenReturn(Optional.of(testBlog));
        try{
            testService.getBlogDetails("WrongName");
            fail();
        } catch (NoSuchElementException e){

        }
        Assertions.assertThatThrownBy(()-> {
            testService.getBlogDetails("WrongName");
        }).isInstanceOf(NoSuchElementException.class);
    }
   @Test
    void shouldReturnBlogByUserId(){
        BlogRepo testRepo = Mockito.mock(BlogRepo.class);
        BlogService testService = new BlogService(testRepo);
        Blog testBlog = new Blog("testId", "testname", "testDescription", "LinkToPicture", List.of("friend1", "friend2"));
        Mockito.when(testRepo.findBlogByBlogId("testId")).thenReturn(Optional.of(testBlog));
        testService.getUserById("testId");
        Mockito.verify(testRepo).findBlogByBlogId("testId");

    }
   /* @Test
    void shouldReturnNSEEInsteadOfBlogByUserId(){
        BlogRepo testRepo = Mockito.mock(BlogRepo.class);
        BlogService testService = new BlogService(testRepo);
        Blog testBlog = new Blog("testId", "testname", "testDescription", "LinkToPicture", List.of("friend1", "friend2"));
        Assertions.assertThatThrownBy(()-> {
            testService.getUserById("testId");
        }).isInstanceOf((NoSuchElementException.class));
    }

    */
    @Test
    void shouldFindUserBySearchQuery(){
        BlogRepo testRepo = Mockito.mock(BlogRepo.class);
        BlogService testService = new BlogService(testRepo);
        Blog testBlog = new Blog("testId", "testname", "testDescription", "LinkToPicture", List.of("friend1", "friend2"));
        ArrayList<Blog> userList = new ArrayList<>();
        userList.add(testBlog);
        Mockito.when(testRepo.findAllByUsernameContainingIgnoreCase("testname")).thenReturn(Optional.of(userList));
        testService.findUsers("testname");
        Mockito.verify(testRepo).findAllByUsernameContainingIgnoreCase("testname");
        Assertions.assertThat(testService.findUsers("testname")).isEqualTo(userList);
    }



    @Test
    void shouldAddFriendToFriendsList(){
        BlogRepo testRepo = Mockito.mock(BlogRepo.class);
        BlogService testService = new BlogService(testRepo);
        Blog friendBlog1 = new Blog("friendId1", "Gustav", "profileInfo", "profilePicture", Collections.emptyList());
        Blog friendBlog2 = new Blog("friendId2", "Funda", "profileInfo", "profilePicture", Collections.emptyList());
        List<String> friendlist = new ArrayList<>();
        friendlist.add("friendId1");
        Blog testBlog = new Blog(null, "testname", "testDescription", "LinkToPicture", friendlist);
        Mockito.when(testRepo.findBlogByUsername("testname")).thenReturn(Optional.of(testBlog));

        testService.updateFriendList("friendBlog2", "testname");

        Mockito.verify(testRepo).findBlogByUsername("testname");
        Mockito.verify(testRepo).save(testBlog);
        Assertions.assertThat(testBlog.getFriendsList()).hasSize(2);
        Assertions.assertThat((testBlog.getFriendsList()).contains("friendId2"));
    }

}