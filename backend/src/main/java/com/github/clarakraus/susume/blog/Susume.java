package com.github.clarakraus.susume.blog;

import com.github.clarakraus.susume.post.Category;
import com.github.clarakraus.susume.post.Genre;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Susume {
   private String postId;
   private Category category;
   private Content content;
   private String homage;
   private Genre genre;
   private String creater;
}
