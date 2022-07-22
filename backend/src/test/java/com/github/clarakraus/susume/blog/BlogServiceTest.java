package com.github.clarakraus.susume.blog;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;


import java.util.*;

import static java.util.Collections.emptyList;
import static org.junit.jupiter.api.Assertions.fail;


class BlogServiceTest {

    @Test
    void shouldCreateNewBlog(){
        BlogRepo testRepo = Mockito.mock(BlogRepo.class);
        Blog testBlog = new Blog(null, "testname", "testDescription", "LinkToPicture", List.of("friend1", "friend2"), List.of("postId"));
        BlogService testService = new BlogService(testRepo);

        testService.createBlog(testBlog);

        Mockito.verify(testRepo).save(testBlog);

    }
    @Test
    void shouldReturnBlogFromDB(){
        BlogRepo testRepo = Mockito.mock(BlogRepo.class);
        BlogService testService = new BlogService(testRepo);

        Blog testBlog = new Blog(null, "testname", "testDescription", "LinkToPicture", List.of("friend1", "friend2"), List.of("testId"));
        Mockito.when(testRepo.findBlogByUsername("testname")).thenReturn(Optional.of(testBlog));

        Assertions.assertThat(testService.getBlogDetails("testname")).isEqualTo(testBlog);
    }
    @Test
    void shouldThrowNSEEInsteadOfBlogByUserName(){
        BlogRepo testRepo = Mockito.mock(BlogRepo.class);
        BlogService testService = new BlogService(testRepo);
        Blog testBlog = new Blog(null, "testname", "testDescription", "LinkToPicture", List.of("friend1", "friend2"), List.of("postId"));
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
        Blog testBlog = new Blog("testId", "testname", "testDescription", "LinkToPicture", List.of("friend1", "friend2"), List.of("postId"));
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
        Blog testBlog = new Blog("testId", "testname", "testDescription", "LinkToPicture", List.of("friend1", "friend2"), List.of("postId"));
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
        List<String> faveList1 =new ArrayList<>();
        faveList1.add("postId1");
        List<String> faveList2 =new ArrayList<>();
        faveList1.add("postId2");

        List<String> friendlist = new ArrayList<>();
        friendlist.add("friendId1");

        Blog testBlog = new Blog(null, "testname", "testDescription", "LinkToPicture", emptyList(), friendlist);

        Mockito.when(testRepo.findBlogByUsername("testname")).thenReturn(Optional.of(testBlog));

        testService.updateFriendList("friendBlog2", "testname");

        Mockito.verify(testRepo).findBlogByUsername("testname");
        Mockito.verify(testRepo).save(testBlog);
        Assertions.assertThat(testBlog.getFriendsList()).hasSize(2);
        Assertions.assertThat((testBlog.getFriendsList()).contains("friendId2"));
    }

}