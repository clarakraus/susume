package com.github.clarakraus.susume.post;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "susumePost")
public class Post {
   @Id
   private String postId;

   private Category category;
   private Genre genre;
   private long id;
   private String homage;

}
