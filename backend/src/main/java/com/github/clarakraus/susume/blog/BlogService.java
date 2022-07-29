package com.github.clarakraus.susume.blog;


import com.github.clarakraus.susume.post.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BlogService{

    private final BlogRepo blogRepo;

    private final PostService postService;

    public Blog getUserById(String id){
        return blogRepo.findBlogByBlogId(id).orElseThrow();
    }
    public BlogDTO getBlogDetails(String username) {
        Blog blog = blogRepo.findBlogByUsername(username).orElseThrow();
        List <Susume> susumeList = blog.getSavedSusumes().stream().map(postService::getSusumeByPostId)
                .toList();
        BlogDTO blogDTO = blog.buildBlogDTO();
        blogDTO.setSavedSusumes(susumeList);
        return blogDTO;

    }

    public List<Blog> findUsers(String username){
        return blogRepo.findAllByUsernameContainingIgnoreCase(username).orElseThrow();
    }

    public void updateFriendList(String friendsId, String blogOwner){
        Blog blogToUpdate = blogRepo.findBlogByUsername(blogOwner).orElseThrow();
        blogToUpdate.addToFriendList(friendsId);
        blogRepo.save(blogToUpdate);
    }

    public void addToSaves(String susumePostId, String username){

        Blog blogToUpdate = blogRepo.findBlogByUsername(username).orElseThrow();
        blogToUpdate.addToSaves(susumePostId);
        blogRepo.save(blogToUpdate);


    }
    public void removeFromSaves (String susumePostId, String username){
        Blog blogToUpdate = blogRepo.findBlogByUsername(username).orElseThrow();
        blogToUpdate.removeFromSaves(susumePostId);
        blogRepo.save(blogToUpdate);
    }
    public void editBlog(EditBlogData editBlogData, String blogId){
       Blog blogToEdit = blogRepo.findBlogByBlogId(blogId).orElseThrow();
       blogToEdit.changeBlogInfos(editBlogData, blogToEdit);
       blogRepo.save(blogToEdit);
    }




}

