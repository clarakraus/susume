package com.github.clarakraus.susume.blog;


import com.github.clarakraus.susume.post.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "blogs" )
public class Blog {
    @Id
    private String blogId;
    @Indexed(unique = true)
    private String username;
    private String profileDescription;
    private String profilePicture;
    private List<String> savedSusumes = new ArrayList<>();
    private List<String> friendsList = new ArrayList<>();

    private String password;

    private String passwordRepeat;




    public void addToFriendList(String friendId){
        if(friendsList.contains(friendId)){
            throw new IllegalStateException();
        }
            friendsList.add(friendId);
    }
    public void removeFromFriendList(String friendId){
        if(!friendsList.contains(friendId)){
            throw new IllegalStateException();
        }
        friendsList.remove(friendId);
    }
    public BlogDTO buildBlogDTO(){
        return BlogDTO.builder()
                .blogId(blogId)
                .username(username)
                .profileDescription(profileDescription)
                .profilePicture(profilePicture)
                .friendsList(friendsList)
                .build();
    }
    public FriendDTO buildFriendDTO(){
        return FriendDTO.builder()
                .username(username)
                .blogId(blogId)
                .profilePicture(profilePicture)
                .build();
    }
    public void addToSaves(String susumePostId){
        if(savedSusumes.contains(susumePostId)){
            throw new IllegalStateException();
        }
        savedSusumes.add(susumePostId);
    }
    public void removeFromSaves(String susumePostId) {
        if (!savedSusumes.contains(susumePostId)) {
            throw new IllegalStateException();
        } savedSusumes.remove(susumePostId);

    }
    public Blog changeBlogInfos(EditBlogData editBlogData, Blog blog){
        blog.setProfileDescription(editBlogData.getProfileDescription());
        blog.setProfilePicture(editBlogData.getProfilePicture());
        return blog;
    }
}
