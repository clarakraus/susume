package com.github.clarakraus.susume.blog;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface BlogRepo extends MongoRepository<Blog, String> {

    Optional<Blog> findBlogByUsername(String username);


    Optional<Blog> findBlogByBlogId(String blogId);

    List<Blog> findAllByUsernameContainingIgnoreCase(String username);

}
