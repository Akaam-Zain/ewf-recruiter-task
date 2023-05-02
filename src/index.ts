import { Genre, Movie } from "./index.types";
const movies = require("./db").movies;

export const getFilteredMovies = ({ genres }: { genres: Genre[] }): Movie[] => {
  // Return random movie if the genre array is empty
  if (genres.length === 0) {
    const randomMovie = getRandomMovie();
    return [randomMovie];
  }

  const moviesMatched = getMatchedMovies();
  moviesMatched.sort((a: Movie, b: Movie) => b.genres.length - a.genres.length);

  return moviesMatched;
};

const getRandomMovie = (): Movie => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
};

const getMatchedMovies = (): Movie[] => {
  const moviesMatched: Movie[] = [];

  // Iterate through movies list and match the genres
  movies.forEach((movie: Movie) => {
    let count = 0;
    genres.forEach((genre: Genre) => {
      if (movie.genres.includes(genre)) {
        count++;
      }
    });
    const movieGenreLength = movie.genres.length;

    if (count !== 0 && movieGenreLength === count) {
      moviesMatched.push(movie);
    }
  });

  return moviesMatched;
};

// CUSTOM TESTS:Example to run custom inputs and check the implemenation
const genres: Genre[] = ["Crime", "Drama", "Music"];
getFilteredMovies({ genres });
