package com.github.clarakraus.susume.post;

import java.util.Arrays;
import java.util.List;


public enum Genre {
    NO_GENRE(Category.Movie),
    HORROR(Category.Movie),
    THRILLER(Category.Movie),
    COMEDY(Category.Movie),
    ACTION(Category.Movie),
    SUPERHERO(Category.Movie),
    DRAMA(Category.Movie),
    HISTORICAL(Category.Movie),
    SCIENCE_FICTION(Category.Movie),
    WESTERN(Category.Movie),
    MUSICAL(Category.Movie),
    FANTASY(Category.Movie),
    DOCUMENTARY(Category.Movie),
    KIDS(Category.Movie),
    CULT(Category.Movie),
    ROMANTIC(Category.Movie);
    private Category category;
    Genre(Category category) {
        this.category = category;
    }
 public static List<Genre> findAllGenreByCategory(Category category){
        return Arrays.stream(Genre.values())
                .filter(genre ->genre.category.equals(category))
                .toList();

 }
}
