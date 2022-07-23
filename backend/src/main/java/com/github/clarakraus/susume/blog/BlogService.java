package com.github.clarakraus.susume.blog;


import com.github.clarakraus.susume.post.Category;
import com.github.clarakraus.susume.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.*;

@Service
@RequiredArgsConstructor
public class BlogService{

    private final BlogRepo blogRepo;


  /*  public void createBlog(Blog blog) {
        blogRepo.save(blog);
    }

   */
    public Blog getUserById(String id){
        return blogRepo.findBlogByBlogId(id).orElseThrow();
    }
    public Blog getBlogDetails(String username) {
           return blogRepo.findBlogByUsername(username).orElseThrow();

     /*   List<Blog> friends = blogOwner.getFriendsList().stream().map(userId-> getUserById(userId)).toList();
        ArrayList<List<Blog>> blogArrayList = new ArrayList<>();
        blogArrayList.add(blogOwner);
        blogArrayList.add(friends);
        return blogArrayList;
      */
    }

    public List<Blog> findUsers(String username){
        return blogRepo.findAllByUsernameContainingIgnoreCase(username).orElseThrow();
    }

    public void updateFriendList(String friendsId, String blogOwner){
        Blog blogToUpdate = blogRepo.findBlogByUsername(blogOwner).orElseThrow();
        blogToUpdate.addToFriendList(friendsId);
        blogRepo.save(blogToUpdate);
    }

    public void addToFavorites(String susumeId, String username){
        Blog blogToUpdate = blogRepo.findBlogByUsername(username).orElseThrow();
        blogToUpdate.addToFavorites(susumeId);
        blogRepo.save(blogToUpdate);
    }




}

