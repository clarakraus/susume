package com.github.clarakraus.susume.blog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EditBlogData {
    private String profilePicture;
    private String profileDescription;
}
