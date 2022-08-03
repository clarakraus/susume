package com.github.clarakraus.susume.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comment {
    String content;
    String username;
    String userId;
    String postId;
    long createdAt;
}
