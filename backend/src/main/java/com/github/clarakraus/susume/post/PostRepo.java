package com.github.clarakraus.susume.post;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends MongoRepository<Post,String> {
    public List<Post> findAllByCategory(Category category);

}
