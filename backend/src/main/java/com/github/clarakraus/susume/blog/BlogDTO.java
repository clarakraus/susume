package com.github.clarakraus.susume.blog;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogDTO {
    private Blog mainBlog;
    private List<FriendDTO> friendBlog;

}
