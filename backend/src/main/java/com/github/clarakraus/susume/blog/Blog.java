package com.github.clarakraus.susume.blog;


import lombok.AllArgsConstructor;
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
@Document(collection = "blogs" )
public class Blog {
    @Id
    private String blogId;
    @Indexed(unique = true)
    private String username;
    private String profileDescription;
    private String profilePicture;
    private List<String> friendsList = new ArrayList<>();


    public void addToFriendList(String friendId){
        if(friendsList.contains(friendId))
        friendsList.add(friendId);
    }
}
