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

const KEY = '73aaaa6d';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedId, setSelectedId] = useState(null);

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

  useEffect(function () {
    let controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setErrorMessage('');
        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal});

        if (!res.ok) {
          throw new Error('Something went wrong while fetching data')
        }

        const data = await res.json();

        if (data.Response === 'False') {
          throw new Error('Nothing is found')
        }
   
        setMovies(data.Search)
        setErrorMessage('')
      }catch(err) {
        if (err.name !== "AbortError") {
          console.error(err.message)
          setErrorMessage(err.message)
        }
      }finally {
        setIsLoading(false)
      }
    }
    if (!query.length) {
      setMovies([]);
      setErrorMessage('');
      return
    }
    fetchMovies()
    // Clean up data fetching
    return function() {
      controller.abort();
    }
  }, [query])


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
