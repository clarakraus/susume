package com.github.clarakraus.susume.blog;


import lombok.Data;

@Data
public class Book implements Content{
    private String title;
    private long id;
}
