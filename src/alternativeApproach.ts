import { Genre, Movie } from "./index.types";
const movies = require("./db").movies;

export const getFilteredMovies = ({ genres }: { genres: Genre[] }): Movie[] => {
  const moviesThreeMatched: Movie[] = [];
  const moviesTwoMatched: Movie[] = [];
  const moviesOneMatched: Movie[] = [];

  // Return random movie if the genre array is empty
  if (genres.length === 0) {
    const randomMovie = getRandomMovie();
    return [randomMovie];
  }

  movies.forEach((movie: Movie) => {
    let count = 0;
    genres.forEach((genre: Genre) => {
      if (movie.genres.includes(genre)) {
        count++;
      }
    });
    const movieGenreLength = movie.genres.length;

    if (count === 3 && movieGenreLength === 3) {
      moviesThreeMatched.unshift(movie);
    }

    if (count === 2 && movieGenreLength === 2) {
      moviesTwoMatched.push(movie);
    }

    if (count === 1 && movieGenreLength === 1) {
      moviesOneMatched.push(movie);
    }
  });

  // Iterate through movies list and match the genres
  const allMoviesMatched = moviesThreeMatched.concat(
    moviesTwoMatched,
    moviesThreeMatched
  );

  return allMoviesMatched;
};

const getRandomMovie = (): Movie => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
};

const genres: Genre[] = ["Crime", "Drama", "Music"];
getFilteredMovies({ genres });
