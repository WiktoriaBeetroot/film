import { useState, useEffect } from "react";
import { Nav } from "./Nav";
import { Main } from "./Main";
import { Search } from "./Search";
import { Logo } from "./Logo";
import { NumFilm } from "./NumFilms";
import { Box } from "./ListBox";
import { FilmList } from "./FilmList";
import { WatchedSummary } from "./WatchedSummary";
import { WatchedList } from "./WatchedList";
import { Loader } from "./Loader";
import { ErrorMessage } from "./Error";
import { FilmDetails } from "./FilmDetails";
import { useMovie } from "./useMovie";

export default function App() {
  const [query, setQuery] = useState('');
  const [watched, setWatched] = useState(function() {
  const storedWatched = localStorage.getItem("watched");

    if (storedWatched) {
      return JSON.parse(storedWatched);
    }else {
      return []
    }
  });
  const [selectedId, setSelectedId] = useState(null);
  const {movies, isLoading, errorMessage} = useMovie(query);

  function handleSelectedFilm(id) {
    setSelectedId((currId) => currId === id ? null : id)
  }

  function handleCloseFilmDetails() {
    setSelectedId(null)
  }

  function handleAddWatchedFilm(movie) {
    setWatched((watched) => {
      if (!watched.some((watchedMovie) => watchedMovie.imdbId === movie.imdbId)) {
        return [...watched, movie];
      }
      return watched;
    });
  }

  function handleRemoveWatchedFilm(id) {
    setWatched(watched => watched.filter((item) => item.imdbId !== id));
  }


  useEffect(function() {
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [watched])


  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery}/>
        <NumFilm movies={movies} />
      </Nav>
      <Main>
        <Box>
        {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <ErrorMessage errorMessage={errorMessage} />
          ) : (
            <FilmList movies={movies} handleSelectedFilm={handleSelectedFilm}/>
          )}
        </Box>
        <Box>
      {
        selectedId ? <FilmDetails selectedId={selectedId} handleCloseFilmDetails={handleCloseFilmDetails} handleAddWatchedFilm={handleAddWatchedFilm} watchedMovie={watched}/> :
        <>
          <WatchedSummary watched={watched}/>
          <WatchedList watched={watched} handleRemoveWatchedFilm={handleRemoveWatchedFilm}/>
        </>
      }
    </Box>
      </Main>
    </>
  );
}
