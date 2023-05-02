"use strict";
exports.__esModule = true;
exports.getFilteredMovies = void 0;
var db = require("./db");
var getFilteredMovies = function (_a) {
    var genres = _a.genres;
    var matchedMovies = [];
    var otherCounts = [];
    var movies = db.movies;
    // Return random movie if the genre array is empty
    if (genres.length === 0) {
        var randomMovie = getRandomMovie(movies);
        return [randomMovie];
    }
    var _loop_1 = function (i) {
        var count = 0;
        genres.forEach(function (genre) {
            if (movies[i].genres.includes(genre)) {
                count++;
            }
        });
        if (count === movies[i].genres.length && count === genres.length) {
            matchedMovies.unshift(movies[i]);
        }
        if (count !== 0 && movies[i].genres.length === count) {
            otherCounts.push(movies[i]);
        }
    };
    for (var i = 0; i < movies.length; i++) {
        _loop_1(i);
    }
    otherCounts.sort(function (a, b) { return b.genres.length - a.genres.length; });
    console.log("Other movies", otherCounts);
    var allMovies = matchedMovies.concat(otherCounts);
    allMovies.sort(function (a, b) { return a.id - b.id; });
    return otherCounts;
};
exports.getFilteredMovies = getFilteredMovies;
var getRandomMovie = function (movies) {
    var randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
};
var genres = ["Crime", "Drama", "Music"];
exports.getFilteredMovies({ genres: genres });
