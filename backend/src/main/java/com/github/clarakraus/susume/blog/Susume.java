package com.github.clarakraus.susume.blog;

import com.github.clarakraus.susume.post.Category;
import com.github.clarakraus.susume.post.Comment;
import com.github.clarakraus.susume.post.Genre;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Susume {
   private String postId;
   private Category category;
   private Content content;
   private String homage;
   private Genre genre;
   private String creater;
   private long createdAt;
   private List<Comment> comments;
}
