import { useState } from "react";
import { Nav } from "./Nav";
import { tempMovieData } from './data';
import { Main } from "./Main";
import { Search } from "./Search";
import { Logo } from "./Logo";
import { NumFilm } from "./NumFilms";
import { Box } from './ListBox';
import { FilmList } from "./FilmList";
import {tempWatchedData} from './data';
import { WatchedSummary } from "./WatchedSummary";
import { WatchedList } from "./WatchedList";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  
  return (
    <>
      <Nav> 
        <Logo />
        <Search/>
        <NumFilm movies={movies}/>
      </Nav>
      <Main>
        <Box>
          <FilmList movies={movies} /> 
        </Box> 
        <Box>
          <WatchedSummary watched={watched}/>
          <WatchedList watched={watched}/>
        </Box> 
    </Main>
    </>
  );
}
