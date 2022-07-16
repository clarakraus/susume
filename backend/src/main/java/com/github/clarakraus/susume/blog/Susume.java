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
   private Category category;
   private String title;

   private String overview;
   private String poster_path;
   private String homage;
   private Genre genre;
}
