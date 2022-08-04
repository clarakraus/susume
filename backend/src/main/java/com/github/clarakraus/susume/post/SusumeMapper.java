package com.github.clarakraus.susume.post;

import com.github.clarakraus.susume.blog.Content;
import com.github.clarakraus.susume.blog.Movie;
import com.github.clarakraus.susume.blog.Susume;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SusumeMapper {

    Susume map(Content content, Post post){
        return new Susume(post.getPostId(), post.getCategory(),content, post.getHomage(), post.getGenre(), post.getCreater(), post.getCreatedAt(), post.getComments());
    }
}
