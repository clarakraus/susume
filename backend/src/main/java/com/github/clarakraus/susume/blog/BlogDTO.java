package com.github.clarakraus.susume.blog;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogDTO {

    private String blogId;
    private String username;
    private String profileDescription;
    private String profilePicture;
    private List <String> savedSusumes = new ArrayList<>();
    private List<String> friendsList = new ArrayList<>();


}
