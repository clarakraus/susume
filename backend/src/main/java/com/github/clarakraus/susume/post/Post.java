package com.github.clarakraus.susume.post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "susumePost")
@Builder
public class Post {
   @Id
   private String postId;
   private Category category;
   private Genre genre;
   private long id;
   private String homage;
   private String creater;
   private String creatorId;
   private long createdAt;
   private long updatedAt;
   private List<Comment> comments = new ArrayList<>();

}
