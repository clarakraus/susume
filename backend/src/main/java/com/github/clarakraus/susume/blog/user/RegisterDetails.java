package com.github.clarakraus.susume.blog.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterDetails {
    private String username;
    private String profileDescription;
    private String profilePicture;
    private String password;
    private String passwordRepeat;

}
