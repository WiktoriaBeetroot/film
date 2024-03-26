import { useState } from "react";
import { Nav } from "./Nav";
import { tempMovieData } from "./data";
import { Main } from "./Main";
import { Search } from "./Search";
import { Logo } from "./Logo";
import { NumFilm } from "./NumFilms";
import { Box } from "./ListBox";
import { FilmList } from "./FilmList";
import { tempWatchedData } from "./data";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedList } from "./WatchedList";
import { StarRating } from "./Star";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  function MovieRating() {
    const [movieRating, setMovieRating] = useState(0);
    return (
      <div>
        <StarRating color="purple" onSetRating={setMovieRating} />
        <p>This moview was rates {movieRating} stars</p>
      </div>
    );
  }

  return (
    <>
      <Nav>
        <Logo />
        <Search />
        <NumFilm movies={movies} />
      </Nav>
      <Main>
        <Box>
          <FilmList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
          <StarRating maxRating={10} />
          <StarRating
            size={20}
            color="green"
            className="test-star"
            messages={["Terrible", "Bad", "Normal", "Good", "Amazing"]}
            defaultValue={1}
          />
          <MovieRating />
        </Box>
      </Main>
    </>
  );
}
