package com.github.clarakraus.susume.blog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BlogDTO {

    private String blogId;
    private String username;
    private String profileDescription;
    private String profilePicture;
    private List <Susume> savedSusumes = new ArrayList<>();
    private List<String> friendsList = new ArrayList<>();


}
