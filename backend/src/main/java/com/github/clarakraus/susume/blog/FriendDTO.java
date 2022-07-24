package com.github.clarakraus.susume.blog;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FriendDTO {
    private String username;
    private String profilePicture;
    private String blogId;
}
