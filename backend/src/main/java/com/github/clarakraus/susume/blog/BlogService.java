package com.github.clarakraus.susume.blog;


import com.github.clarakraus.susume.post.Category;
import com.github.clarakraus.susume.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlogService{

    private final BlogRepo blogRepo;


    public void createBlog(Blog blog) {
        blogRepo.save(blog);
    }
    public Blog getUserById(String id){
        return blogRepo.findBlogByBlogId(id).orElseThrow();
    }
    public Optional<Blog> getBlogDetails(String username) {
        return blogRepo.findBlogByUsername(username);
     /*   List<Blog> friends = blogOwner.getFriendsList().stream().map(userId-> getUserById(userId)).toList();
        ArrayList<List<Blog>> blogArrayList = new ArrayList<>();
        blogArrayList.add(blogOwner);
        blogArrayList.add(friends);
        return blogArrayList;
      */
    }

    public List<Blog> findUsers(String username){
        return blogRepo.findAllByUsernameContainingIgnoreCase(username);
    }

    public void updateFriendList(String friendsId, String blogOwner){
        Blog blogToUpdate = blogRepo.findBlogByUsername(blogOwner).orElseThrow();
        blogToUpdate.addToFriendList(friendsId);
        blogRepo.save(blogToUpdate);
    }



}

